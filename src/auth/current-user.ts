import api from "@/hooks/api";
import { User } from "@/types/user";
import { getAccessToken } from "./token-storage";

type CurrentUserResponse = {
    user: User;
};

export async function getCurrentUser(): Promise<User | null> {
    const accessToken = await getAccessToken();
    
    if (!accessToken) {
        return null;
    }

    const response = await api.get<CurrentUserResponse>(
        "/auth/me",
    );

    return response.user;
}