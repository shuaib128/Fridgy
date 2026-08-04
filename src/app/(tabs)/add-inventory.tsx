import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import {
    Keyboard,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Animated, {
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useRef, useState } from "react";

import { PageHeader } from "@/components/navigation/screen-header";

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
import { QuickFoodSearch } from "@/components/add-inventory/quick-food-search";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type AddMethod = {
    id: "barcode" | "photo" | "search" | "receipt" | "manual";
    icon: IoniconName;
    title: string;
    description: string;
    badge?: string;
};

type FoodSuggestion = {
    id: string;
    name: string;
    category: string;
    icon: IoniconName;
};

const ADD_METHODS: AddMethod[] = [
    {
        id: "barcode",
        icon: "barcode-outline",
        title: "Scan Barcode",
        description: "Perfect for packaged foods.",
        badge: "Fastest",
    },
    {
        id: "photo",
        icon: "camera-outline",
        title: "Take Photo",
        description: "Let AI identify multiple groceries.",
        badge: "AI powered",
    },
    {
        id: "search",
        icon: "search-outline",
        title: "Search Food",
        description: "Quickly find and add any food item.",
    },
    {
        id: "receipt",
        icon: "receipt-outline",
        title: "Scan Receipt",
        description: "Import everything from a grocery receipt.",
    },
    {
        id: "manual",
        icon: "create-outline",
        title: "Add Manually",
        description: "Create a custom food item.",
    },
];

const FOOD_SUGGESTIONS: FoodSuggestion[] = [
    {
        id: "chicken-breast",
        name: "Chicken Breast",
        category: "Meat",
        icon: "restaurant-outline",
    },
    {
        id: "ground-beef",
        name: "Ground Beef",
        category: "Meat",
        icon: "restaurant-outline",
    },
    {
        id: "whole-milk",
        name: "Whole Milk",
        category: "Dairy",
        icon: "water-outline",
    },
    {
        id: "eggs",
        name: "Eggs",
        category: "Dairy",
        icon: "egg-outline",
    },
    {
        id: "spinach",
        name: "Spinach",
        category: "Produce",
        icon: "leaf-outline",
    },
    {
        id: "butter",
        name: "Butter",
        category: "Dairy",
        icon: "cube-outline",
    },
    {
        id: "apples",
        name: "Apples",
        category: "Produce",
        icon: "nutrition-outline",
    },
];

const RECENT_SEARCHES = ["Chicken", "Milk", "Avocado"];

export default function AddInventoryScreen() {
    const router = useRouter();
    const searchInputRef = useRef<TextInput>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFoods = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        if (!normalizedQuery) {
            return FOOD_SUGGESTIONS.slice(0, 5);
        }

        return FOOD_SUGGESTIONS.filter((item) =>
            `${item.name} ${item.category}`
                .toLowerCase()
                .includes(normalizedQuery),
        );
    }, [searchQuery]);

    const openRoute = (route: Href) => {
        Keyboard.dismiss();
        router.push(route);
    };

    const handleMethodPress = (method: AddMethod) => {
        switch (method.id) {
            case "barcode":
                openRoute("/add-inventory/barcode" as Href);
                break;
            case "photo":
                openRoute("/add-inventory/photo" as Href);
                break;
            case "search":
                searchInputRef.current?.focus();
                break;
            case "receipt":
                openRoute("/add-inventory/receipt" as Href);
                break;
            case "manual":
                openRoute("/add-inventory/manual" as Href);
                break;
        }
    };

    const handleFoodPress = (food: FoodSuggestion) => {
        openRoute({
            pathname: "/add-inventory",
            params: {
                name: food.name,
                category: food.category,
            },
        } as Href);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <PageHeader
                    eyebrow="STOCK YOUR KITCHEN"
                    title="Add Food"
                    description="How would you like to add something to your kitchen?"
                    icon="basket-outline"
                    accessibilityLabel="Open inventory"
                    onPress={() => router.push("/inventory")}
                />

                <Animated.View
                    entering={FadeInDown.delay(80).duration(420)}
                    style={styles.assistantCard}
                >
                    <View style={styles.assistantIcon}>
                        <Ionicons
                            name="sparkles"
                            size={iconSizes.md}
                            color={colors.primaryDark}
                        />
                    </View>

                    <View style={styles.assistantCopy}>
                        <Text style={styles.assistantTitle}>
                            Fridgy does the busy work
                        </Text>
                        <Text style={styles.assistantDescription}>
                            Scan or take a photo, then simply confirm what we
                            found.
                        </Text>
                    </View>
                </Animated.View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Choose a method</Text>
                    <Text style={styles.sectionHint}>Usually under 10 sec</Text>
                </View>

                <View style={styles.actionList}>
                    {ADD_METHODS.map((method, index) => (
                        <Animated.View
                            key={method.id}
                            entering={FadeInDown.delay(120 + index * 55).springify()}
                        >
                            <ActionCard
                                method={method}
                                emphasized={index < 2}
                                onPress={() => handleMethodPress(method)}
                            />
                        </Animated.View>
                    ))}
                </View>

                <QuickFoodSearch
                    ref={searchInputRef}
                    foods={FOOD_SUGGESTIONS}
                    recentSearches={RECENT_SEARCHES}
                    onFoodPress={handleFoodPress}
                    onManualAdd={(foodName) => {
                        router.push({
                            pathname: "/add-inventory",
                            params: {
                                name: foodName,
                            },
                        });
                    }}
                />
                <Text style={styles.footerText}>
                    You can review quantity, expiration, category, and location
                    before saving.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

type ActionCardProps = {
    method: AddMethod;
    emphasized?: boolean;
    onPress: () => void;
};

function ActionCard({
    method,
    emphasized = false,
    onPress,
}: ActionCardProps) {
    const scale = useSharedValue(1);
    const lift = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: lift.value },
            { scale: scale.value },
        ],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.985, {
            damping: 18,
            stiffness: 260,
        });
        lift.value = withSpring(-3, {
            damping: 18,
            stiffness: 260,
        });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 18,
            stiffness: 220,
        });
        lift.value = withSpring(0, {
            damping: 18,
            stiffness: 220,
        });
    };

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                accessibilityRole="button"
                accessibilityLabel={method.title}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[
                    styles.actionCard,
                    emphasized && styles.actionCardEmphasized,
                ]}
            >
                <View
                    style={[
                        styles.actionIcon,
                        emphasized && styles.actionIconEmphasized,
                    ]}
                >
                    <Ionicons
                        name={method.icon}
                        size={iconSizes.lg}
                        color={
                            emphasized
                                ? colors.textInverse
                                : colors.primaryDark
                        }
                    />
                </View>

                <View style={styles.actionCopy}>
                    <View style={styles.actionTitleRow}>
                        <Text style={styles.actionTitle}>{method.title}</Text>

                        {method.badge ? (
                            <View style={styles.methodBadge}>
                                <Text style={styles.methodBadgeText}>
                                    {method.badge}
                                </Text>
                            </View>
                        ) : null}
                    </View>

                    <Text style={styles.actionDescription}>
                        {method.description}
                    </Text>
                </View>

                <View style={styles.actionArrow}>
                    <Ionicons
                        name="chevron-forward"
                        size={iconSizes.sm}
                        color={colors.primaryDark}
                    />
                </View>
            </Pressable>
        </Animated.View>
    );
}

