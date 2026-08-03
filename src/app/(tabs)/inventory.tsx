import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import {
    InventoryItemCard,
    type InventoryItem,
} from "../../components/inventory/inventory-item-card";

import { Screen } from "@/components/ui/screen";
import { theme } from "@/styles/theme";
import { PageHeader } from "../../components/navigation/screen-header";

type InventoryCategory =
    | "All"
    | "Produce"
    | "Dairy"
    | "Meat"
    | "Pantry";

const CATEGORIES: InventoryCategory[] = [
    "All",
    "Produce",
    "Dairy",
    "Meat",
    "Pantry",
];

const INVENTORY_ITEMS: InventoryItem[] = [
    {
        id: "1",
        name: "Avocados",
        category: "Produce",
        quantity: "3 remaining",
        expiresIn: 2,
        icon: "leaf-outline",
    },
    {
        id: "2",
        name: "Whole Milk",
        category: "Dairy",
        quantity: "1 carton",
        expiresIn: 4,
        icon: "water-outline",
    },
    {
        id: "3",
        name: "Chicken Breast",
        category: "Meat",
        quantity: "2 pieces",
        expiresIn: 1,
        icon: "restaurant-outline",
    },
    {
        id: "4",
        name: "Eggs",
        category: "Dairy",
        quantity: "8 remaining",
        expiresIn: 6,
        icon: "egg-outline",
    },
    {
        id: "5",
        name: "Tomatoes",
        category: "Produce",
        quantity: "5 remaining",
        expiresIn: 3,
        icon: "nutrition-outline",
    },
    {
        id: "6",
        name: "Pasta",
        category: "Pantry",
        quantity: "1 package",
        expiresIn: 30,
        icon: "fast-food-outline",
    },
];

