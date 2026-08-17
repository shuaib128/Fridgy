import {
    getAccessToken,
    getRefreshToken,
} from "@/auth/token-storage";
import api, { ApiError } from "@/hooks/api";
import { User } from "@/types/user";

type CurrentUserResponse = {
    user: User;
};

export async function getCurrentUser(): Promise<User | null> {
    const [
        accessToken,
        refreshToken,
    ] = await Promise.all([
        getAccessToken(),
        getRefreshToken(),
    ]);

    // The user has never logged in or has logged out.
    if (!accessToken && !refreshToken) {
        return null;
    }

    try {
        const response =
            await api.get<CurrentUserResponse>(
                "/auth/me",
            );

        return response.user;
    } catch (error) {
        /*
         * api.ts already attempted to refresh the access token.
         * A remaining 401 means neither token could authenticate.
         */
        if (
            error instanceof ApiError &&
            error.status === 401
        ) {
            return null;
        }

        // Preserve connection errors and unexpected server errors.
        throw error;
    }
}