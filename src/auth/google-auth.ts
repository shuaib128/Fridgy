import {
    GoogleSignin,
    isSuccessResponse,
} from "@react-native-google-signin/google-signin";

import api from "@/hooks/api";
import {
    GoogleAuthResponse,
    VerifiedGoogleUser,
} from "@/types/auth";

const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;

let configured = false;

export function configureGoogleSignIn(): void {
    if (configured) {
        return;
    }

    if (!webClientId) {
        throw new Error(
            "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is not configured",
        );
    }

    if (!iosClientId) {
        throw new Error(
            "EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID is not configured",
        );
    }

    GoogleSignin.configure({
        webClientId,
        iosClientId,
        offlineAccess: false,
        scopes: ["openid", "profile", "email"],
    });

    configured = true;
}

export async function signInWithGoogle():
    Promise<VerifiedGoogleUser | null> {
    configureGoogleSignIn();

    await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
    });

    const result = await GoogleSignin.signIn();

    if (!isSuccessResponse(result)) {
        return null;
    }

    /*
     * Send the signed ID token to your backend.
     * Never send result.data.user.id as proof of identity.
     */
    const idToken = result.data.idToken;

    if (!idToken) {
        throw new Error("Google did not return an ID token");
    }

    const response = await api.post<GoogleAuthResponse>(
        "/auth/google",
        { idToken },
    );

    return response.user;
}

export async function signOutFromGoogle(): Promise<void> {
    configureGoogleSignIn();
    await GoogleSignin.signOut();
}