import { Ionicons } from "@expo/vector-icons";
import { useState, type ComponentProps } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { Screen } from "@/components/screen";
import { theme } from "@/styles/theme";
import { HeroFeature } from "./_components/hero-feature";
import { NotificationOption } from "./_components/notification-option";
import { OptionGrid } from "./_components/option-grid";
import { SetupCard } from "./_components/setup-card";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Option = {
  label: string;
  icon: IconName;
};

const dietaryOptions: Option[] = [
  { label: "No preference", icon: "restaurant-outline" },
  { label: "Vegetarian", icon: "leaf-outline" },
  { label: "Vegan", icon: "nutrition-outline" },
  { label: "Halal", icon: "checkmark-circle-outline" },
  { label: "Gluten-free", icon: "ban-outline" },
  { label: "Low-carb", icon: "fitness-outline" },
];

const allergyOptions: Option[] = [
  { label: "Peanuts", icon: "warning-outline" },
  { label: "Tree nuts", icon: "warning-outline" },
  { label: "Milk", icon: "water-outline" },
  { label: "Eggs", icon: "egg-outline" },
  { label: "Seafood", icon: "fish-outline" },
  { label: "Soy", icon: "leaf-outline" },
];

const storeOptions: Option[] = [
  { label: "Costco", icon: "storefront-outline" },
  { label: "Walmart", icon: "cart-outline" },
  { label: "Target", icon: "basket-outline" },
  { label: "Safeway", icon: "bag-handle-outline" },
  { label: "Trader Joe's", icon: "storefront-outline" },
  { label: "Whole Foods", icon: "leaf-outline" },
];

