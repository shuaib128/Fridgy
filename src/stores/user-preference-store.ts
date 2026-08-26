import { create } from "zustand";
import { UserPreference } from "@/types/user-preference";

type UserPreferenceStore = {
    preference: UserPreference | null;
    hasLoaded: boolean;
    setPreference: (preference: UserPreference) => void;
    clearPreference: () => void;
};

export const useUserPreferenceStore = create<UserPreferenceStore>((set) => ({
    preference: null,
    hasLoaded: false,

    setPreference: (preference) =>
        set({
            preference,
            hasLoaded: true,
        }),

    clearPreference: () =>
        set({
            preference: null,
            hasLoaded: false,
        }),
}));