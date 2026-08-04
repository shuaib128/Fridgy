import { Ionicons } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { theme } from "@/styles/theme";

const {
    colors,
    spacing,
    fontSizes,
    lineHeights,
    fontWeights,
    radii,
    iconSizes,
    shadows,
    opacity,
} = theme;

type SavingsStreakCardProps = {
    foodsSaved: number;
    estimatedSavings: number;
    mealsCooked: number;
    streakDays: number;
    onPress?: () => void;
};

export default function SavingsStreakCard({
    foodsSaved,
    estimatedSavings,
    mealsCooked,
    streakDays,
    onPress,
}: SavingsStreakCardProps) {
    return (
        <Pressable
            accessibilityRole={onPress ? "button" : undefined}
            accessibilityLabel={`${foodsSaved} foods saved, $${estimatedSavings} saved, and a ${streakDays} day cooking streak`}
            disabled={!onPress}
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                pressed && onPress && styles.cardPressed,
            ]}
        >
            <View style={styles.header}>
                <View>
                    <Text style={styles.eyebrow}>
                        YOUR PROGRESS
                    </Text>

                    <Text style={styles.title}>
                        Savings & streak
                    </Text>
                </View>

                <View style={styles.iconBadge}>
                    <Ionicons
                        name="trophy-outline"
                        size={iconSizes.lg}
                        color={colors.primaryDark}
                    />
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statSection}>
                    <View style={styles.statLabelRow}>
                        <View style={styles.smallIcon}>
                            <Ionicons
                                name="wallet-outline"
                                size={iconSizes.sm}
                                color={colors.primaryDark}
                            />
                        </View>

                        <Text style={styles.statLabel}>
                            This month
                        </Text>
                    </View>

                    <Text style={styles.primaryValue}>
                        ${estimatedSavings}
                    </Text>

                    <Text style={styles.statDescription}>
                        Estimated savings
                    </Text>

                    <View style={styles.detailPill}>
                        <Ionicons
                            name="leaf-outline"
                            size={iconSizes.xs}
                            color={colors.primaryDark}
                        />

                        <Text style={styles.detailText}>
                            {foodsSaved} foods saved
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.statSection}>
                    <View style={styles.statLabelRow}>
                        <View style={styles.smallIcon}>
                            <Ionicons
                                name="flame-outline"
                                size={iconSizes.sm}
                                color={colors.primaryDark}
                            />
                        </View>

                        <Text style={styles.statLabel}>
                            Cooking streak
                        </Text>
                    </View>

                    <Text style={styles.primaryValue}>
                        {streakDays} days
                    </Text>

                    <Text style={styles.statDescription}>
                        Current streak
                    </Text>

                    <View style={styles.detailPill}>
                        <Ionicons
                            name="restaurant-outline"
                            size={iconSizes.xs}
                            color={colors.primaryDark}
                        />

                        <Text style={styles.detailText}>
                            {mealsCooked} meals this week
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: spacing.xl,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        ...shadows.medium,
    },

    cardPressed: {
        opacity: opacity.pressed,
        transform: [{ scale: 0.985 }],
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.lg,
        marginBottom: spacing.xl,
    },

    eyebrow: {
        marginBottom: spacing.xs,
        color: colors.primary,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
        letterSpacing: 1.2,
    },

    title: {
        color: colors.text,
        fontSize: fontSizes.xl,
        lineHeight: lineHeights.xl,
        fontWeight: fontWeights.extraBold,
    },

    iconBadge: {
        width: 72,
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.xl,
        borderWidth: 4,
        borderColor: colors.primaryLight,
        backgroundColor: colors.accent,
        transform: [{ rotate: "-4deg" }],
        ...shadows.small,
    },

    statsContainer: {
        flexDirection: "row",
        alignItems: "stretch",
        padding: spacing.lg,
        borderRadius: radii.lg,
        backgroundColor: colors.surfaceSoft,
    },

    statSection: {
        flex: 1,
        minWidth: 0,
    },

    divider: {
        width: 1,
        marginHorizontal: spacing.lg,
        backgroundColor: colors.border,
    },

    statLabelRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginBottom: spacing.md,
    },

    smallIcon: {
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
    },

    statLabel: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.bold,
    },

    primaryValue: {
        color: colors.primaryDark,
        fontSize: fontSizes["2xl"],
        lineHeight: lineHeights["2xl"],
        fontWeight: fontWeights.extraBold,
    },

    statDescription: {
        marginTop: spacing.xs,
        marginBottom: spacing.md,
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.medium,
    },

    detailPill: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        minHeight: 32,
        paddingHorizontal: spacing.md,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        backgroundColor: colors.backgroundMuted,
    },

    detailText: {
        flexShrink: 1,
        color: colors.primaryDark,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },
});