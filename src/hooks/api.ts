/**
 * Central API client for Fridgy.
 *
 * Uses the native JavaScript fetch API.
 *
 * Authenticated request:
 *   const items = await api.get<InventoryItem[]>("/inventory");
 *
 * Public request:
 *   const response = await api.post<AuthResponse>(
 *       "/auth/google",
 *       payload,
 *       { requiresAuth: false },
 *   );
 */

import {
    clearAuthTokens,
    getAccessToken,
    getRefreshToken,
    saveAuthTokens,
} from "@/auth/token-storage";

const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, "") ??
    "http://localhost:8080/api/v1";

const DEFAULT_TIMEOUT_MS = 15_000;

type QueryValue =
    | string
    | number
    | boolean
    | null
    | undefined;

export type QueryParams = Record<
    string,
    QueryValue | QueryValue[]
>;

export type RequestBody =
    | Record<string, unknown>
    | unknown[]
    | FormData
    | string
    | null;

export type ApiRequestOptions = {
    headers?: HeadersInit;
    query?: QueryParams;
    body?: RequestBody;
    timeoutMs?: number;
    signal?: AbortSignal;

    /**
     * Defaults to true.
     *
     * Set to false for public endpoints such as:
     * - /auth/google
     * - /auth/refresh
     * - /health
     */
    requiresAuth?: boolean;
};

export type ApiErrorResponse = {
    message?: string;
    error?: string;
    errors?: unknown;
    [key: string]: unknown;
};

type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
};

/*
 * When several authenticated requests fail together, they should all wait for
 * the same refresh request instead of rotating the refresh token repeatedly.
 */
let refreshPromise: Promise<string | null> | null = null;

export class ApiError<T = ApiErrorResponse> extends Error {
    readonly status: number;
    readonly data: T | null;
    readonly url: string;

    constructor({
        message,
        status,
        data,
        url,
    }: {
        message: string;
        status: number;
        data: T | null;
        url: string;
    }) {
        super(message);

        this.name = "ApiError";
        this.status = status;
        this.data = data;
        this.url = url;
    }
}

function buildUrl(
    path: string,
    query?: QueryParams,
): string {
    const normalizedPath = path.startsWith("/")
        ? path
        : `/${path}`;

    const url = new URL(
        `${API_BASE_URL}${normalizedPath}`,
    );

    if (!query) {
        return url.toString();
    }

    Object.entries(query).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (
                    item !== null &&
                    item !== undefined
                ) {
                    url.searchParams.append(
                        key,
                        String(item),
                    );
                }
            });

            return;
        }

        if (
            value !== null &&
            value !== undefined
        ) {
            url.searchParams.set(
                key,
                String(value),
            );
        }
    });

    return url.toString();
}

function isFormData(
    body: RequestBody | undefined,
): body is FormData {
    return (
        typeof FormData !== "undefined" &&
        body instanceof FormData
    );
}

function createRequestBody(
    body: RequestBody | undefined,
    headers: Headers,
): BodyInit | undefined {
    if (
        body === undefined ||
        body === null
    ) {
        return undefined;
    }

    if (isFormData(body)) {
        /*
         * Do not manually set Content-Type for FormData.
         * fetch adds the multipart boundary automatically.
         */
        headers.delete("Content-Type");

        return body;
    }

    if (typeof body === "string") {
        if (!headers.has("Content-Type")) {
            headers.set(
                "Content-Type",
                "text/plain",
            );
        }

        return body;
    }

    if (!headers.has("Content-Type")) {
        headers.set(
            "Content-Type",
            "application/json",
        );
    }

    return JSON.stringify(body);
}

async function parseResponseBody(
    response: Response,
): Promise<unknown> {
    if (
        response.status === 204 ||
        response.status === 205
    ) {
        return null;
    }

    const contentType =
        response.headers.get("content-type") ?? "";

    if (
        contentType.includes("application/json")
    ) {
        return response.json();
    }

    const text = await response.text();

    return text.length > 0 ? text : null;
}

function getErrorMessage(
    data: unknown,
    fallback: string,
): string {
    if (
        typeof data === "object" &&
        data !== null
    ) {
        const response =
            data as ApiErrorResponse;

        if (
            typeof response.message === "string" &&
            response.message.trim()
        ) {
            return response.message;
        }

        if (
            typeof response.error === "string" &&
            response.error.trim()
        ) {
            return response.error;
        }
    }

    if (
        typeof data === "string" &&
        data.trim()
    ) {
        return data;
    }

    return fallback;
}

function combineSignals(
    externalSignal: AbortSignal | undefined,
    timeoutMs: number,
): {
    signal: AbortSignal;
    cleanup: () => void;
    didTimeout: () => boolean;
} {
    const controller = new AbortController();

    let timedOut = false;

    const timeoutId = setTimeout(() => {
        timedOut = true;
        controller.abort();
    }, timeoutMs);

    const abortFromExternalSignal = () => {
        controller.abort();
    };

    if (externalSignal) {
        if (externalSignal.aborted) {
            controller.abort();
        } else {
            externalSignal.addEventListener(
                "abort",
                abortFromExternalSignal,
                { once: true },
            );
        }
    }

    return {
        signal: controller.signal,

        cleanup: () => {
            clearTimeout(timeoutId);

            externalSignal?.removeEventListener(
                "abort",
                abortFromExternalSignal,
            );
        },

        didTimeout: () => timedOut,
    };
}

