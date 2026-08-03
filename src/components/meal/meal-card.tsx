import { Ionicons } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { theme } from "@/styles/theme";

export type Meal = {
    id: string;
    name: string;
    description: string;
    time: number;
    servings: number;
    matchPercentage: number;
    missingIngredients: number;
    category:
    | "Quick"
    | "Use soon"
    | "High protein";
    icon: keyof typeof Ionicons.glyphMap;
    ingredients: string[];
    usesExpiringFood?: boolean;
};

type MealCardProps = {
    meal: Meal;
    isSaved: boolean;
    onSave: (mealId: string) => void;
    onPress?: (meal: Meal) => void;
};

export function MealCard({
    meal,
    isSaved,
    onSave,
    onPress,
}: MealCardProps) {
    const hasEverything =
        meal.missingIngredients === 0;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${meal.name}`}
            onPress={() => onPress?.(meal)}
            style={({ pressed }) => [
                styles.mealCard,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.mealTopRow}>
                <View style={styles.mealIcon}>
                    <Ionicons
                        name={meal.icon}
                        size={theme.iconSizes.xl}
                        color={theme.colors.primaryDark}
                    />
                </View>

                <View style={styles.matchBadge}>
                    <Ionicons
                        name="sparkles"
                        size={theme.iconSizes.xs}
                        color={theme.colors.primaryDark}
                    />

                    <Text style={styles.matchText}>
                        {meal.matchPercentage}% match
                    </Text>
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                        isSaved
                            ? `Remove ${meal.name} from saved meals`
                            : `Save ${meal.name}`
                    }
                    onPress={(event) => {
                        event.stopPropagation();
                        onSave(meal.id);
                    }}
                    hitSlop={10}
                    style={({ pressed }) => [
                        styles.saveButton,
                        isSaved &&
                        styles.savedButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Ionicons
                        name={
                            isSaved
                                ? "bookmark"
                                : "bookmark-outline"
                        }
                        size={theme.iconSizes.md}
                        color={
                            isSaved
                                ? theme.colors.textInverse
                                : theme.colors.primaryDark
                        }
                    />
                </Pressable>
            </View>

            <Text style={styles.mealName}>
                {meal.name}
            </Text>

            <Text style={styles.mealDescription}>
                {meal.description}
            </Text>

            <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                    <Ionicons
                        name="time-outline"
                        size={theme.iconSizes.sm}
                        color={theme.colors.textMuted}
                    />

                    <Text style={styles.metaText}>
                        {meal.time} min
                    </Text>
                </View>

                <View style={styles.metaDot} />

                <View style={styles.metaItem}>
                    <Ionicons
                        name="people-outline"
                        size={theme.iconSizes.sm}
                        color={theme.colors.textMuted}
                    />

                    <Text style={styles.metaText}>
                        {meal.servings}{" "}
                        {meal.servings === 1
                            ? "serving"
                            : "servings"}
                    </Text>
                </View>
            </View>

            <View style={styles.ingredientRow}>
                {meal.ingredients
                    .slice(0, 3)
                    .map((ingredient) => (
                        <View
                            key={ingredient}
                            style={
                                styles.ingredientChip
                            }
                        >
                            <Text
                                numberOfLines={1}
                                style={
                                    styles.ingredientText
                                }
                            >
                                {ingredient}
                            </Text>
                        </View>
                    ))}

                {meal.ingredients.length > 3 && (
                    <View
                        style={
                            styles.extraIngredientChip
                        }
                    >
                        <Text
                            style={
                                styles.extraIngredientText
                            }
                        >
                            +
                            {meal.ingredients.length - 3}
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.cardFooter}>
                <View
                    style={[
                        styles.availabilityBadge,
                        hasEverything
                            ? styles.readyBadge
                            : styles.missingBadge,
                    ]}
                >
                    <Ionicons
                        name={
                            hasEverything
                                ? "checkmark-circle"
                                : "basket-outline"
                        }
                        size={theme.iconSizes.sm}
                        color={
                            hasEverything
                                ? theme.colors.textInverse
                                : theme.colors.primaryDark
                        }
                    />

                    <Text
                        style={[
                            styles.availabilityText,
                            hasEverything &&
                            styles.readyText,
                        ]}
                    >
                        {hasEverything
                            ? "You have everything"
                            : `Missing ${meal.missingIngredients}`}
                    </Text>
                </View>

                <View style={styles.openButton}>
                    <Text style={styles.openButtonText}>
                        View meal
                    </Text>

                    <Ionicons
                        name="arrow-forward"
                        size={theme.iconSizes.sm}
                        color={theme.colors.textInverse}
                    />
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    mealCard: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii["2xl"],
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.medium,
    },

    mealTopRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.md,
    },

    mealIcon: {
        width: 62,
        height: 62,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.accentLight,
        borderRadius: theme.radii.xl,
        borderWidth: 1,
        borderColor: theme.colors.accent,
    },

    matchBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        backgroundColor: theme.colors.accentLight,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.accent,
    },

    matchText: {
        color: theme.colors.primaryDark,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        fontWeight: theme.fontWeights.bold,
    },

    saveButton: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        backgroundColor:
            theme.colors.backgroundMuted,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    savedButton: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primaryDark,
        ...theme.shadows.small,
    },

    mealName: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.extraBold,
    },

    mealDescription: {
        marginTop: theme.spacing.xs,
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
    },

    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.sm,
        marginTop: theme.spacing.md,
    },

    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.xs,
    },

    metaDot: {
        width: 4,
        height: 4,
        backgroundColor:
            theme.colors.borderStrong,
        borderRadius: theme.radii.full,
    },

    metaText: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        fontWeight: theme.fontWeights.medium,
    },

    ingredientRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
        marginTop: theme.spacing.lg,
    },

    ingredientChip: {
        maxWidth: 100,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        backgroundColor: theme.colors.surfaceSoft,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },

    ingredientText: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        fontWeight: theme.fontWeights.semibold,
    },

    extraIngredientChip: {
        minWidth: 34,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        backgroundColor:
            theme.colors.primaryLight,
        borderRadius: theme.radii.full,
    },

    extraIngredientText: {
        color: theme.colors.textInverse,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.bold,
    },

    cardFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing.sm,
        paddingTop: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },

    availabilityBadge: {
        flex: 1,
        minHeight: 40,
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.radii.full,
        borderWidth: 1,
    },

    readyBadge: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primaryDark,
    },

    missingBadge: {
        backgroundColor: theme.colors.accentLight,
        borderColor: theme.colors.accent,
    },

    availabilityText: {
        flexShrink: 1,
        color: theme.colors.primaryDark,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.bold,
    },

    readyText: {
        color: theme.colors.textInverse,
    },

    openButton: {
        minHeight: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.xs,
        paddingHorizontal: theme.spacing.md,
        backgroundColor:
            theme.colors.primaryDark,
        borderRadius: theme.radii.full,
        ...theme.shadows.small,
    },

    openButtonText: {
        color: theme.colors.textInverse,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.bold,
    },

    pressed: {
        opacity: theme.opacity.pressed,
        transform: [{ scale: 0.98 }],
    },
});