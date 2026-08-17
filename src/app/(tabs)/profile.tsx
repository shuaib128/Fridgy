import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";

import { logout } from "@/auth/logout";
import { Screen } from "@/components/ui/screen";
import { theme } from "@/styles/theme";
import { router } from "expo-router";
import { PageHeader } from "../../components/navigation/screen-header";

type MenuItem = {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconBackground:
    | "primary"
    | "accent"
    | "soft"
    | "muted";
};

const ACCOUNT_ITEMS: MenuItem[] = [
    {
        id: "personal-information",
        title: "Personal information",
        description:
            "Update your name, photo, and account details.",
        icon: "person-outline",
        iconBackground: "accent",
    },
    {
        id: "household",
        title: "Household",
        description:
            "Manage who shares your kitchen inventory.",
        icon: "people-outline",
        iconBackground: "soft",
    },
    {
        id: "dietary-preferences",
        title: "Dietary preferences",
        description:
            "Adjust meal suggestions and food preferences.",
        icon: "nutrition-outline",
        iconBackground: "primary",
    },
];

const APP_ITEMS: MenuItem[] = [
    {
        id: "notifications",
        title: "Notifications",
        description:
            "Control expiry and low-stock reminders.",
        icon: "notifications-outline",
        iconBackground: "accent",
    },
    {
        id: "appearance",
        title: "Appearance",
        description:
            "Manage how Fridgy looks on your device.",
        icon: "color-palette-outline",
        iconBackground: "soft",
    },
    {
        id: "privacy",
        title: "Privacy and security",
        description:
            "Review privacy settings and account security.",
        icon: "shield-checkmark-outline",
        iconBackground: "primary",
    },
];

