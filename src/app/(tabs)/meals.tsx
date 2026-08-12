import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    MealCard,
    type Meal,
} from "../../components/meal/meal-card";

import { Screen } from "@/components/ui/screen";
import { theme } from "@/styles/theme";
import { PageHeader } from "../../components/navigation/screen-header";

type MealFilter =
    | "For you"
    | "Quick"
    | "Use soon"
    | "High protein";

const FILTERS: MealFilter[] = [
    "For you",
    "Quick",
    "Use soon",
    "High protein",
];

const MEALS: Meal[] = [
    {
        id: "1",
        name: "Creamy Chicken Pasta",
        description:
            "A comforting pasta meal using chicken, milk, and pantry staples.",
        time: 25,
        servings: 2,
        matchPercentage: 92,
        missingIngredients: 1,
        category: "High protein",
        icon: "restaurant-outline",
        ingredients: [
            "Chicken",
            "Milk",
            "Pasta",
            "Garlic",
        ],
        usesExpiringFood: true,
    },
    {
        id: "2",
        name: "Avocado Egg Toast",
        description:
            "A quick breakfast that uses your ripe avocado and fresh eggs.",
        time: 10,
        servings: 1,
        matchPercentage: 100,
        missingIngredients: 0,
        category: "Quick",
        icon: "cafe-outline",
        ingredients: [
            "Avocado",
            "Eggs",
            "Bread",
        ],
        usesExpiringFood: true,
    },
    {
        id: "3",
        name: "Fresh Tomato Pasta",
        description:
            "A bright and simple tomato pasta with herbs and garlic.",
        time: 20,
        servings: 2,
        matchPercentage: 88,
        missingIngredients: 1,
        category: "Use soon",
        icon: "nutrition-outline",
        ingredients: [
            "Tomatoes",
            "Pasta",
            "Garlic",
            "Herbs",
        ],
        usesExpiringFood: true,
    },
    {
        id: "4",
        name: "Chicken and Egg Bowl",
        description:
            "A filling protein bowl with seasoned chicken and soft eggs.",
        time: 30,
        servings: 2,
        matchPercentage: 84,
        missingIngredients: 2,
        category: "High protein",
        icon: "fast-food-outline",
        ingredients: [
            "Chicken",
            "Eggs",
            "Rice",
            "Vegetables",
        ],
    },
    {
        id: "5",
        name: "Pantry Pasta Bowl",
        description:
            "A simple meal made from pasta and ingredients already at home.",
        time: 15,
        servings: 2,
        matchPercentage: 78,
        missingIngredients: 2,
        category: "Quick",
        icon: "pizza-outline",
        ingredients: [
            "Pasta",
            "Olive oil",
            "Garlic",
            "Cheese",
        ],
    },
];