type FoodResultRowProps = {
    food: FoodSuggestion;
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
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodCategory}>{food.category}</Text>
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
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        paddingTop: spacing.lg,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing["6xl"] + spacing["4xl"],
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.lg,
        marginBottom: spacing.xl,
    },

    headerCopy: {
        flex: 1,
        minWidth: 0,
    },

    eyebrow: {
        color: colors.primary,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
        letterSpacing: 1.4,
        marginBottom: spacing.xs,
    },

    title: {
        color: colors.text,
        fontSize: fontSizes["3xl"],
        lineHeight: lineHeights["3xl"],
        fontWeight: fontWeights.extraBold,
    },

    subtitle: {
        marginTop: spacing.sm,
        maxWidth: 310,
        color: colors.textMuted,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.medium,
    },

    headerIcon: {
        width: 58,
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.xl,
        borderWidth: 2,
        borderColor: colors.accentLight,
        backgroundColor: colors.accent,
        transform: [{ rotate: "4deg" }],
        ...shadows.small,
    },

    assistantCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.lg,
        marginBottom: spacing["2xl"],
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        backgroundColor: colors.primaryDark,
        ...shadows.medium,
    },

    assistantIcon: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accent,
    },

    assistantCopy: {
        flex: 1,
        minWidth: 0,
    },

    assistantTitle: {
        color: colors.textInverse,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.bold,
    },

    assistantDescription: {
        marginTop: spacing.xs,
        color: colors.backgroundMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
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

    actionList: {
        gap: spacing.md,
        marginBottom: spacing["3xl"],
    },

    actionCard: {
        minHeight: 100,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.lg,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        ...shadows.small,
    },

    actionCardEmphasized: {
        borderColor: colors.primaryLight,
    },

    actionIcon: {
        width: 58,
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.lg,
        borderWidth: 1,
        borderColor: colors.accentLight,
        backgroundColor: colors.accent,
    },

    actionIconEmphasized: {
        borderColor: colors.primaryLight,
        backgroundColor: colors.primary,
    },

    actionCopy: {
        flex: 1,
        minWidth: 0,
    },

    actionTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: spacing.sm,
    },

    actionTitle: {
        color: colors.text,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.lg,
        fontWeight: fontWeights.extraBold,
    },

    actionDescription: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
    },

    methodBadge: {
        minHeight: 26,
        justifyContent: "center",
        paddingHorizontal: spacing.sm,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.accentDark,
        backgroundColor: colors.accentLight,
    },

    methodBadgeText: {
        color: colors.primaryDark,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },

    actionArrow: {
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.surfaceSoft,
    },

    searchSection: {
        marginBottom: spacing["2xl"],
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
        lineHeight: lineHeights.md,
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

    footerText: {
        maxWidth: 330,
        alignSelf: "center",
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
        textAlign: "center",
    },

    pressed: {
        opacity: 0.78,
    },
});

