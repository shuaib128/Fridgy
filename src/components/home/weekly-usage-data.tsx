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

type WeeklyUsageData = {
    id: string;
    day: string;
    percentage: number;
};

type WeeklyInsightsCardProps = {
    produceUsagePercentage: number;
    produceUsed: number;
    produceWasted: number;
    changeFromLastWeek: number;
    weeklyData: WeeklyUsageData[];
    onPress?: () => void;
};

export default function WeeklyInsightsCard({
    produceUsagePercentage,
    produceUsed,
    produceWasted,
    changeFromLastWeek,
    weeklyData,
    onPress,
}: WeeklyInsightsCardProps) {
    const isImproving = changeFromLastWeek >= 0;

    const performanceLabel =
        produceUsagePercentage >= 90
            ? "Excellent!"
            : produceUsagePercentage >= 75
                ? "Great work!"
                : produceUsagePercentage >= 50
                    ? "Good progress"
                    : "Keep going";

    return (
        <Pressable
            accessibilityRole={onPress ? "button" : undefined}
            accessibilityLabel={`Weekly insights. You used ${produceUsagePercentage}% of your fresh produce.`}
            disabled={!onPress}
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                pressed && onPress && styles.cardPressed,
            ]}
        >
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.eyebrow}>
                        THIS WEEK
                    </Text>

                    <Text style={styles.title}>
                        Weekly insights
                    </Text>

                    <Text style={styles.subtitle}>
                        See how well you used what you bought.
                    </Text>
                </View>

                <View style={styles.iconBadge}>
                    <Ionicons
                        name="stats-chart-outline"
                        size={iconSizes.lg}
                        color={colors.primaryDark}
                    />
                </View>
            </View>

            <View style={styles.scoreSection}>
                <View style={styles.scoreContent}>
                    <Text style={styles.scoreLabel}>
                        Fresh produce used
                    </Text>

                    <View style={styles.scoreRow}>
                        <Text style={styles.scoreValue}>
                            {produceUsagePercentage}
                        </Text>

                        <Text style={styles.scoreSymbol}>
                            %
                        </Text>
                    </View>

                    <View style={styles.performanceRow}>
                        <View style={styles.performanceDot} />

                        <Text style={styles.performanceText}>
                            {performanceLabel}
                        </Text>
                    </View>
                </View>

                <View style={styles.circularProgress}>
                    <View style={styles.circularProgressInner}>
                        <Ionicons
                            name="leaf"
                            size={iconSizes.lg}
                            color={colors.primaryDark}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.graphSection}>
                <View style={styles.graphHeader}>
                    <View>
                        <Text style={styles.graphTitle}>
                            Daily produce usage
                        </Text>

                        <Text style={styles.graphSubtitle}>
                            Percentage used each day
                        </Text>
                    </View>

                    <View style={styles.changeBadge}>
                        <Ionicons
                            name={
                                isImproving
                                    ? "trending-up"
                                    : "trending-down"
                            }
                            size={iconSizes.xs}
                            color={
                                isImproving
                                    ? colors.success
                                    : colors.error
                            }
                        />

                        <Text
                            style={[
                                styles.changeText,
                                {
                                    color: isImproving
                                        ? colors.success
                                        : colors.error,
                                },
                            ]}
                        >
                            {isImproving ? "+" : ""}
                            {changeFromLastWeek}%
                        </Text>
                    </View>
                </View>

                <View style={styles.chart}>
                    {weeklyData.map((item, index) => {
                        const normalizedPercentage = Math.max(
                            4,
                            Math.min(item.percentage, 100),
                        );

                        return (
                            <View
                                key={`${item.day}-${index}`}
                                style={styles.chartColumn}
                            >
                                <View style={styles.barTrack}>
                                    <View
                                        style={[
                                            styles.barFill,
                                            {
                                                height: `${normalizedPercentage}%`,
                                            },
                                        ]}
                                    />
                                </View>

                                <Text style={styles.dayLabel}>
                                    {item.day}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>

            <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                    <View style={styles.summaryIcon}>
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={iconSizes.sm}
                            color={colors.primaryDark}
                        />
                    </View>

                    <View style={styles.summaryContent}>
                        <Text style={styles.summaryValue}>
                            {produceUsed}
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Items used
                        </Text>
                    </View>
                </View>

                <View style={styles.summaryDivider} />

                <View style={styles.summaryItem}>
                    <View style={styles.summaryIcon}>
                        <Ionicons
                            name="trash-outline"
                            size={iconSizes.sm}
                            color={colors.primaryDark}
                        />
                    </View>

                    <View style={styles.summaryContent}>
                        <Text style={styles.summaryValue}>
                            {produceWasted}
                        </Text>

                        <Text style={styles.summaryLabel}>
                            Items wasted
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.insightBox}>
                <View style={styles.insightIcon}>
                    <Ionicons
                        name="sparkles"
                        size={iconSizes.sm}
                        color={colors.primaryDark}
                    />
                </View>

                <Text style={styles.insightText}>
                    You used most of your fresh produce before it
                    expired. Your leafy greens improved the most
                    this week.
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.xl,
        backgroundColor: colors.surface,
        ...shadows.medium,
    },

    cardPressed: {
        opacity: opacity.pressed,
        transform: [{ scale: 0.985 }],
    },

    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: spacing.lg,
        marginBottom: spacing.xl,
    },

    headerContent: {
        flex: 1,
        minWidth: 0,
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

    subtitle: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
    },

    iconBadge: {
        width: 72,
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
        borderColor: colors.primaryLight,
        borderRadius: radii.xl,
        backgroundColor: colors.accent,
        transform: [{ rotate: "-4deg" }],
        ...shadows.small,
    },

    scoreSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.lg,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        borderRadius: radii.lg,
        backgroundColor: colors.primaryDark,
    },

    scoreContent: {
        flex: 1,
    },

    scoreLabel: {
        color: colors.primaryLight,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.semibold,
    },

    scoreRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: spacing.xs,
    },

    scoreValue: {
        color: colors.textInverse,
        fontSize: fontSizes["4xl"],
        lineHeight: lineHeights["4xl"],
        fontWeight: fontWeights.extraBold,
    },

    scoreSymbol: {
        marginTop: spacing.xs,
        color: colors.accent,
        fontSize: fontSizes.xl,
        lineHeight: lineHeights.xl,
        fontWeight: fontWeights.extraBold,
    },

    performanceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginTop: spacing.xs,
    },

    performanceDot: {
        width: spacing.sm,
        height: spacing.sm,
        borderRadius: radii.full,
        backgroundColor: colors.accent,
    },

    performanceText: {
        color: colors.textInverse,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.bold,
    },

    circularProgress: {
        width: 82,
        height: 82,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 7,
        borderColor: colors.accent,
        borderRadius: radii.full,
        backgroundColor: colors.primary,
    },

    circularProgressInner: {
        width: 54,
        height: 54,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accent,
    },

    graphSection: {
        padding: spacing.lg,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        backgroundColor: colors.surfaceSoft,
    },

    graphHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: spacing.md,
        marginBottom: spacing.xl,
    },

    graphTitle: {
        color: colors.text,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.bold,
    },

    graphSubtitle: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.medium,
    },

    changeBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        minHeight: 32,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.full,
        backgroundColor: colors.surface,
    },

    changeText: {
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },

    chart: {
        height: 145,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: spacing.sm,
    },

    chartColumn: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    barTrack: {
        flex: 1,
        width: "68%",
        justifyContent: "flex-end",
        overflow: "hidden",
        borderRadius: radii.full,
        backgroundColor: colors.backgroundMuted,
    },

    barFill: {
        width: "100%",
        borderRadius: radii.full,
        backgroundColor: colors.primary,
    },

    dayLabel: {
        marginTop: spacing.sm,
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },

    summaryRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.lg,
        marginBottom: spacing.lg,
        borderRadius: radii.lg,
        backgroundColor: colors.backgroundMuted,
    },

    summaryItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },

    summaryIcon: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
    },

    summaryContent: {
        flex: 1,
        minWidth: 0,
    },

    summaryValue: {
        color: colors.text,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.lg,
        fontWeight: fontWeights.extraBold,
    },

    summaryLabel: {
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.medium,
    },

    summaryDivider: {
        width: 1,
        height: 40,
        marginHorizontal: spacing.lg,
        backgroundColor: colors.borderStrong,
    },

    insightBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.md,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        borderRadius: radii.lg,
        backgroundColor: colors.background,
    },

    insightIcon: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accent,
    },

    insightText: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
    },
});