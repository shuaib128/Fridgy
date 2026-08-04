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
    fontSizes,
    fontWeights,
    iconSizes,
    lineHeights,
    radii,
    shadows,
    spacing,
} = theme;

type KitchenOverviewCardProps = {
    totalItems: number;
    expiringSoon: number;
    runningLow: number;
    onPress?: () => void;
};

type OverviewItemProps = {
    icon: keyof typeof Ionicons.glyphMap;
    value: number;
    label: string;
    variant: "primary" | "warning" | "muted";
};

function OverviewItem({
    icon,
    value,
    label,
    variant,
}: OverviewItemProps) {
    const variantStyles = {
        primary: {
            iconBackground: colors.primaryDark,
            iconColor: colors.accent,
            valueColor: colors.primaryDark,
        },
        warning: {
            iconBackground: colors.accentLight,
            iconColor: colors.accentDark,
            valueColor: colors.accentDark,
        },
        muted: {
            iconBackground: colors.surfaceSoft,
            iconColor: colors.textMuted,
            valueColor: colors.text,
        },
    }[variant];

    return (
        <View style={styles.overviewItem}>
            <View
                style={[
                    styles.itemIcon,
                    {
                        backgroundColor:
                            variantStyles.iconBackground,
                    },
                ]}
            >
                <Ionicons
                    name={icon}
                    size={iconSizes.sm}
                    color={variantStyles.iconColor}
                />
            </View>

            <Text
                style={[
                    styles.itemValue,
                    {
                        color: variantStyles.valueColor,
                    },
                ]}
            >
                {value}
            </Text>

            <Text style={styles.itemLabel}>
                {label}
            </Text>
        </View>
    );
}

export default function KitchenOverviewCard({
    totalItems,
    expiringSoon,
    runningLow,
    onPress,
}: KitchenOverviewCardProps) {
    const content = (
        <>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.titleRow}>
                        <View style={styles.headerIcon}>
                            <Ionicons
                                name="cube-outline"
                                size={iconSizes.sm}
                                color={colors.primaryDark}
                            />
                        </View>

                        <Text style={styles.title}>
                            Kitchen Overview
                        </Text>
                    </View>

                    <Text style={styles.subtitle}>
                        A quick look at your kitchen
                    </Text>
                </View>

                {onPress ? (
                    <View style={styles.arrowButton}>
                        <Ionicons
                            name="chevron-forward"
                            size={iconSizes.sm}
                            color={colors.primaryDark}
                        />
                    </View>
                ) : null}
            </View>

            <View style={styles.overview}>
                <OverviewItem
                    icon="basket-outline"
                    value={totalItems}
                    label="Items"
                    variant="primary"
                />

                <View style={styles.divider} />

                <OverviewItem
                    icon="time-outline"
                    value={expiringSoon}
                    label="Expiring Soon"
                    variant="warning"
                />

                <View style={styles.divider} />

                <OverviewItem
                    icon="trending-down-outline"
                    value={runningLow}
                    label="Running Low"
                    variant="muted"
                />
            </View>
        </>
    );

    if (!onPress) {
        return (
            <View style={styles.card}>
                {content}
            </View>
        );
    }

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel="View kitchen inventory overview"
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
            ]}
        >
            {content}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        overflow: "hidden",
        padding: spacing.xl,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        ...shadows.medium,
    },

    cardPressed: {
        opacity: theme.opacity.pressed,
        transform: [
            {
                scale: 0.985,
            },
        ],
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
        marginBottom: spacing.xl,
    },

    headerContent: {
        flex: 1,
        minWidth: 0,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    headerIcon: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        backgroundColor: colors.accent,
    },

    title: {
        flexShrink: 1,
        color: colors.text,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.lg,
        fontWeight: fontWeights.extraBold,
    },

    subtitle: {
        marginTop: spacing.xs,
        marginLeft: 36 + spacing.sm,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
    },

    arrowButton: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.backgroundMuted,
    },

    overview: {
        flexDirection: "row",
        alignItems: "stretch",
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.sm,
        borderRadius: radii.lg,
        backgroundColor: colors.surfaceSoft,
    },

    overviewItem: {
        flex: 1,
        minWidth: 0,
        alignItems: "center",
        paddingHorizontal: spacing.xs,
    },

    itemIcon: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.sm,
        borderRadius: radii.full,
    },

    itemValue: {
        fontSize: fontSizes["2xl"],
        lineHeight: lineHeights["2xl"],
        fontWeight: fontWeights.extraBold,
    },

    itemLabel: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.semibold,
        textAlign: "center",
    },

    divider: {
        width: 1,
        marginVertical: spacing.xs,
        backgroundColor: colors.border,
    },
});