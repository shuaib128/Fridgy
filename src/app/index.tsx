import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

import { getCurrentUser } from "@/auth/current-user";
import { useUserStore } from "@/stores/auth-store";

const hasCompletedOnboarding = true;

export default function IndexScreen() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAuthentication() {
      try {
        const currentUser = await getCurrentUser();

        if (!isMounted) {
          return;
        }

        if (currentUser) {
          setUser(currentUser);
        } else {
          clearUser();
        }
      } catch (error) {
        console.error("Failed to restore authentication:", error);

        if (isMounted) {
          clearUser();

          Alert.alert(
            "Unable to connect",
            "We couldn't restore your login. Please check your internet connection and try again.",
          );
        }
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    }

    void checkAuthentication();

    return () => {
      isMounted = false;
    };
  }, [setUser, clearUser]);

  if (isCheckingAuth) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}