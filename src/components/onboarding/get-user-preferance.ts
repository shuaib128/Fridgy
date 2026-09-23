import api from "@/hooks/api";
import {
    GetUserPreferenceResponse,
    UserPreference
} from "@/types/user-preference";

export async function getUserPreferences(): Promise<UserPreference> {
    const response = await api.get<GetUserPreferenceResponse>(
        "/users/me/preferences",
    );

    return response.preferences;
}