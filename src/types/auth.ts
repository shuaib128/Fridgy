export type VerifiedGoogleUser = {
    googleId: string;
    email: string;
    emailVerified: boolean;
    name: string | null;
    givenName: string | null;
    familyName: string | null;
    picture: string | null;
};

export type GoogleAuthResponse = {
    user: VerifiedGoogleUser;
};