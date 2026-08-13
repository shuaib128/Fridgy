export type User = {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    profileImage?: string;
    preferredName?: string;
    timezone: string;
    measurementSystem: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string;
};