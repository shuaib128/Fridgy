import {
    clearAuthTokens,
    getRefreshToken,
    saveAuthTokens,
} from "@/auth/token-storage";

const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, "") ??
    "http://localhost:8080/api/v1";

type RefreshResponse = {
    accessToken: string;
    refreshToken: string;
};

export async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            await clearAuthTokens();
            return null;
        }

        const tokens: RefreshResponse = await response.json();

        await saveAuthTokens({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });

        return tokens.accessToken;
    } catch (error) {
        console.error("Token refresh failed:", error);
        return null;
    }
}