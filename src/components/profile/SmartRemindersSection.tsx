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

// Remonder option render
const RenderReminderOption = ({
    reminderValue,
    setReminderValue,
    icon,
    reminderTitle,
    reminderDes
}: {
    reminderValue: boolean;
    setReminderValue: (value: boolean) => void;
    icon: keyof typeof Ionicons.glyphMap;
    reminderTitle: string;
    reminderDes: string;
}) => {
    return (
        <View style={styles.reminderRow}>
            <View
                style={[
                    styles.menuIcon,
                    styles.accentIconBackground,
                ]}
            >
                <Ionicons
                    name={icon}
                    size={theme.iconSizes.md}
                    color={theme.colors.primaryDark}
                />
            </View>

            <View style={styles.reminderContent}>
                <Text style={styles.reminderTitle}>
                    {reminderTitle}
                </Text>

                <Text
                    style={styles.reminderDescription}
                >
                    {reminderDes}
                </Text>
            </View>

            <Switch
                value={reminderValue}
                onValueChange={setReminderValue}
                trackColor={{
                    false: theme.colors.borderStrong,
                    true: theme.colors.primaryLight,
                }}
                thumbColor={reminderValue ? theme.colors.primary : theme.colors.surface}
                ios_backgroundColor={theme.colors.borderStrong}
            />
        </View>
    )
}

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
                <RenderReminderOption
                    reminderValue={expiryReminders}
                    setReminderValue={setExpiryReminders}
                    icon="time-outline"
                    reminderTitle="Expiry reminders"
                    reminderDes="Get notified before food expires."
                />

                <View style={styles.menuDivider} />

                <RenderReminderOption
                    reminderValue={lowStockReminders}
                    setReminderValue={setLowStockReminders}
                    icon="basket-outline"
                    reminderTitle="Low-stock reminders"
                    reminderDes="Know when pantry items are running low."
                />

                <View style={styles.menuDivider} />

                <RenderReminderOption
                    reminderValue={mealSuggestions}
                    setReminderValue={setMealSuggestions}
                    icon="sparkles-outline"
                    reminderTitle="Meal suggestions"
                    reminderDes="Receive ideas based on your inventory."
                />
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