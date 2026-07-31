import { Ionicons } from "@expo/vector-icons";
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

export type InventoryItem = {
    id: string;
    name: string;
    quantity: string;
    category: string;
    expiresIn: number;
    icon: keyof typeof Ionicons.glyphMap;
};

type InventoryItemCardProps = {
    item: InventoryItem;
    onPress?: (item: InventoryItem) => void;
};

export function InventoryItemCard({
    item,
    onPress,
}: InventoryItemCardProps) {
    const isUrgent = item.expiresIn <= 2;

    const expiryLabel =
        item.expiresIn === 1
            ? "1 day"
            : `${item.expiresIn} days`;

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
                <Ionicons
                    name={item.icon}
                    size={iconSizes.lg}
                    color={colors.primaryDark}
                />
            </View>

            <View style={styles.itemContent}>
                <Text style={styles.itemName}>
                    {item.name}
                </Text>

                <Text style={styles.itemQuantity}>
                    {item.quantity}
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