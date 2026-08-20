import { Screen } from "@/components/ui/screen";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import Animated, {
    FadeInDown
} from "react-native-reanimated";
import { PageHeader } from "@/components/navigation/screen-header";
import { ActionCard } from "@/components/add-inventory/action-card";
import {
    AddManuallyModal,
    ManualKitchenItem
} from "@/components/add-inventory/add-manually-modal";
import api, { ApiError } from "@/hooks/api";
import {
    QuickFoodSearch
} from "@/components/add-inventory/quick-food-search";
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
import { useInventoryStore } from "@/stores/inventory-store";
import { CreateInventoryItemResponse } from "@/types/inventory-item";

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
    const addItem = useInventoryStore((state) => state.addItem);
    const router = useRouter();
    const searchInputRef = useRef<TextInput>(null);

    const [manualModalVisible, setManualModalVisible] = useState(false);

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
                setManualModalVisible(true);
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

    // Add item in the backend send request
    const handleAddKitchenItem = async (
        item: ManualKitchenItem,
    ): Promise<void> => {
        try {
            const response =
                await api.post<CreateInventoryItemResponse>(
                    "/inventory",
                    {
                        name: item.name,
                        emoji: item.emoji,
                        quantity: item.quantity,
                        unit: item.unit,
                        category: item.category,
                        storage: item.storage,
                        expirationDate:
                            item.expirationDate?.toISOString() ?? null,
                        notes: item.notes.trim() || null,
                    },
                );

            // Add the single created item to Zustand.
            addItem(response.item);
        } catch (error) {
            if (error instanceof ApiError) {
                console.error("Failed to create item:", {
                    status: error.status,
                    message: error.message,
                    data: error.data,
                });
            } else {
                console.error("Unexpected error:", error);
            }

            throw error;
        }
    };

    return (

        <Screen
            scrollable
            backgroundColor={colors.background}
            contentContainerStyle={styles.content}
            scrollViewProps={{
                showsVerticalScrollIndicator: false,
                keyboardShouldPersistTaps: "handled",
            }}
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

            <AddManuallyModal
                visible={manualModalVisible}
                onClose={() => {
                    setManualModalVisible(false);
                }}
                onAdd={handleAddKitchenItem}
            />
        </Screen>
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

    footerText: {
        maxWidth: 330,
        alignSelf: "center",
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
        textAlign: "center",
    },
});