export default function OnboardingScreen() {
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [preferredStores, setPreferredStores] = useState<string[]>([]);

  const [customAllergy, setCustomAllergy] = useState("");

  const [expirationNotifications, setExpirationNotifications] =
    useState(true);

  const [lowStockNotifications, setLowStockNotifications] = useState(true);

  const toggleSelection = (
    value: string,
    currentValues: string[],
    updateValues: (values: string[]) => void,
  ) => {
    if (currentValues.includes(value)) {
      updateValues(
        currentValues.filter((currentValue) => currentValue !== value),
      );

      return;
    }

    updateValues([...currentValues, value]);
  };

  const addCustomAllergy = () => {
    const allergy = customAllergy.trim();

    if (!allergy || allergies.includes(allergy)) {
      setCustomAllergy("");
      return;
    }

    setAllergies([...allergies, allergy]);
    setCustomAllergy("");
  };

  return (
    <Screen
      scrollable
      padded={false}
      backgroundColor={theme.colors.backgroundMuted}
      contentContainerStyle={styles.scrollContent}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
      }}
    >
      <View style={styles.brandRow}>
        <View style={styles.smallLogo}>
          <Ionicons
            name="restaurant"
            size={theme.iconSizes.sm}
            color={theme.colors.textInverse}
          />
        </View>

        <Text style={styles.brandName}>Fridgy</Text>

        <Pressable style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroDecoration}>
          <View style={styles.heroIconContainer}>
            <Ionicons
              name="basket-outline"
              size={theme.iconSizes["2xl"]}
              color={theme.colors.primaryDark}
            />
          </View>
        </View>

        <View style={styles.heroContent}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>WELCOME</Text>
          </View>

          <Text style={styles.heroTitle}>
            Your kitchen,{"\n"}
            smarter together.
          </Text>

          <Text style={styles.heroDescription}>
            Track what you have, use food before it expires, and
            discover meals from ingredients already in your
            kitchen.
          </Text>
        </View>

        <View style={styles.heroFeatureRow}>
          <HeroFeature
            icon="cube-outline"
            title="Track"
            subtitle="Your food"
          />

          <HeroFeature
            icon="time-outline"
            title="Save"
            subtitle="Before expiry"
          />

          <HeroFeature
            icon="restaurant-outline"
            title="Cook"
            subtitle="With what you have"
          />
        </View>
      </View>

      <SetupCard
        number="01"
        icon="restaurant-outline"
        title="How do you eat?"
        description="Select all dietary preferences that apply."
      >
        <OptionGrid
          options={dietaryOptions}
          selectedValues={dietaryPreferences}
          onToggle={(value) =>
            toggleSelection(
              value,
              dietaryPreferences,
              setDietaryPreferences,
            )
          }
        />
      </SetupCard>

      <SetupCard
        number="02"
        icon="shield-checkmark-outline"
        title="Any food allergies?"
        description="We will use these to filter meal suggestions."
      >
        <OptionGrid
          options={allergyOptions}
          selectedValues={allergies}
          onToggle={(value) =>
            toggleSelection(
              value,
              allergies,
              setAllergies,
            )
          }
        />

        {allergies
          .filter(
            (allergy) =>
              !allergyOptions.some(
                (option) => option.label === allergy,
              ),
          )
          .map((allergy) => (
            <Pressable
              key={allergy}
              onPress={() =>
                toggleSelection(
                  allergy,
                  allergies,
                  setAllergies,
                )
              }
              style={styles.customAllergyTag}
            >
              <Text style={styles.customAllergyText}>
                {allergy}
              </Text>

              <Ionicons
                name="close"
                size={theme.iconSizes.xs}
                color={theme.colors.primaryDark}
              />
            </Pressable>
          ))}

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="add-outline"
              size={theme.iconSizes.sm}
              color={theme.colors.textMuted}
            />

            <TextInput
              value={customAllergy}
              onChangeText={setCustomAllergy}
              onSubmitEditing={addCustomAllergy}
              placeholder="Add another allergy"
              placeholderTextColor={theme.colors.textMuted}
              returnKeyType="done"
              style={styles.input}
            />
          </View>

          <Pressable
            onPress={addCustomAllergy}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name="add"
              size={theme.iconSizes.md}
              color={theme.colors.textInverse}
            />
          </Pressable>
        </View>
      </SetupCard>

      <SetupCard
        number="03"
        icon="storefront-outline"
        title="Where do you shop?"
        description="Choose your preferred grocery stores."
      >
        <OptionGrid
          options={storeOptions}
          selectedValues={preferredStores}
          onToggle={(value) =>
            toggleSelection(
              value,
              preferredStores,
              setPreferredStores,
            )
          }
        />
      </SetupCard>

      <SetupCard
        number="04"
        icon="notifications-outline"
        title="Stay ahead"
        description="Choose the reminders you want Fridgy to send."
      >
        <NotificationOption
          icon="time-outline"
          title="Expiration reminders"
          description="Receive a reminder before food goes bad."
          enabled={expirationNotifications}
          onChange={setExpirationNotifications}
        />

        <NotificationOption
          icon="trending-down-outline"
          title="Low-stock reminders"
          description="Know when frequently used items run low."
          enabled={lowStockNotifications}
          onChange={setLowStockNotifications}
        />
      </SetupCard>

      <View style={styles.localCard}>
        <View style={styles.localIcon}>
          <Ionicons
            name="phone-portrait-outline"
            size={theme.iconSizes.lg}
            color={theme.colors.primaryDark}
          />
        </View>

        <View style={styles.localContent}>
          <Text style={styles.localTitle}>
            Start without an account
          </Text>

          <Text style={styles.localDescription}>
            Keep your data on this device and create an account
            later when you want cloud syncing.
          </Text>
        </View>

        <Ionicons
          name="shield-checkmark-outline"
          size={theme.iconSizes.md}
          color={theme.colors.primary}
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.primaryButtonPressed,
        ]}
      >
        <Text style={styles.primaryButtonText}>
          Continue locally
        </Text>

        <View style={styles.primaryButtonIcon}>
          <Ionicons
            name="arrow-forward"
            size={theme.iconSizes.sm}
            color={theme.colors.text}
          />
        </View>
      </Pressable>

      <View style={styles.dividerRow}>
        <View style={styles.divider} />

        <Text style={styles.dividerText}>
          OR SAVE AND SYNC
        </Text>

        <View style={styles.divider} />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.accountButton,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons
          name="person-add-outline"
          size={theme.iconSizes.md}
          color={theme.colors.textInverse}
        />

        <Text style={styles.accountButtonText}>
          Create an account
        </Text>
      </Pressable>

      <Pressable style={styles.signInButton}>
        <Text style={styles.signInPrompt}>
          Already have an account?
        </Text>

        <Text style={styles.signInText}>Sign in</Text>
      </Pressable>

      <Text style={styles.privacyText}>
        Your preferences remain on this device unless you create an
        account.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing["5xl"],
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },

  smallLogo: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.primary,
    ...theme.shadows.small,
  },

  brandName: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text,
  },

  skipButton: {
    marginLeft: "auto",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },

  skipText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.textMuted,
  },

  hero: {
    overflow: "hidden",
    marginBottom: theme.spacing["2xl"],
    padding: theme.spacing.xl,
    borderRadius: theme.radii["2xl"],
    backgroundColor: theme.colors.primary,
    ...theme.shadows.large,
  },

  heroDecoration: {
    position: "absolute",
    top: -32,
    right: -24,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.accentLight,
  },

  heroIconContainer: {
    width: 78,
    height: 78,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radii.xl,
    backgroundColor: theme.colors.accent,
    ...theme.shadows.medium,
  },

  heroContent: {
    width: "70%",
    minHeight: 230,
    justifyContent: "center",
  },

  stepBadge: {
    alignSelf: "flex-start",
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radii.xs,
    backgroundColor: theme.colors.accent,
  },

  stepBadgeText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.fontWeights.extraBold,
    color: theme.colors.text,
    letterSpacing: 1,
  },

  heroTitle: {
    fontSize: theme.fontSizes["2xl"],
    lineHeight: theme.lineHeights["2xl"],
    fontWeight: theme.fontWeights.extraBold,
    color: theme.colors.textInverse,
  },

  heroDescription: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSizes.sm,
    lineHeight: theme.lineHeights.sm,
    color: theme.colors.textInverse,
    opacity: theme.opacity.muted,
  },

  heroFeatureRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },

  customAllergyTag: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    marginTop: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.accentLight,
  },

  customAllergyText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.primaryDark,
  },

  inputRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },

  inputContainer: {
    flex: 1,
    minHeight: theme.componentSizes.inputHeight,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.surfaceSoft,
  },

  input: {
    flex: 1,
    fontSize: theme.fontSizes.md,
    color: theme.colors.text,
  },

  addButton: {
    width: theme.componentSizes.inputHeight,
    height: theme.componentSizes.inputHeight,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.primary,
    ...theme.shadows.small,
  },

  localCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.accent,
    borderRadius: theme.radii.xl,
    backgroundColor: theme.colors.accentLight,
    ...theme.shadows.small,
  },

  localIcon: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.surface,
  },

  localContent: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },

  localTitle: {
    fontSize: theme.fontSizes.md,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text,
  },

  localDescription: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fontSizes.sm,
    lineHeight: theme.lineHeights.sm,
    color: theme.colors.textSecondary,
  },

  primaryButton: {
    minHeight: theme.componentSizes.buttonHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.sm,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.accent,
    ...theme.shadows.medium,
  },

  primaryButtonPressed: {
    backgroundColor: theme.colors.accentDark,
    transform: [{ scale: 0.98 }],
  },

  primaryButtonText: {
    fontSize: theme.fontSizes.md,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text,
  },

  primaryButtonIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surface,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    marginVertical: theme.spacing.xl,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.borderStrong,
  },

  dividerText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textMuted,
  },

  accountButton: {
    minHeight: theme.componentSizes.buttonHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.primary,
    ...theme.shadows.medium,
  },

  accountButtonText: {
    fontSize: theme.fontSizes.md,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textInverse,
  },

  signInButton: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.xs,
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },

  signInPrompt: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textMuted,
  },

  signInText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primaryDark,
  },

  privacyText: {
    maxWidth: 340,
    alignSelf: "center",
    marginTop: theme.spacing.md,
    fontSize: theme.fontSizes.xs,
    lineHeight: theme.lineHeights.xs,
    color: theme.colors.textMuted,
    textAlign: "center",
  },

  pressed: {
    opacity: theme.opacity.pressed,
    transform: [{ scale: 0.98 }],
  },
});