export default function MealsScreen() {
    const [selectedFilter, setSelectedFilter] =
        useState<MealFilter>("For you");

    const [savedMealIds, setSavedMealIds] = useState<
        string[]
    >([]);

    const filteredMeals = useMemo(() => {
        if (selectedFilter === "For you") {
            return [...MEALS].sort(
                (a, b) =>
                    b.matchPercentage -
                    a.matchPercentage,
            );
        }

        if (selectedFilter === "Use soon") {
            return MEALS.filter(
                (meal) => meal.usesExpiringFood,
            );
        }

        return MEALS.filter(
            (meal) => meal.category === selectedFilter,
        );
    }, [selectedFilter]);

    const toggleSavedMeal = (mealId: string) => {
        setSavedMealIds((currentIds) => {
            if (currentIds.includes(mealId)) {
                return currentIds.filter(
                    (id) => id !== mealId,
                );
            }

            return [...currentIds, mealId];
        });
    };

    const renderMeal = ({
        item,
    }: {
        item: Meal;
    }) => (
        <MealCard
            meal={item}
            isSaved={savedMealIds.includes(item.id)}
            onSave={toggleSavedMeal}
            onPress={(selectedMeal) => {

            }}
        />
    );

    return (
        <Screen
            padded={false}
            avoidKeyboard={false}
            backgroundColor={theme.colors.background}
        >
            <FlatList
                data={filteredMeals}
                keyExtractor={(item) => item.id}
                renderItem={renderMeal}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.contentContainer
                }
                ItemSeparatorComponent={() => (
                    <View style={styles.itemSeparator} />
                )}
                ListHeaderComponent={
                    <>
                        <PageHeader
                            eyebrow="COOK WITH WHAT YOU HAVE"
                            title="Meal ideas"
                            description="Recipes matched to the food currently in your kitchen."
                            icon="bookmark-outline"
                            accessibilityLabel="Open saved meals"
                            badgeCount={savedMealIds.length}
                            onPress={() => {
                            }}
                        />

                        <View style={styles.heroCard}>
                            <View style={styles.heroContent}>
                                <View
                                    style={
                                        styles.heroLabelRow
                                    }
                                >
                                    <Ionicons
                                        name="leaf"
                                        size={
                                            theme.iconSizes.sm
                                        }
                                        color={
                                            theme.colors
                                                .accent
                                        }
                                    />

                                    <Text
                                        style={
                                            styles.heroLabel
                                        }
                                    >
                                        USE IT BEFORE IT EXPIRES
                                    </Text>
                                </View>

                                <Text style={styles.heroTitle}>
                                    Make something delicious today
                                </Text>

                                <Text
                                    style={
                                        styles.heroDescription
                                    }
                                >
                                    You have 3 ingredients that
                                    should be used soon.
                                </Text>

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.heroButton,
                                        pressed &&
                                        styles.pressed,
                                    ]}
                                >
                                    <Text
                                        style={
                                            styles.heroButtonText
                                        }
                                    >
                                        Show meals
                                    </Text>

                                    <Ionicons
                                        name="arrow-forward"
                                        size={
                                            theme.iconSizes.sm
                                        }
                                        color={
                                            theme.colors
                                                .primaryDark
                                        }
                                    />
                                </Pressable>
                            </View>

                            <View style={styles.heroIcon}>
                                <Ionicons
                                    name="restaurant"
                                    size={
                                        theme.iconSizes["2xl"]
                                    }
                                    color={
                                        theme.colors
                                            .primaryDark
                                    }
                                />
                            </View>
                        </View>

                        <FlatList
                            horizontal
                            data={FILTERS}
                            keyExtractor={(item) => item}
                            showsHorizontalScrollIndicator={
                                false
                            }
                            contentContainerStyle={
                                styles.filterList
                            }
                            renderItem={({ item }) => {
                                const isSelected =
                                    selectedFilter === item;

                                return (
                                    <Pressable
                                        accessibilityRole="button"
                                        accessibilityState={{
                                            selected:
                                                isSelected,
                                        }}
                                        onPress={() =>
                                            setSelectedFilter(
                                                item,
                                            )
                                        }
                                        style={({
                                            pressed,
                                        }) => [
                                                styles.filterChip,
                                                isSelected &&
                                                styles.selectedFilterChip,
                                                pressed &&
                                                styles.pressed,
                                            ]}
                                    >
                                        {isSelected && (
                                            <Ionicons
                                                name="checkmark-circle"
                                                size={
                                                    theme
                                                        .iconSizes
                                                        .sm
                                                }
                                                color={
                                                    theme
                                                        .colors
                                                        .accent
                                                }
                                            />
                                        )}

                                        <Text
                                            style={[
                                                styles.filterText,
                                                isSelected &&
                                                styles.selectedFilterText,
                                            ]}
                                        >
                                            {item}
                                        </Text>
                                    </Pressable>
                                );
                            }}
                        />

                        <View style={styles.sectionHeader}>
                            <View>
                                <Text
                                    style={styles.sectionTitle}
                                >
                                    Recommended for you
                                </Text>

                                <Text
                                    style={
                                        styles.sectionSubtitle
                                    }
                                >
                                    {filteredMeals.length} meal
                                    ideas available
                                </Text>
                            </View>

                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel="Filter meals"
                                style={({ pressed }) => [
                                    styles.filterButton,
                                    pressed &&
                                    styles.pressed,
                                ]}
                            >
                                <Ionicons
                                    name="options-outline"
                                    size={theme.iconSizes.md}
                                    color={
                                        theme.colors
                                            .primaryDark
                                    }
                                />
                            </Pressable>
                        </View>
                    </>
                }
                ListEmptyComponent={
                    <View style={styles.emptyCard}>
                        <View style={styles.emptyIcon}>
                            <Ionicons
                                name="restaurant-outline"
                                size={theme.iconSizes["2xl"]}
                                color={theme.colors.primary}
                            />
                        </View>

                        <Text style={styles.emptyTitle}>
                            No meals found
                        </Text>

                        <Text
                            style={styles.emptyDescription}
                        >
                            Try selecting another filter or add
                            more food to your inventory.
                        </Text>
                    </View>
                }
                ListFooterComponent={
                    <View style={styles.bottomSpacing} />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
    },

    heroCard: {
        minHeight: 190,
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.md,
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radii["2xl"],
        borderWidth: 1,
        borderColor: theme.colors.primaryDark,
        ...theme.shadows.large,
    },

    heroContent: {
        flex: 1,
        minWidth: 0,
    },

    heroLabelRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.xs,
        marginBottom: theme.spacing.sm,
    },

    heroLabel: {
        flexShrink: 1,
        color: theme.colors.accentLight,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        fontWeight: theme.fontWeights.bold,
        letterSpacing: 0.8,
    },

    heroTitle: {
        color: theme.colors.textInverse,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.extraBold,
    },

    heroDescription: {
        color: theme.colors.backgroundMuted,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
        marginTop: theme.spacing.sm,
    },

    heroButton: {
        alignSelf: "flex-start",
        minHeight:
            theme.componentSizes.compactButtonHeight,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        backgroundColor: theme.colors.accent,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.accentLight,
        ...theme.shadows.small,
    },

    heroButtonText: {
        color: theme.colors.primaryDark,
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.bold,
    },

    heroIcon: {
        width: 76,
        height: 76,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.accent,
        borderRadius: theme.radii.xl,
        borderWidth: 4,
        borderColor: theme.colors.primaryLight,
        transform: [{ rotate: "5deg" }],
        ...theme.shadows.small,
    },

    filterList: {
        gap: theme.spacing.sm,
        paddingVertical: theme.spacing.lg,
    },

    filterChip: {
        minHeight:
            theme.componentSizes.compactButtonHeight,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.xs,
        paddingHorizontal: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },

    selectedFilterChip: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primaryDark,
        ...theme.shadows.medium,
    },

    filterText: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
        fontWeight: theme.fontWeights.semibold,
    },

    selectedFilterText: {
        color: theme.colors.textInverse,
        fontWeight: theme.fontWeights.bold,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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

    filterButton: {
        width: 46,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.small,
    },

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
        backgroundColor: theme.colors.backgroundMuted,
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
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
        marginTop: theme.spacing.xs,
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
        backgroundColor: theme.colors.borderStrong,
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
        backgroundColor: theme.colors.primaryLight,
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
        backgroundColor: theme.colors.primaryDark,
        borderRadius: theme.radii.full,
        ...theme.shadows.small,
    },

    openButtonText: {
        color: theme.colors.textInverse,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.bold,
    },

    itemSeparator: {
        height: theme.spacing.lg,
    },

    emptyCard: {
        alignItems: "center",
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing["3xl"],
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii["2xl"],
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.medium,
    },

    emptyIcon: {
        width: 82,
        height: 82,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.accentLight,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.accent,
        marginBottom: theme.spacing.lg,
    },

    emptyTitle: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.extraBold,
    },

    emptyDescription: {
        maxWidth: 270,
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
        textAlign: "center",
        marginTop: theme.spacing.sm,
    },

    bottomSpacing: {
        height:
            theme.componentSizes.tabBarHeight +
            theme.spacing["4xl"],
    },

    pressed: {
        opacity: theme.opacity.pressed,
        transform: [{ scale: 0.98 }],
    },
});