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

type AttentionItem = {
    id: string;
    emoji: string;
    name: string;
    message: string;
};

type AttentionCardProps = {
    items: AttentionItem[];
    onViewAll?: () => void;
    onItemPress?: (item: AttentionItem) => void;
};

export function AttentionCard({
    items,
    onViewAll,
    onItemPress,
}: AttentionCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.iconBadge}>
                        <Ionicons
                            name="warning-outline"
                            size={iconSizes.md}
                            color={colors.textInverse}
                        />
                    </View>

                    <View style={styles.headerText}>
                        <Text style={styles.eyebrow}>
                            ATTENTION NEEDED
                        </Text>

                        <Text style={styles.title}>
                            Don&apos;t let food go to waste.
                        </Text>
                    </View>
                </View>

                <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />

                    <Text style={styles.statusText}>
                        Needs attention
                    </Text>
                </View>
            </View>

            <View style={styles.items}>
                {items.map((item, index) => {
                    const isLastItem =
                        index === items.length - 1;

                    return (
                        <Pressable
                            key={item.id}
                            accessibilityRole="button"
                            accessibilityLabel={`${item.name}. ${item.message}`}
                            onPress={() =>
                                onItemPress?.(item)
                            }
                            style={({ pressed }) => [
                                styles.item,
                                !isLastItem &&
                                styles.itemBorder,
                                pressed &&
                                styles.itemPressed,
                            ]}
                        >
                            <View style={styles.itemIcon}>
                                <Text style={styles.emoji}>
                                    {item.emoji}
                                </Text>
                            </View>

                            <View style={styles.itemContent}>
                                <Text
                                    style={styles.itemName}
                                    numberOfLines={1}
                                >
                                    {item.name}
                                </Text>

                                <Text
                                    style={styles.itemMessage}
                                    numberOfLines={1}
                                >
                                    {item.message}
                                </Text>
                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={iconSizes.sm}
                                color={colors.textMuted}
                            />
                        </Pressable>
                    );
                })}
            </View>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="View all items needing attention"
                onPress={onViewAll}
                style={({ pressed }) => [
                    styles.viewAllButton,
                    pressed &&
                    styles.viewAllButtonPressed,
                ]}
            >
                <Text style={styles.viewAllText}>
                    View all
                </Text>

                <View style={styles.viewAllIcon}>
                    <Ionicons
                        name="arrow-forward"
                        size={iconSizes.sm}
                        color={colors.primaryDark}
                    />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: spacing.lg,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        ...shadows.medium,
    },

    header: {
        gap: spacing.md,
        marginBottom: spacing.lg,
    },

    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },

    iconBadge: {
        width: 52,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.lg,
        borderWidth: 3,
        borderColor: colors.accentLight,
        backgroundColor: colors.error,
        transform: [
            {
                rotate: "-4deg",
            },
        ],
        ...shadows.small,
    },

    headerText: {
        flex: 1,
        minWidth: 0,
    },

    eyebrow: {
        marginBottom: spacing.xs,
        color: colors.error,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
        letterSpacing: 1.2,
    },

    title: {
        color: colors.text,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.lg,
        fontWeight: fontWeights.extraBold,
    },

    statusBadge: {
        alignSelf: "flex-start",
        minHeight: 36,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        backgroundColor: colors.primaryDark,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: radii.full,
        backgroundColor: colors.accent,
    },

    statusText: {
        color: colors.textInverse,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },

    items: {
        overflow: "hidden",
        borderRadius: radii.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surfaceSoft,
    },

    item: {
        minHeight: 72,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },

    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    itemPressed: {
        opacity: 0.75,
        transform: [
            {
                scale: 0.99,
            },
        ],
    },

    itemIcon: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.md,
        backgroundColor: colors.backgroundMuted,
    },

    emoji: {
        fontSize: fontSizes.xl,
        lineHeight: lineHeights.xl,
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

    itemMessage: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
    },

    viewAllButton: {
        minHeight: 48,
        marginTop: spacing.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: spacing.lg,
        paddingRight: spacing.sm,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.accentLight,
        backgroundColor: colors.accent,
        ...shadows.small,
    },

    viewAllButtonPressed: {
        opacity: 0.8,
        transform: [
            {
                scale: 0.98,
            },
        ],
    },

    viewAllText: {
        color: colors.primaryDark,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.bold,
    },

    viewAllIcon: {
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
    },
});