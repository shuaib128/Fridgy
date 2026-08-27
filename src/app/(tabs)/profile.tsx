import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { router } from "expo-router";
import { useUserStore } from "@/stores/auth-store";
import { useInventoryStore } from "@/stores/inventory-store";
import { useUserPreferenceStore } from "@/stores/user-preference-store";
import { logout } from "@/auth/logout";
import api, { ApiError } from "@/hooks/api";
import {
    CreateUserPreferenceRequest,
    CreateUserPreferenceResponse,
} from "@/types/user-preference";
import { getUserPreferences } from "@/components/onboarding/get-user-preferance";
import { Screen } from "@/components/ui/screen";
import { PageHeader } from "../../components/navigation/screen-header";
import AccountSection from "@/components/profile/AccountSection";
import SmartRemindersSection from "@/components/profile/SmartRemindersSection";
import AppSettingsSection from "@/components/profile/AppSettingsSection";
import { theme } from "@/styles/theme";

type MenuItem = {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconBackground: "primary" | "accent" | "soft" | "muted";
    onPress: () => void;
};

type ReminderPreferenceKey =
    | "expirationNotifications"
    | "lowStockNotifications"
    | "mealSuggestionNotifications";

const ACCOUNT_ITEMS: MenuItem[] = [
    {
        id: "household",
        title: "Household",
        description: "Manage who shares your kitchen inventory.",
        icon: "people-outline",
        iconBackground: "soft",
        onPress: () => router.push("/onboarding"),
    },
    {
        id: "dietary-preferences",
        title: "Dietary preferences",
        description: "Adjust meal suggestions and food preferences.",
        icon: "nutrition-outline",
        iconBackground: "primary",
        onPress: () => router.push("/onboarding"),
    },
];

const APP_ITEMS: MenuItem[] = [
    {
        id: "appearance",
        title: "Appearance",
        description: "Manage how Fridgy looks on your device.",
        icon: "color-palette-outline",
        iconBackground: "soft",
        onPress: () => router.push("/appearance-preview"),
    },
    {
        id: "privacy",
        title: "Privacy and security",
        description: "Review privacy settings and account security.",
        icon: "shield-checkmark-outline",
        iconBackground: "primary",
        onPress: () => Linking.openURL("https://www.tesla.com/support"),
    },
];