export default function InventoryScreen() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState<InventoryCategory>("All");

    const filteredItems = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        return INVENTORY_ITEMS.filter((item) => {
            const matchesCategory =
                selectedCategory === "All" ||
                item.category === selectedCategory;

            const matchesSearch =
                normalizedSearch.length === 0 ||
                item.name
                    .toLowerCase()
                    .includes(normalizedSearch);

            return matchesCategory && matchesSearch;
        });
    }, [search, selectedCategory]);

    const expiringSoonCount = INVENTORY_ITEMS.filter(
        (item) => item.expiresIn <= 3,
    ).length;

    const renderInventoryItem = ({
        item,
    }: {
        item: InventoryItem;
    }) => (
        <InventoryItemCard
            item={item}
            onPress={handleInventoryItemPress}
        />
    );

    const handleInventoryItemPress = (
        item: InventoryItem,
    ) => {
        console.log("Opened:", item.name);
    };

    return (
        <Screen
            padded={false}
            avoidKeyboard={false}
            backgroundColor={theme.colors.background}
        >
            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id}
                renderItem={renderInventoryItem}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                contentContainerStyle={
                    styles.contentContainer
                }
                ListHeaderComponent={
                    <>
                        <PageHeader
                            eyebrow="MY KITCHEN"
                            title="Inventory"
                            description="See what you have and what needs to be used soon."
                            icon="scan-outline"
                            accessibilityLabel="Scan inventory item"
                            onPress={() => {
                                console.log("Scan pressed");
                            }}
                        />

                        <View style={styles.summaryCard}>
                            <View
                                style={
                                    styles.summaryIconContainer
                                }
                            >
                                <Ionicons
                                    name="snow-outline"
                                    size={theme.iconSizes.xl}
                                    color={
                                        theme.colors
                                            .primaryDark
                                    }
                                />
                            </View>

                            <View style={styles.summaryContent}>
                                <Text
                                    style={styles.summaryLabel}
                                >
                                    In your fridge
                                </Text>

                                <Text
                                    style={styles.summaryValue}
                                >
                                    {INVENTORY_ITEMS.length} items
                                </Text>

                                <Text
                                    style={styles.summaryMessage}
                                >
                                    {expiringSoonCount} items need
                                    your attention soon.
                                </Text>
                            </View>

                            <View style={styles.summaryBadge}>
                                <Ionicons
                                    name="sparkles"
                                    size={theme.iconSizes.sm}
                                    color={
                                        theme.colors
                                            .primaryDark
                                    }
                                />
                            </View>
                        </View>

                        <View style={styles.searchContainer}>
                            <View style={styles.searchIcon}>
                                <Ionicons
                                    name="search-outline"
                                    size={theme.iconSizes.sm}
                                    color={
                                        theme.colors
                                            .primaryDark
                                    }
                                />
                            </View>

                            <TextInput
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Search your food"
                                placeholderTextColor={
                                    theme.colors.textMuted
                                }
                                style={styles.searchInput}
                                returnKeyType="search"
                            />

                            {search.length > 0 && (
                                <Pressable
                                    accessibilityRole="button"
                                    accessibilityLabel="Clear search"
                                    onPress={() => setSearch("")}
                                    hitSlop={8}
                                    style={({ pressed }) => [
                                        styles.clearButton,
                                        pressed &&
                                        styles.pressed,
                                    ]}
                                >
                                    <Ionicons
                                        name="close"
                                        size={
                                            theme.iconSizes.sm
                                        }
                                        color={
                                            theme.colors
                                                .primaryDark
                                        }
                                    />
                                </Pressable>
                            )}
                        </View>

                        <FlatList
                            horizontal
                            data={CATEGORIES}
                            keyExtractor={(item) => item}
                            showsHorizontalScrollIndicator={
                                false
                            }
                            contentContainerStyle={
                                styles.categoryList
                            }
                            renderItem={({ item }) => {
                                const isSelected =
                                    selectedCategory === item;

                                return (
                                    <Pressable
                                        accessibilityRole="button"
                                        accessibilityState={{
                                            selected: isSelected,
                                        }}
                                        onPress={() =>
                                            setSelectedCategory(
                                                item,
                                            )
                                        }
                                        style={({
                                            pressed,
                                        }) => [
                                                styles.categoryChip,
                                                isSelected &&
                                                styles.selectedCategoryChip,
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
                                                styles.categoryText,
                                                isSelected &&
                                                styles.selectedCategoryText,
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
                                    Your food
                                </Text>

                                <Text
                                    style={
                                        styles.sectionSubtitle
                                    }
                                >
                                    {filteredItems.length} items
                                    shown
                                </Text>
                            </View>

                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel="Sort inventory"
                                style={({ pressed }) => [
                                    styles.sortButton,
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
                                name="basket-outline"
                                size={theme.iconSizes["2xl"]}
                                color={theme.colors.primary}
                            />
                        </View>

                        <Text style={styles.emptyTitle}>
                            Nothing found
                        </Text>

                        <Text style={styles.emptyDescription}>
                            Try another food name or select a
                            different category.
                        </Text>
                    </View>
                }
                ItemSeparatorComponent={() => (
                    <View style={styles.itemSeparator} />
                )}
                ListFooterComponent={
                    <View style={styles.bottomSpacing} />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.md,
    },

    summaryCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.md,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radii["2xl"],
        borderWidth: 1,
        borderColor: theme.colors.primaryDark,
        ...theme.shadows.large,
    },

    summaryIconContainer: {
        width: 64,
        height: 64,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.accent,
        borderRadius: theme.radii.xl,
        borderWidth: 4,
        borderColor: theme.colors.primaryLight,
        ...theme.shadows.small,
    },

    summaryContent: {
        flex: 1,
        minWidth: 0,
    },

    summaryLabel: {
        color: theme.colors.accentLight,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        fontWeight: theme.fontWeights.bold,
        textTransform: "uppercase",
        letterSpacing: 1,
    },

    summaryValue: {
        color: theme.colors.textInverse,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.extraBold,
        marginTop: 2,
    },

    summaryMessage: {
        color: theme.colors.backgroundMuted,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        marginTop: theme.spacing.xs,
    },

    summaryBadge: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
        backgroundColor: theme.colors.accent,
        borderRadius: theme.radii.full,
        borderWidth: 2,
        borderColor: theme.colors.accentLight,
    },

    searchContainer: {
        minHeight: theme.componentSizes.inputHeight,
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.sm,
        paddingHorizontal: theme.spacing.sm,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.medium,
    },

    searchIcon: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.accentLight,
        borderRadius: theme.radii.full,
    },

    searchInput: {
        flex: 1,
        minHeight: theme.componentSizes.inputHeight,
        color: theme.colors.text,
        fontSize: theme.fontSizes.md,
        lineHeight: theme.lineHeights.md,
    },

    clearButton: {
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.backgroundMuted,
        borderRadius: theme.radii.full,
    },

    categoryList: {
        gap: theme.spacing.sm,
        paddingVertical: theme.spacing.lg,
    },

    categoryChip: {
        minHeight: theme.componentSizes.compactButtonHeight,
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

    selectedCategoryChip: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primaryDark,
        ...theme.shadows.medium,
    },

    categoryText: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
        fontWeight: theme.fontWeights.semibold,
    },

    selectedCategoryText: {
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

    sortButton: {
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

    inventoryCard: {
        minHeight: 88,
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.md,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.medium,
    },

    itemIconContainer: {
        width: 58,
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.accentLight,
        borderRadius: theme.radii.lg,
        borderWidth: 1,
        borderColor: theme.colors.accent,
    },

    itemContent: {
        flex: 1,
        minWidth: 0,
    },

    itemName: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.md,
        lineHeight: theme.lineHeights.md,
        fontWeight: theme.fontWeights.bold,
    },

    itemQuantity: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        marginTop: 2,
    },

    itemRight: {
        alignItems: "flex-end",
        gap: theme.spacing.sm,
    },

    expiryBadge: {
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

    urgentExpiryBadge: {
        backgroundColor: theme.colors.error,
        borderColor: theme.colors.error,
    },

    expiryText: {
        color: theme.colors.primaryDark,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        fontWeight: theme.fontWeights.bold,
    },

    urgentExpiryText: {
        color: theme.colors.textInverse,
    },

    itemSeparator: {
        height: theme.spacing.md,
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
        maxWidth: 260,
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