export default function ProfileScreen() {
    const [expiryReminders, setExpiryReminders] =
        useState(true);

    const [lowStockReminders, setLowStockReminders] =
        useState(true);

    const [mealSuggestions, setMealSuggestions] =
        useState(false);

    const getIconBackground = (
        background: MenuItem["iconBackground"],
    ) => {
        switch (background) {
            case "primary":
                return styles.primaryIconBackground;

            case "accent":
                return styles.accentIconBackground;

            case "muted":
                return styles.mutedIconBackground;

            default:
                return styles.softIconBackground;
        }
    };

    const renderMenuItem = (item: MenuItem) => {
        const usesInverseIcon =
            item.iconBackground === "primary";


        return (
            <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityLabel={item.title}
                style={({ pressed }) => [
                    styles.menuItem,
                    pressed && styles.pressed,
                ]}
            >
                <View
                    style={[
                        styles.menuIcon,
                        getIconBackground(
                            item.iconBackground,
                        ),
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
                        color={theme.colors.primaryDark}
                    />
                </View>
            </Pressable>
        );
    };

    // Handle logout
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

    return (
        <Screen
            scrollable
            padded={false}
            backgroundColor={theme.colors.background}
            contentContainerStyle={
                styles.contentContainer
            }
        >
            <PageHeader
                eyebrow="YOUR FRIDGY"
                title="Profile"
                description="Manage your account, household, and app preferences."
                icon="settings-outline"
                accessibilityLabel="Open profile settings"
                onPress={() => {
                }}
            />

            <View style={styles.profileCard}>
                <View style={styles.avatarOuter}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            SA
                        </Text>
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Change profile picture"
                        style={({ pressed }) => [
                            styles.editAvatarButton,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Ionicons
                            name="camera"
                            size={theme.iconSizes.sm}
                            color={
                                theme.colors.primaryDark
                            }
                        />
                    </Pressable>
                </View>

                <View style={styles.profileContent}>
                    <Text style={styles.profileName}>
                        Shuaib Ahamed
                    </Text>

                    <Text style={styles.profileEmail}>
                        shuaib@example.com
                    </Text>

                    <View style={styles.profileBadge}>
                        <Ionicons
                            name="home"
                            size={theme.iconSizes.xs}
                            color={
                                theme.colors.primaryDark
                            }
                        />

                        <Text
                            style={
                                styles.profileBadgeText
                            }
                        >
                            My kitchen
                        </Text>
                    </View>
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Edit profile"
                    style={({ pressed }) => [
                        styles.editProfileButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Ionicons
                        name="pencil-outline"
                        size={theme.iconSizes.sm}
                        color={theme.colors.textInverse}
                    />
                </Pressable>
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
                            color={
                                theme.colors.primaryDark
                            }
                        />
                    </View>

                    <Text style={styles.statValue}>
                        24
                    </Text>

                    <Text style={styles.statLabel}>
                        Food items
                    </Text>
                </View>

                <View style={styles.statDivider} />

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
                            color={
                                theme.colors.primaryDark
                            }
                        />
                    </View>

                    <Text style={styles.statValue}>
                        12
                    </Text>

                    <Text style={styles.statLabel}>
                        Saved meals
                    </Text>
                </View>

                <View style={styles.statDivider} />

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
                            color={
                                theme.colors.textInverse
                            }
                        />
                    </View>

                    <Text style={styles.statValue}>
                        8
                    </Text>

                    <Text style={styles.statLabel}>
                        Foods saved
                    </Text>
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionTitle}>
                        Account
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                        Your personal and household settings
                    </Text>
                </View>
            </View>

            <View style={styles.menuCard}>
                {ACCOUNT_ITEMS.map((item, index) => (
                    <View key={item.id}>
                        {renderMenuItem(item)}

                        {index <
                            ACCOUNT_ITEMS.length - 1 && (
                                <View
                                    style={
                                        styles.menuDivider
                                    }
                                />
                            )}
                    </View>
                ))}
            </View>

            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionTitle}>
                        Smart reminders
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                        Choose which updates Fridgy should
                        send
                    </Text>
                </View>
            </View>

            <View style={styles.reminderCard}>
                <View style={styles.reminderRow}>
                    <View
                        style={[
                            styles.menuIcon,
                            styles.accentIconBackground,
                        ]}
                    >
                        <Ionicons
                            name="time-outline"
                            size={theme.iconSizes.md}
                            color={
                                theme.colors.primaryDark
                            }
                        />
                    </View>

                    <View
                        style={styles.reminderContent}
                    >
                        <Text
                            style={styles.reminderTitle}
                        >
                            Expiry reminders
                        </Text>

                        <Text
                            style={
                                styles.reminderDescription
                            }
                        >
                            Get notified before food expires.
                        </Text>
                    </View>

                    <Switch
                        value={expiryReminders}
                        onValueChange={
                            setExpiryReminders
                        }
                        trackColor={{
                            false:
                                theme.colors.borderStrong,
                            true:
                                theme.colors.primaryLight,
                        }}
                        thumbColor={
                            expiryReminders
                                ? theme.colors.primary
                                : theme.colors.surface
                        }
                        ios_backgroundColor={
                            theme.colors.borderStrong
                        }
                    />
                </View>

                <View style={styles.menuDivider} />

                <View style={styles.reminderRow}>
                    <View
                        style={[
                            styles.menuIcon,
                            styles.softIconBackground,
                        ]}
                    >
                        <Ionicons
                            name="basket-outline"
                            size={theme.iconSizes.md}
                            color={
                                theme.colors.primaryDark
                            }
                        />
                    </View>

                    <View
                        style={styles.reminderContent}
                    >
                        <Text
                            style={styles.reminderTitle}
                        >
                            Low-stock reminders
                        </Text>

                        <Text
                            style={
                                styles.reminderDescription
                            }
                        >
                            Know when pantry items are
                            running low.
                        </Text>
                    </View>

                    <Switch
                        value={lowStockReminders}
                        onValueChange={
                            setLowStockReminders
                        }
                        trackColor={{
                            false:
                                theme.colors.borderStrong,
                            true:
                                theme.colors.primaryLight,
                        }}
                        thumbColor={
                            lowStockReminders
                                ? theme.colors.primary
                                : theme.colors.surface
                        }
                        ios_backgroundColor={
                            theme.colors.borderStrong
                        }
                    />
                </View>

                <View style={styles.menuDivider} />

                <View style={styles.reminderRow}>
                    <View
                        style={[
                            styles.menuIcon,
                            styles.primaryIconBackground,
                        ]}
                    >
                        <Ionicons
                            name="sparkles-outline"
                            size={theme.iconSizes.md}
                            color={
                                theme.colors.textInverse
                            }
                        />
                    </View>

                    <View
                        style={styles.reminderContent}
                    >
                        <Text
                            style={styles.reminderTitle}
                        >
                            Meal suggestions
                        </Text>

                        <Text
                            style={
                                styles.reminderDescription
                            }
                        >
                            Receive ideas based on your
                            inventory.
                        </Text>
                    </View>

                    <Switch
                        value={mealSuggestions}
                        onValueChange={
                            setMealSuggestions
                        }
                        trackColor={{
                            false:
                                theme.colors.borderStrong,
                            true:
                                theme.colors.primaryLight,
                        }}
                        thumbColor={
                            mealSuggestions
                                ? theme.colors.primary
                                : theme.colors.surface
                        }
                        ios_backgroundColor={
                            theme.colors.borderStrong
                        }
                    />
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionTitle}>
                        App settings
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                        Notifications, appearance, and
                        privacy
                    </Text>
                </View>
            </View>

            <View style={styles.menuCard}>
                {APP_ITEMS.map((item, index) => (
                    <View key={item.id}>
                        {renderMenuItem(item)}

                        {index <
                            APP_ITEMS.length - 1 && (
                                <View
                                    style={
                                        styles.menuDivider
                                    }
                                />
                            )}
                    </View>
                ))}
            </View>

            <View style={styles.supportCard}>
                <View style={styles.supportIcon}>
                    <Ionicons
                        name="help-circle-outline"
                        size={theme.iconSizes.xl}
                        color={theme.colors.primaryDark}
                    />
                </View>

                <View style={styles.supportContent}>
                    <Text style={styles.supportTitle}>
                        Need help?
                    </Text>

                    <Text
                        style={styles.supportDescription}
                    >
                        Find answers or contact Fridgy
                        support.
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

                <Text style={styles.signOutText}>
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
        backgroundColor: theme.colors.accent,
        borderRadius: theme.radii.full,
        borderWidth: 4,
        borderColor: theme.colors.primaryLight,
        ...theme.shadows.small,
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

    editProfileButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.primaryDark,
        borderRadius: theme.radii.full,
        ...theme.shadows.small,
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

    sectionHeader: {
        marginTop: theme.spacing["2xl"],
        marginBottom: theme.spacing.md,
    },

    sectionTitle: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.extraBold,
    },

    sectionSubtitle: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        marginTop: 2,
    },

    menuCard: {
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii["2xl"],
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.medium,
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

    menuDivider: {
        height: 1,
        marginLeft:
            48 +
            theme.spacing.md,
        backgroundColor: theme.colors.border,
    },

    reminderCard: {
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii["2xl"],
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.medium,
    },

    reminderRow: {
        minHeight: 88,
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.md,
        paddingVertical: theme.spacing.md,
    },

    reminderContent: {
        flex: 1,
        minWidth: 0,
    },

    reminderTitle: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.md,
        lineHeight: theme.lineHeights.md,
        fontWeight: theme.fontWeights.bold,
    },

    reminderDescription: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        marginTop: 2,
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