import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "fridgy_access_token";
const REFRESH_TOKEN_KEY = "fridgy_refresh_token";

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export async function saveAuthTokens(
    tokens: AuthTokens,
): Promise<void> {
    await Promise.all([
        SecureStore.setItemAsync(
            ACCESS_TOKEN_KEY,
            tokens.accessToken,
        ),
        SecureStore.setItemAsync(
            REFRESH_TOKEN_KEY,
            tokens.refreshToken,
        ),
    ]);
}

export async function getAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function getAuthTokens(): Promise<{
    accessToken: string | null;
    refreshToken: string | null;
}> {
    const [accessToken, refreshToken] = await Promise.all([
        getAccessToken(),
        getRefreshToken(),
    ]);

    return {
        accessToken,
        refreshToken,
    };
}

export async function clearAuthTokens(): Promise<void> {
    await Promise.all([
        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
        SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
}