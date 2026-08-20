import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    colors,
    fontSizes,
    fontWeights,
    iconSizes,
    lineHeights,
    radii,
    shadows,
    spacing,
} from "@/styles/theme";
import type {
    CategoryID,
    InventoryItem,
} from "@/types/inventory-item";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type InventoryItemCardProps = {
    item: InventoryItem;
    onPress?: (item: InventoryItem) => void;
};

const CATEGORY_ICONS: Record<CategoryID, IoniconName> = {
    produce: "leaf-outline",
    meat: "restaurant-outline",
    dairy: "water-outline",
    pantry: "fast-food-outline",
    frozen: "snow-outline",
    drinks: "cafe-outline",
    other: "cube-outline",
    bakery: "cafe-outline",
};

// Get days untill experations
function getDaysUntilExpiration(expirationDate?: string): number | null {
    if (!expirationDate) {
        return null;
    }

    const expiration = new Date(expirationDate);
    const today = new Date();

    if (Number.isNaN(expiration.getTime())) {
        return null;
    }

    expiration.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    return Math.round(
        (expiration.getTime() - today.getTime()) /
        millisecondsPerDay,
    );
}

// Generate the label
function getExpirationLabel(expiresIn: number | null): string {
    if (expiresIn === null) {
        return "No expiry";
    }

    if (expiresIn < 0) {
        const daysExpired = Math.abs(expiresIn);
        return daysExpired === 1 ? "Expired 1 day ago" : `Expired ${daysExpired} days ago`;
    }

    if (expiresIn === 0) {
        return "Expires today";
    }

    if (expiresIn === 1) {
        return "1 day";
    }

    return `${expiresIn} days`;
}

function formatQuantity(
    quantity: number,
    unit: string,
): string {
    return `${quantity} ${unit}`;
}

export function InventoryItemCard({
    item,
    onPress,
}: InventoryItemCardProps) {
    const expiresIn = getDaysUntilExpiration(item.expirationDate);
    const expiryLabel = getExpirationLabel(expiresIn);
    const isUrgent = expiresIn !== null && expiresIn <= 2;
    const categoryIcon = CATEGORY_ICONS[item.category];

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${item.name}`}
            onPress={() => onPress?.(item)}
            style={({ pressed }) => [
                styles.inventoryCard,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.itemIconContainer}>
                {item.emoji ? (
                    <Text style={styles.itemEmoji}>
                        {item.emoji}
                    </Text>
                ) : (
                    <Ionicons
                        name={categoryIcon}
                        size={iconSizes.lg}
                        color={colors.primaryDark}
                    />
                )}
            </View>

            <View style={styles.itemContent}>
                <Text
                    numberOfLines={1}
                    style={styles.itemName}
                >
                    {item.name}
                </Text>

                <Text style={styles.itemQuantity}>
                    {formatQuantity(
                        item.quantity,
                        item.unit,
                    )}
                </Text>
            </View>

            <View style={styles.itemRight}>
                <View
                    style={[
                        styles.expiryBadge,
                        isUrgent &&
                        styles.urgentExpiryBadge,
                    ]}
                >
                    <Ionicons
                        name={
                            isUrgent
                                ? "alert-circle"
                                : "time-outline"
                        }
                        size={iconSizes.xs}
                        color={
                            isUrgent
                                ? colors.textInverse
                                : colors.primaryDark
                        }
                    />

                    <Text
                        style={[
                            styles.expiryText,
                            isUrgent &&
                            styles.urgentExpiryText,
                        ]}
                    >
                        {expiryLabel}
                    </Text>
                </View>

                <Ionicons
                    name="chevron-forward"
                    size={iconSizes.sm}
                    color={colors.textMuted}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    inventoryCard: {
        minHeight: 84,
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.md,
        gap: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: radii.xl,
        ...shadows.small,
    },

    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },

    itemIconContainer: {
        width: 52,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.backgroundMuted,
        borderRadius: radii.lg,
    },

    itemEmoji: {
        fontSize: 28,
        lineHeight: 34,
    },

    itemContent: {
        flex: 1,
        minWidth: 0,
    },

    itemName: {
        color: colors.text,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.bold,
    },

    itemQuantity: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
    },

    itemRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    expiryBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
        backgroundColor: colors.accentLight,
        borderRadius: radii.full,
    },

    urgentExpiryBadge: {
        backgroundColor: colors.error,
    },

    expiryText: {
        color: colors.primaryDark,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },

    urgentExpiryText: {
        color: colors.textInverse,
    },
});