import { Redirect } from "expo-router";

const hasCompletedOnboarding = false;

export default function IndexScreen() {
  if (hasCompletedOnboarding) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