function setAuthorizationHeader(
    headers: Headers,
    accessToken: string | null,
): void {
    if (!accessToken) {
        headers.delete("Authorization");
        return;
    }

    headers.set(
        "Authorization",
        `Bearer ${accessToken}`,
    );
}

async function refreshAccessToken(): Promise<string | null> {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
            return null;
        }

        try {
            const response = await fetch(
                buildUrl("/auth/refresh"),
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refreshToken,
                    }),
                },
            );

            const data = await parseResponseBody(response);

            if (!response.ok) {
                /*
                 * A 401 or 403 means the refresh token is no longer usable.
                 * Do not clear tokens for temporary network/server failures.
                 */
                if (
                    response.status === 401 ||
                    response.status === 403
                ) {
                    await clearAuthTokens();
                }

                return null;
            }

            const tokens = data as RefreshTokenResponse;

            if (
                !tokens.accessToken ||
                !tokens.refreshToken
            ) {
                return null;
            }

            await saveAuthTokens({
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            });

            return tokens.accessToken;
        } catch (error) {
            console.error(
                "Failed to refresh access token:",
                error,
            );

            return null;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

async function request<T>(
    method: string,
    path: string,
    options: ApiRequestOptions = {},
): Promise<T> {
    const {
        headers: customHeaders,
        query,
        body,
        timeoutMs = DEFAULT_TIMEOUT_MS,
        signal: externalSignal,
        requiresAuth = true,
    } = options;

    const url = buildUrl(path, query);
    const headers = new Headers(customHeaders);

    headers.set(
        "Accept",
        "application/json",
    );

    let accessToken = requiresAuth
        ? await getAccessToken()
        : null;

    if (requiresAuth) {
        setAuthorizationHeader(
            headers,
            accessToken,
        );
    }

    const requestBody = createRequestBody(
        body,
        headers,
    );

    const {
        signal,
        cleanup,
        didTimeout,
    } = combineSignals(
        externalSignal,
        timeoutMs,
    );

    try {
        const sendRequest = async (
            token: string | null,
        ): Promise<Response> => {
            const requestHeaders = new Headers(headers);

            if (requiresAuth) {
                setAuthorizationHeader(
                    requestHeaders,
                    token,
                );
            }

            return fetch(url, {
                method,
                headers: requestHeaders,
                body: requestBody,
                signal,
            });
        };

        let response = await sendRequest(accessToken);

        /*
         * Retry an authenticated request once after refreshing its expired
         * access token. Public endpoints never enter this flow.
         */
        if (
            requiresAuth &&
            response.status === 401
        ) {
            accessToken = await refreshAccessToken();

            if (accessToken) {
                response = await sendRequest(accessToken);
            }
        }

        const data =
            await parseResponseBody(response);

        if (!response.ok) {
            throw new ApiError({
                message: getErrorMessage(
                    data,
                    `Request failed with status ${response.status}.`,
                ),
                status: response.status,
                data:
                    data as ApiErrorResponse | null,
                url,
            });
        }

        return data as T;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        if (
            error instanceof Error &&
            error.name === "AbortError"
        ) {
            if (didTimeout()) {
                throw new ApiError({
                    message:
                        `Request timed out after ${timeoutMs}ms.`,
                    status: 408,
                    data: null,
                    url,
                });
            }

            throw new ApiError({
                message: "Request was cancelled.",
                status: 0,
                data: null,
                url,
            });
        }

        throw new ApiError({
            message:
                error instanceof Error
                    ? error.message
                    : "Unable to connect to the server.",
            status: 0,
            data: null,
            url,
        });
    } finally {
        cleanup();
    }
}

export const api = {
    get<T>(
        path: string,
        options: Omit<
            ApiRequestOptions,
            "body"
        > = {},
    ): Promise<T> {
        return request<T>(
            "GET",
            path,
            options,
        );
    },

    post<T>(
        path: string,
        body?: RequestBody,
        options: Omit<
            ApiRequestOptions,
            "body"
        > = {},
    ): Promise<T> {
        return request<T>(
            "POST",
            path,
            {
                ...options,
                body,
            },
        );
    },

    put<T>(
        path: string,
        body?: RequestBody,
        options: Omit<
            ApiRequestOptions,
            "body"
        > = {},
    ): Promise<T> {
        return request<T>(
            "PUT",
            path,
            {
                ...options,
                body,
            },
        );
    },

    patch<T>(
        path: string,
        body?: RequestBody,
        options: Omit<
            ApiRequestOptions,
            "body"
        > = {},
    ): Promise<T> {
        return request<T>(
            "PATCH",
            path,
            {
                ...options,
                body,
            },
        );
    },

    delete<T = void>(
        path: string,
        options: Omit<
            ApiRequestOptions,
            "body"
        > = {},
    ): Promise<T> {
        return request<T>(
            "DELETE",
            path,
            options,
        );
    },

    request,
};

export default api;
