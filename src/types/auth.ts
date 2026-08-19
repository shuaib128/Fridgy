export type VerifiedGoogleUser = {
    id: string;
    name: string | null;
    givenName: string | null;
    familyName: string | null;
    email: string;
    emailVerified: boolean;
    profileImage: string | null;
    role: string;
    isActive: boolean;
    measurementSystem: string;
    createdAt: string;
    timezone: string;
};

export type GoogleAuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: VerifiedGoogleUser;
};