export default function ProfileScreen() {
    const user = useUserStore((state) => state.user);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const itemsQuantity = useInventoryStore(
        (state) => state.items.length,
    );

    const storedPreferences = useUserPreferenceStore(
        (state) => state.preference,
    );

    const hasLoadedPreferences = useUserPreferenceStore(
        (state) => state.hasLoaded,
    );

    const setStoredPreferences = useUserPreferenceStore(
        (state) => state.setPreference,
    );

    /*
     * Load the preferences if another screen has not already
     * loaded them into Zustand.
     */
    useEffect(() => {
        if (hasLoadedPreferences) {
            return;
        }

        async function loadPreferences() {
            try {
                const preferences = await getUserPreferences();
                setStoredPreferences(preferences);
            } catch (error) {
                console.error("Failed to load user preferences:", error);
            }
        }

        loadPreferences();
    }, [
        hasLoadedPreferences,
        setStoredPreferences,
    ]);

    /*
     * Changes the Zustand value immediately and then saves
     * the complete preferences object to the backend.
     */
    async function updateReminder(
        field: ReminderPreferenceKey,
        value: boolean,
    ) {
        if (!storedPreferences) { return; }

        const previousPreferences = storedPreferences;

        const updatedPreferences = {
            ...storedPreferences,
            [field]: value,
        };

        // Update the switches immediately.
        setStoredPreferences(updatedPreferences);

        const request: CreateUserPreferenceRequest = {
            dietaryPreferences: updatedPreferences.dietaryPreferences,
            allergies: updatedPreferences.allergies,
            preferredStores: updatedPreferences.preferredStores,
            expirationNotifications: updatedPreferences.expirationNotifications,
            lowStockNotifications: updatedPreferences.lowStockNotifications,
            mealSuggestionNotifications: updatedPreferences.mealSuggestionNotifications,
        };

        try {
            const response = await api.put<CreateUserPreferenceResponse>(
                "/users/me/preferences",
                request,
            );

            // Replace local data with the backend response.
            setStoredPreferences(response.preferences);
        } catch (error) {
            // Restore the value if saving failed.
            setStoredPreferences(previousPreferences);

            if (error instanceof ApiError) {
                console.error(
                    "Failed to update reminder preference:",
                    {
                        status: error.status,
                        message: error.message,
                        data: error.data,
                    },
                );
            } else {
                console.error("Unexpected preference update error:", error);
            }

            Alert.alert(
                "Update failed",
                "Could not update your reminder preference.",
            );
        }
    }

    const expiryReminders = storedPreferences?.expirationNotifications ?? false;
    const lowStockReminders = storedPreferences?.lowStockNotifications ?? false;
    const mealSuggestions = storedPreferences?.mealSuggestionNotifications ?? false;

    function setExpiryReminders(value: boolean) {
        void updateReminder(
            "expirationNotifications",
            value,
        );
    }

    function setLowStockReminders(value: boolean) {
        void updateReminder(
            "lowStockNotifications",
            value,
        );
    }

    function setMealSuggestions(value: boolean) {
        void updateReminder(
            "mealSuggestionNotifications",
            value,
        );
    }

    const getIconBackground = (background: MenuItem["iconBackground"]) => {
        switch (background) {
            case "primary": return styles.primaryIconBackground;
            case "accent": return styles.accentIconBackground;
            case "muted": return styles.mutedIconBackground;
            default: return styles.softIconBackground;
        }
    };

    const renderMenuItem = (item: MenuItem) => {
        const usesInverseIcon = item.iconBackground === "primary";

        return (
            <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityLabel={item.title}
                style={({ pressed }) => [
                    styles.menuItem,
                    pressed && styles.pressed,
                ]}
                onPress={item.onPress}
            >
                <View
                    style={[
                        styles.menuIcon,
                        getIconBackground(item.iconBackground)
                    ]}
                >
                    <Ionicons
                        name={item.icon}
                        size={theme.iconSizes.md}
                        color={
                            usesInverseIcon
                                ? theme.colors.textInverse
                                : theme.colors.primaryDark
                        }
                    />
                </View>

                <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>
                        {item.title}
                    </Text>

                    <Text
                        style={styles.menuDescription}
                    >
                        {item.description}
                    </Text>
                </View>

                <View style={styles.chevronButton}>
                    <Ionicons
                        name="chevron-forward"
                        size={theme.iconSizes.sm}
                        color={
                            theme.colors.primaryDark
                        }
                    />
                </View>
            </Pressable>
        );
    };

    async function handleLogout() {
        try {
            await logout();
            router.replace("/login");
        } catch (error) {
            console.error("Logout failed:", error);

            Alert.alert(
                "Logout failed",
                "We couldn't log you out. Please try again.",
            );
        }
    }

    function confirmLogout() {
        Alert.alert(
            "Log out?",
            "You will need to sign in again to access your account.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Log Out",
                    style: "destructive",
                    onPress: handleLogout,
                },
            ],
        );
    }


    // Controll the refresh control
    const handleRefresh = () => {
        setIsRefreshing(true);

        setTimeout(() => {
            console.log("Executed after 2 seconds");
            setIsRefreshing(false);
        }, 3000);
    };

    return (
        <Screen
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            scrollable
            padded={false}
            backgroundColor={theme.colors.background}
            contentContainerStyle={styles.contentContainer}
        >
            <PageHeader
                eyebrow="YOUR FRIDGY"
                title="Profile"
                description="Manage your account, household, and app preferences."
                icon="settings-outline"
                accessibilityLabel="Open profile settings"
                onPress={() => { }}
            />

            <View style={styles.profileCard}>
                <View style={styles.avatarOuter}>
                    <View style={styles.avatar}>
                        {user?.profileImage ? (
                            <Image
                                source={{ uri: user.profileImage }}
                                style={styles.avatarImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <Text
                                style={styles.avatarText}
                            >
                                {user?.name?.trim().slice(0, 2).toUpperCase() || "??"}
                            </Text>
                        )}
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Change profile picture"
                        style={({ pressed }) => [
                            styles.editAvatarButton,
                            pressed &&
                            styles.pressed,
                        ]}
                    >
                        <Ionicons
                            name="camera"
                            size={theme.iconSizes.sm}
                            color={theme.colors.primaryDark}
                        />
                    </Pressable>
                </View>

                <View
                    style={styles.profileContent}
                >
                    <Text
                        style={styles.profileName}
                    >
                        {user?.name}
                    </Text>

                    <Text
                        style={styles.profileEmail}
                    >
                        {user?.email}
                    </Text>

                    <View
                        style={styles.profileBadge}
                    >
                        <Ionicons
                            name="home"
                            size={theme.iconSizes.xs}
                            color={theme.colors.primaryDark}
                        />

                        <Text
                            style={styles.profileBadgeText}
                        >
                            My kitchen
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <View
                        style={[
                            styles.statIcon,
                            styles.accentIconBackground,
                        ]}
                    >
                        <Ionicons
                            name="cube-outline"
                            size={theme.iconSizes.md}
                            color={theme.colors.primaryDark}
                        />
                    </View>

                    <Text
                        style={styles.statValue}
                    >
                        {itemsQuantity}
                    </Text>

                    <Text
                        style={styles.statLabel}
                    >
                        {itemsQuantity === 1 ? "Food item" : "Food items"}
                    </Text>
                </View>

                <View
                    style={styles.statDivider}
                />

                <View style={styles.statItem}>
                    <View
                        style={[
                            styles.statIcon,
                            styles.softIconBackground,
                        ]}
                    >
                        <Ionicons
                            name="restaurant-outline"
                            size={theme.iconSizes.md}
                            color={theme.colors.primaryDark}
                        />
                    </View>

                    <Text
                        style={styles.statValue}
                    >
                        12
                    </Text>

                    <Text
                        style={styles.statLabel}
                    >
                        Saved meals
                    </Text>
                </View>

                <View
                    style={styles.statDivider}
                />

                <View style={styles.statItem}>
                    <View
                        style={[
                            styles.statIcon,
                            styles.primaryIconBackground,
                        ]}
                    >
                        <Ionicons
                            name="leaf-outline"
                            size={theme.iconSizes.md}
                            color={theme.colors.textInverse}
                        />
                    </View>

                    <Text
                        style={styles.statValue}
                    >
                        8
                    </Text>

                    <Text
                        style={styles.statLabel}
                    >
                        Foods saved
                    </Text>
                </View>
            </View>

            <AccountSection
                items={ACCOUNT_ITEMS}
                renderMenuItem={renderMenuItem}
            />

            <SmartRemindersSection
                expiryReminders={expiryReminders}
                setExpiryReminders={setExpiryReminders}
                lowStockReminders={lowStockReminders}
                setLowStockReminders={setLowStockReminders}
                mealSuggestions={mealSuggestions}
                setMealSuggestions={setMealSuggestions}
            />

            <AppSettingsSection
                items={APP_ITEMS}
                renderMenuItem={renderMenuItem}
            />

            <View style={styles.supportCard}>
                <View style={styles.supportIcon}>
                    <Ionicons
                        name="help-circle-outline"
                        size={theme.iconSizes.xl}
                        color={theme.colors.primaryDark}
                    />
                </View>

                <View
                    style={styles.supportContent}
                >
                    <Text
                        style={styles.supportTitle}
                    >
                        Need help?
                    </Text>

                    <Text
                        style={
                            styles.supportDescription
                        }
                    >
                        Find answers or contact
                        Fridgy support.
                    </Text>
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Open help center"
                    style={({ pressed }) => [
                        styles.supportButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Ionicons
                        name="arrow-forward"
                        size={theme.iconSizes.sm}
                        color={theme.colors.textInverse}
                    />
                </Pressable>
            </View>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Sign out"
                style={({ pressed }) => [
                    styles.signOutButton,
                    pressed && styles.pressed,
                ]}
                onPress={confirmLogout}
            >
                <Ionicons
                    name="log-out-outline"
                    size={theme.iconSizes.md}
                    color={theme.colors.error}
                />

                <Text
                    style={styles.signOutText}
                >
                    Sign out
                </Text>
            </Pressable>

            <Text style={styles.versionText}>
                Fridgy version 1.0.0
            </Text>

            <View style={styles.bottomSpacing} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
    },

    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.md,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radii["2xl"],
        borderWidth: 1,
        borderColor: theme.colors.primaryDark,
        ...theme.shadows.large,
    },

    avatarOuter: {
        position: "relative",
    },

    avatar: {
        width: 74,
        height: 74,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: theme.colors.accent,
        borderRadius: theme.radii.full,
        borderWidth: 4,
        borderColor: theme.colors.primaryLight,
        ...theme.shadows.small,
    },

    avatarImage: {
        width: "100%",
        height: "100%",
    },

    avatarText: {
        color: theme.colors.primaryDark,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.extraBold,
    },

    editAvatarButton: {
        position: "absolute",
        right: -2,
        bottom: -2,
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.full,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        ...theme.shadows.small,
    },

    profileContent: {
        flex: 1,
        minWidth: 0,
    },

    profileName: {
        color: theme.colors.textInverse,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.extraBold,
    },

    profileEmail: {
        color: theme.colors.backgroundMuted,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
        marginTop: 2,
    },

    profileBadge: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        marginTop: theme.spacing.sm,
        backgroundColor: theme.colors.accent,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.accentLight,
    },

    profileBadgeText: {
        color: theme.colors.primaryDark,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        fontWeight: theme.fontWeights.bold,
    },

    statsCard: {
        flexDirection: "row",
        alignItems: "stretch",
        marginTop: theme.spacing.lg,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii["2xl"],
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.medium,
    },

    statItem: {
        flex: 1,
        alignItems: "center",
    },

    statIcon: {
        width: 46,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.radii.lg,
        marginBottom: theme.spacing.sm,
    },

    statValue: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.extraBold,
    },

    statLabel: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        textAlign: "center",
        marginTop: 2,
    },

    statDivider: {
        width: 1,
        marginHorizontal: theme.spacing.sm,
        backgroundColor: theme.colors.border,
    },

    menuItem: {
        minHeight: 82,
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.md,
        paddingVertical: theme.spacing.md,
    },

    menuIcon: {
        width: 48,
        height: 48,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.radii.lg,
    },

    primaryIconBackground: {
        backgroundColor: theme.colors.primary,
        borderWidth: 1,
        borderColor: theme.colors.primaryDark,
    },

    accentIconBackground: {
        backgroundColor: theme.colors.accent,
        borderWidth: 1,
        borderColor: theme.colors.accentDark,
    },

    softIconBackground: {
        backgroundColor: theme.colors.backgroundMuted,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    mutedIconBackground: {
        backgroundColor: theme.colors.surfaceSoft,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    menuContent: {
        flex: 1,
        minWidth: 0,
    },

    menuTitle: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.md,
        lineHeight: theme.lineHeights.md,
        fontWeight: theme.fontWeights.bold,
    },

    menuDescription: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        marginTop: 2,
    },

    chevronButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.backgroundMuted,
        borderRadius: theme.radii.full,
    },

    supportCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.md,
        padding: theme.spacing.lg,
        marginTop: theme.spacing["2xl"],
        backgroundColor: theme.colors.backgroundMuted,
        borderRadius: theme.radii["2xl"],
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.medium,
    },

    supportIcon: {
        width: 56,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.accent,
        borderRadius: theme.radii.xl,
        borderWidth: 1,
        borderColor: theme.colors.accentDark,
    },

    supportContent: {
        flex: 1,
        minWidth: 0,
    },

    supportTitle: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.md,
        lineHeight: theme.lineHeights.md,
        fontWeight: theme.fontWeights.bold,
    },

    supportDescription: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        marginTop: 2,
    },

    supportButton: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.primaryDark,
        ...theme.shadows.small,
    },

    signOutButton: {
        minHeight: theme.componentSizes.buttonHeight,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.sm,
        marginTop: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.error,
        ...theme.shadows.small,
    },

    signOutText: {
        color: theme.colors.error,
        fontSize: theme.fontSizes.md,
        lineHeight: theme.lineHeights.md,
        fontWeight: theme.fontWeights.bold,
    },

    versionText: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        textAlign: "center",
        marginTop: theme.spacing.lg,
    },

    bottomSpacing: {
        height:
            theme.componentSizes.tabBarHeight +
            theme.spacing["4xl"],
    },

    pressed: {
        opacity: theme.opacity.pressed,
        transform: [{ scale: 0.98 }],
    },
});