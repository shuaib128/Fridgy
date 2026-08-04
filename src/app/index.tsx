import { Redirect } from "expo-router";

const hasCompletedOnboarding = true;

export default function IndexScreen() {
  if (hasCompletedOnboarding) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/onboarding" />;
}
