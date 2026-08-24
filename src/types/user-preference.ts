export type UserPreference = {
    id: string;
    dietaryPreferences: string[];
    allergies: string[];
    preferredStores: string[];
    expirationNotifications: boolean;
    lowStockNotifications: boolean;
    createdAt: string;
    updatedAt: string;
};

export type CreateUserPreferenceRequest = Omit<
    UserPreference,
    "id" | "createdAt" | "updatedAt"
>;

export type CreateUserPreferenceResponse = {
    message: string;
    preferences: UserPreference;
};