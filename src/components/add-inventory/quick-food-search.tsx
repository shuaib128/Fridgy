import { Ionicons } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Animated, {
    FadeInDown,
} from "react-native-reanimated";
import {
    forwardRef,
    useMemo,
    useState,
} from "react";

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

type IoniconName =
    React.ComponentProps<typeof Ionicons>["name"];

export type FoodSearchItem = {
    id: string;
    name: string;
    category: string;
    icon: IoniconName;
};

type QuickFoodSearchProps = {
    foods: FoodSearchItem[];
    recentSearches?: string[];
    onFoodPress: (food: FoodSearchItem) => void;
    onManualAdd: (foodName: string) => void;
};

export const QuickFoodSearch = forwardRef<
    TextInput,
    QuickFoodSearchProps
>(function QuickFoodSearch(
    {
        foods,
        recentSearches = [],
        onFoodPress,
        onManualAdd,
    },
    ref,
) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFoods = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return foods.slice(0, 5);
        }

        return foods.filter((food) =>
            `${food.name} ${food.category}`
                .toLowerCase()
                .includes(query),
        );
    }, [foods, searchQuery]);

    return (
        <Animated.View
            entering={FadeInDown.delay(430).duration(420)}
            style={styles.searchSection}
        >
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    Quick search
                </Text>

                <Text style={styles.sectionHint}>
                    Type any food
                </Text>
            </View>

            <View style={styles.searchBar}>
                <Ionicons
                    name="search-outline"
                    size={iconSizes.md}
                    color={colors.textMuted}
                />

                <TextInput
                    ref={ref}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search chicken, milk, eggs..."
                    placeholderTextColor={colors.textMuted}
                    cursorColor={colors.primary}
                    returnKeyType="search"
                    style={styles.searchInput}
                />

                {searchQuery.length > 0 ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Clear search"
                        hitSlop={spacing.md}
                        onPress={() => setSearchQuery("")}
                        style={({ pressed }) => [
                            styles.clearButton,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Ionicons
                            name="close"
                            size={iconSizes.sm}
                            color={colors.textSecondary}
                        />
                    </Pressable>
                ) : (
                    <View style={styles.aiBadge}>
                        <Ionicons
                            name="sparkles"
                            size={iconSizes.xs}
                            color={colors.primaryDark}
                        />

                        <Text style={styles.aiBadgeText}>
                            Smart
                        </Text>
                    </View>
                )}
            </View>

            {!searchQuery && recentSearches.length > 0 && (
                <View style={styles.recentBlock}>
                    <Text style={styles.label}>
                        Recent
                    </Text>

                    <View style={styles.chipRow}>
                        {recentSearches.map((item) => (
                            <Pressable
                                key={item}
                                onPress={() =>
                                    setSearchQuery(item)
                                }
                                style={({ pressed }) => [
                                    styles.searchChip,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <Ionicons
                                    name="time-outline"
                                    size={iconSizes.xs}
                                    color={colors.primary}
                                />

                                <Text
                                    style={
                                        styles.searchChipText
                                    }
                                >
                                    {item}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            )}

            <View style={styles.resultsCard}>
                <View style={styles.resultsHeader}>
                    <Text style={styles.label}>
                        {searchQuery
                            ? "Results"
                            : "Suggested foods"}
                    </Text>

                    <Text style={styles.resultCount}>
                        {filteredFoods.length} found
                    </Text>
                </View>

                {filteredFoods.length > 0 ? (
                    filteredFoods.map((food, index) => (
                        <FoodResultRow
                            key={food.id}
                            food={food}
                            isLast={
                                index ===
                                filteredFoods.length - 1
                            }
                            onPress={() =>
                                onFoodPress(food)
                            }
                        />
                    ))
                ) : (
                    <View style={styles.noResults}>
                        <View style={styles.noResultsIcon}>
                            <Ionicons
                                name="search-outline"
                                size={iconSizes.lg}
                                color={colors.primary}
                            />
                        </View>

                        <Text style={styles.noResultsTitle}>
                            No food found
                        </Text>

                        <Text
                            style={
                                styles.noResultsDescription
                            }
                        >
                            Try another name or add it
                            manually.
                        </Text>

                        <Pressable
                            onPress={() =>
                                onManualAdd(searchQuery)
                            }
                            style={({ pressed }) => [
                                styles.manualButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Ionicons
                                name="add"
                                size={iconSizes.sm}
                                color={colors.primaryDark}
                            />

                            <Text
                                style={
                                    styles.manualButtonText
                                }
                            >
                                Add “{searchQuery}”
                            </Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </Animated.View>
    );
});

type FoodResultRowProps = {
    food: FoodSearchItem;
    isLast: boolean;
    onPress: () => void;
};

function FoodResultRow({
    food,
    isLast,
    onPress,
}: FoodResultRowProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.foodRow,
                !isLast && styles.foodRowBorder,
                pressed && styles.foodRowPressed,
            ]}
        >
            <View style={styles.foodIcon}>
                <Ionicons
                    name={food.icon}
                    size={iconSizes.md}
                    color={colors.primaryDark}
                />
            </View>

            <View style={styles.foodCopy}>
                <Text style={styles.foodName}>
                    {food.name}
                </Text>

                <Text style={styles.foodCategory}>
                    {food.category}
                </Text>
            </View>

            <View style={styles.addFoodIcon}>
                <Ionicons
                    name="add"
                    size={iconSizes.sm}
                    color={colors.primaryDark}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    searchSection: {
        marginBottom: spacing["2xl"],
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
        marginBottom: spacing.md,
    },

    sectionTitle: {
        color: colors.text,
        fontSize: fontSizes.xl,
        lineHeight: lineHeights.xl,
        fontWeight: fontWeights.extraBold,
    },

    sectionHint: {
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },

    searchBar: {
        minHeight: 60,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.borderStrong,
        backgroundColor: colors.surface,
        ...shadows.small,
    },

    searchInput: {
        flex: 1,
        minWidth: 0,
        paddingVertical: spacing.md,
        color: colors.text,
        fontSize: fontSizes.md,
        fontWeight: fontWeights.semibold,
    },

    clearButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.surfaceSoft,
    },

    aiBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        minHeight: 30,
        paddingHorizontal: spacing.sm,
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
    },

    aiBadgeText: {
        color: colors.primaryDark,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },

    recentBlock: {
        marginTop: spacing.lg,
    },

    label: {
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.bold,
    },

    chipRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
        marginTop: spacing.sm,
    },

    searchChip: {
        minHeight: 38,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },

    searchChipText: {
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.semibold,
    },

    resultsCard: {
        overflow: "hidden",
        marginTop: spacing.lg,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        ...shadows.small,
    },

    resultsHeader: {
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.surfaceSoft,
    },

    resultCount: {
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },

    foodRow: {
        minHeight: 76,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.surface,
    },

    foodRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    foodRowPressed: {
        backgroundColor: colors.surfaceSoft,
    },

    foodIcon: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.md,
        backgroundColor: colors.backgroundMuted,
    },

    foodCopy: {
        flex: 1,
        minWidth: 0,
    },

    foodName: {
        color: colors.text,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.bold,
    },

    foodCategory: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.medium,
    },

    addFoodIcon: {
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.accentDark,
        backgroundColor: colors.accent,
    },

    noResults: {
        alignItems: "center",
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing["3xl"],
    },

    noResultsIcon: {
        width: 58,
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.backgroundMuted,
    },

    noResultsTitle: {
        marginTop: spacing.md,
        color: colors.text,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.lg,
        fontWeight: fontWeights.extraBold,
    },

    noResultsDescription: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
        textAlign: "center",
    },

    manualButton: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        marginTop: spacing.lg,
        paddingHorizontal: spacing.lg,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.accentDark,
        backgroundColor: colors.accent,
    },

    manualButtonText: {
        color: colors.primaryDark,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.bold,
    },

    pressed: {
        opacity: 0.78,
    },
});
