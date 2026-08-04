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

type GroceryItem = {
    id: string;
    name: string;
    icon?: keyof typeof Ionicons.glyphMap;
};

type SmartGroceryCardProps = {
    items: GroceryItem[];
    estimatedPrice: number;
    storeName: string;
    onPress?: () => void;
};

type GroceryItemRowProps = {
    item: GroceryItem;
};

function GroceryItemRow({
    item,
}: GroceryItemRowProps) {
    return (
        <View style={styles.itemRow}>
            <View style={styles.itemIcon}>
                <Ionicons
                    name={
                        item.icon ??
                        "nutrition-outline"
                    }
                    size={iconSizes.sm}
                    color={colors.primaryDark}
                />
            </View>

            <Text style={styles.itemName}>
                {item.name}
            </Text>

            <View style={styles.missingBadge}>
                <Text style={styles.missingBadgeText}>
                    Missing
                </Text>
            </View>
        </View>
    );
}

export default function SmartGroceryCard({
    items,
    estimatedPrice,
    storeName,
    onPress,
}: SmartGroceryCardProps) {
    const content = (
        <>
            <View style={styles.header}>
                <View style={styles.headerIcon}>
                    <Ionicons
                        name="cart-outline"
                        size={iconSizes.sm}
                        color={colors.primaryDark}
                    />
                </View>

                <View style={styles.headerContent}>
                    <Text style={styles.eyebrow}>
                        SMART GROCERY
                    </Text>

                    <Text style={styles.title}>
                        Only missing
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

            <View style={styles.itemsContainer}>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <View key={item.id}>
                            <GroceryItemRow
                                item={item}
                            />

                            {index <
                                items.length - 1 ? (
                                <View
                                    style={
                                        styles.divider
                                    }
                                />
                            ) : null}
                        </View>
                    ))
                ) : (
                    <View style={styles.completeState}>
                        <View
                            style={
                                styles.completeIcon
                            }
                        >
                            <Ionicons
                                name="checkmark"
                                size={iconSizes.md}
                                color={
                                    colors.textInverse
                                }
                            />
                        </View>

                        <View
                            style={
                                styles.completeContent
                            }
                        >
                            <Text
                                style={
                                    styles.completeTitle
                                }
                            >
                                You have everything
                            </Text>

                            <Text
                                style={
                                    styles.completeDescription
                                }
                            >
                                No extra groceries
                                needed.
                            </Text>
                        </View>
                    </View>
                )}
            </View>

            {items.length > 0 ? (
                <View style={styles.estimateCard}>
                    <View style={styles.estimateIcon}>
                        <Ionicons
                            name="pricetag-outline"
                            size={iconSizes.sm}
                            color={colors.accent}
                        />
                    </View>

                    <View style={styles.estimateContent}>
                        <Text
                            style={
                                styles.estimateLabel
                            }
                        >
                            Estimated
                        </Text>

                        <Text
                            style={
                                styles.estimateStore
                            }
                        >
                            at {storeName}
                        </Text>
                    </View>

                    <Text style={styles.estimatePrice}>
                        ${estimatedPrice.toFixed(2)}
                    </Text>
                </View>
            ) : null}
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
            accessibilityLabel={`View ${items.length} missing grocery items`}
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
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.xl,
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
        gap: spacing.md,
        marginBottom: spacing.xl,
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

    headerContent: {
        flex: 1,
        minWidth: 0,
    },

    eyebrow: {
        color: colors.primary,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
        letterSpacing: 1.2,
    },

    title: {
        marginTop: spacing.xs,
        color: colors.text,
        fontSize: fontSizes.xl,
        lineHeight: lineHeights.xl,
        fontWeight: fontWeights.extraBold,
    },

    arrowButton: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.backgroundMuted,
    },

    itemsContainer: {
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        backgroundColor: colors.surfaceSoft,
    },

    itemRow: {
        minHeight: 68,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },

    itemIcon: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
    },

    itemName: {
        flex: 1,
        color: colors.text,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.bold,
    },

    missingBadge: {
        minHeight: 30,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        borderRadius: radii.full,
        backgroundColor: colors.primaryDark,
    },

    missingBadgeText: {
        color: colors.textInverse,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },

    divider: {
        height: 1,
        marginLeft:
            spacing.lg +
            42 +
            spacing.md,
        backgroundColor: colors.border,
    },

    estimateCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        marginTop: spacing.lg,
        padding: spacing.lg,
        borderRadius: radii.lg,
        backgroundColor: colors.primaryDark,
    },

    estimateIcon: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.primary,
    },

    estimateContent: {
        flex: 1,
        minWidth: 0,
    },

    estimateLabel: {
        color: colors.textInverse,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.bold,
    },

    estimateStore: {
        marginTop: spacing.xs,
        color: colors.primaryLight,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.medium,
    },

    estimatePrice: {
        color: colors.accent,
        fontSize: fontSizes.xl,
        lineHeight: lineHeights.xl,
        fontWeight: fontWeights.extraBold,
    },

    completeState: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.lg,
    },

    completeIcon: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.success,
    },

    completeContent: {
        flex: 1,
    },

    completeTitle: {
        color: colors.text,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.bold,
    },

    completeDescription: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
    },
});