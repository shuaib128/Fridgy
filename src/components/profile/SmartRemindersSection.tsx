import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import { theme } from "@/styles/theme";

type SmartRemindersSectionProps = {
    expiryReminders: boolean;
    setExpiryReminders: (value: boolean) => void;

    lowStockReminders: boolean;
    setLowStockReminders: (value: boolean) => void;

    mealSuggestions: boolean;
    setMealSuggestions: (value: boolean) => void;
};

export default function SmartRemindersSection({
    expiryReminders,
    setExpiryReminders,
    lowStockReminders,
    setLowStockReminders,
    mealSuggestions,
    setMealSuggestions,
}: SmartRemindersSectionProps) {
    return (
        <>
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
                            color={theme.colors.primaryDark}
                        />
                    </View>

                    <View style={styles.reminderContent}>
                        <Text style={styles.reminderTitle}>
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
                        onValueChange={setExpiryReminders}
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
                            color={theme.colors.primaryDark}
                        />
                    </View>

                    <View style={styles.reminderContent}>
                        <Text style={styles.reminderTitle}>
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
                            color={theme.colors.textInverse}
                        />
                    </View>

                    <View style={styles.reminderContent}>
                        <Text style={styles.reminderTitle}>
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
                        onValueChange={setMealSuggestions}
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
        </>
    );
}

const styles = StyleSheet.create({
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

    menuIcon: {
        width: 48,
        height: 48,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.radii.lg,
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

    primaryIconBackground: {
        backgroundColor: theme.colors.primary,
        borderWidth: 1,
        borderColor: theme.colors.primaryDark,
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

    menuDivider: {
        height: 1,
        marginLeft:
            48 +
            theme.spacing.md,
        backgroundColor: theme.colors.border,
    },
});