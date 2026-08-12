import { VerifiedGoogleUser } from "@/types/auth";
import { create } from "zustand";

type UserStore = {
    user: VerifiedGoogleUser | null;
    setUser: (user: VerifiedGoogleUser) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
    user: null,

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),
}));