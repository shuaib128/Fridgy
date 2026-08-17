// src/auth/logout.ts

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { clearAuthTokens } from "@/auth/token-storage";
import { useUserStore } from "@/stores/auth-store";

export async function logout(): Promise<void> {
    // Remove Fridgy access and refresh tokens.
    await clearAuthTokens();

    // Remove the user from Zustand.
    useUserStore.getState().clearUser();

    // End the Google session on this device.
    try {
        await GoogleSignin.signOut();
    } catch (error) {
        console.warn("Could not sign out from Google:", error);
    }
}