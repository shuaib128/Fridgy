import { PageHeader } from "@/components/navigation/screen-header";
import ScannedFoodList from "@/components/scanned-food-review/scanned-food-list";
import { Screen } from "@/components/ui/screen";
import api, { ApiError } from "@/hooks/api";
import { useInventoryStore } from "@/stores/inventory-store";
import { useScannedFoodStore } from "@/stores/scanned-food-store";
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
import { Food } from "@/types/food";
import { CreateInventoryItemResponse } from "@/types/inventory-item";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, {
    FadeInDown
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FoodPreviewScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const { barcode, scanId } = useLocalSearchParams<{
        barcode?: string;
        scanId?: string;
    }>();

    // Zustand Store
    const foods = useScannedFoodStore((state) => state.foods);
    const addFood = useScannedFoodStore((state) => state.addFood);
    const removeFood = useScannedFoodStore((state) => state.removeFood);

    const addItem = useInventoryStore((state) => state.addItem);

    const increaseQuantity = useScannedFoodStore(
        (state) => state.increaseQuantity,
    );

    const decreaseQuantity = useScannedFoodStore(
        (state) => state.decreaseQuantity,
    );

    // Local State
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Track successfully processed scans
    const lastProcessedScan = useRef<string | null>(null);

    // Prevent duplicate in-flight requests
    const processingScan = useRef<string | null>(null);

    // Basket Summary
    const totalItems = foods.reduce(
        (total, food) => total + food.quantity,
        0,
    );

    const hasFoods = foods.length > 0;

    // Fetch Scanned Food
    useEffect(() => {
        if (!barcode) return;

        const scanKey = scanId ?? barcode;

        if (lastProcessedScan.current === scanKey) return;

        if (processingScan.current === scanKey) return;

        let active = true;

        processingScan.current = scanKey;

        async function fetchFood() {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                const food = await api.get<Food>(
                    `/foods/search/barcode?barcode=${encodeURIComponent(barcode!)}`,
                );

                if (!active) return;

                addFood(food);

                // Mark scan as processed only after success
                lastProcessedScan.current = scanKey;
            } catch (error) {
                console.error("Failed to fetch food:", error);

                if (active) {
                    setErrorMessage(
                        "We couldn't find this product. Please try scanning again.",
                    );
                }
            } finally {
                if (processingScan.current === scanKey) {
                    processingScan.current = null;
                }

                if (active) {
                    setIsLoading(false);
                }
            }
        }

        fetchFood();

        return () => {
            active = false;

            if (processingScan.current === scanKey) {
                processingScan.current = null;
            }
        };
    }, [barcode, scanId, addFood]);

    // Navigation
    const handleScanMore = () => {
        router.back();
    };

    // Add Scanned Foods to Inventory

    const handleAddKitchenItem = async (): Promise<void> => {
        if (isLoading || !hasFoods) return;

        try {
            setIsLoading(true);
            setErrorMessage(null);

            for (const food of foods) {
                const response = await api.post<CreateInventoryItemResponse>(
                    "/inventory",
                    {
                        name: food.name,
                        emoji: "🥫",
                        quantity: food.quantity,
                        unit: "pcs",
                        category: "other",
                        storage: "pantry",
                        expirationDate: null,
                        notes: null,
                    },
                );

                // Add each created item to Zustand
                addItem(response.item);

                // Remove successfully added food from scan basket
                removeFood(food.id.toString());
            }
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

            setErrorMessage(
                "Failed to add some foods to your inventory. Please try again.",
            );
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <Screen
                scrollable
                backgroundColor={colors.background}
                contentContainerStyle={styles.content}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false,
                }}
            >
                {/* Page Header */}
                <PageHeader
                    eyebrow="BARCODE SCANNER"
                    title="Scanned Foods"
                    description="Review the groceries you've scanned before adding them to your kitchen."
                    icon="scan-outline"
                    accessibilityLabel="Scan more foods"
                    onPress={() => router.push("/(tabs)/add-inventory")}
                />

                {/* Scan Summary */}
                <Animated.View
                    entering={FadeInDown.delay(80).duration(420)}
                    style={styles.summaryCard}
                >
                    <View style={styles.summaryIcon}>
                        <Ionicons
                            name="basket-outline"
                            size={iconSizes.lg}
                            color={colors.primaryDark}
                        />
                    </View>

                    <View style={styles.summaryCopy}>
                        <Text style={styles.summaryTitle}>
                            Your scan basket
                        </Text>

                        <Text style={styles.summaryDescription}>
                            {foods.length} unique products collected
                        </Text>
                    </View>

                    <View style={styles.summaryBadge}>
                        <Text style={styles.summaryCount}>
                            {totalItems}
                        </Text>

                        <Text style={styles.summaryCountLabel}>
                            ITEMS
                        </Text>
                    </View>
                </Animated.View>

                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Food Items
                    </Text>

                    <Text style={styles.sectionHint}>
                        {foods.length} PRODUCTS
                    </Text>
                </View>

                {/* Scanned Food List */}
                <ScannedFoodList
                    foods={foods}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    onRemoveFood={removeFood}
                    onIncreaseQuantity={increaseQuantity}
                    onDecreaseQuantity={decreaseQuantity}
                />
            </Screen>

            {/* Fixed Bottom Actions */}
            <Animated.View
                entering={FadeInDown.delay(220).duration(420)}
                style={[
                    styles.actionSection,
                    {
                        paddingBottom: Math.max(
                            insets.bottom,
                            spacing["2xl"],
                        ),
                    },
                ]}
            >
                <View style={styles.actionRow}>
                    {/* Scan More */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.scanButton,
                            pressed && styles.pressed,
                        ]}
                        onPress={handleScanMore}
                        accessibilityRole="button"
                        accessibilityLabel="Scan more foods"
                    >
                        <Ionicons
                            name="scan-outline"
                            size={iconSizes.md}
                            color={colors.primaryDark}
                        />

                        <Text style={styles.scanButtonTitle}>
                            Scan More
                        </Text>
                    </Pressable>

                    {/* Add to Inventory */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.inventoryButton,
                            pressed && styles.pressed,
                            (!hasFoods || isLoading) && styles.disabledButton,
                        ]}
                        onPress={handleAddKitchenItem}
                        disabled={!hasFoods || isLoading}
                        accessibilityRole="button"
                        accessibilityLabel="Add foods to inventory"
                        accessibilityState={{
                            disabled: !hasFoods || isLoading,
                        }}
                    >
                        <Ionicons
                            name="add-circle-outline"
                            size={iconSizes.md}
                            color={colors.textInverse}
                        />

                        <Text style={styles.inventoryButtonTitle}>
                            Add to Inventory
                        </Text>
                    </Pressable>
                </View>

                {/* Footer Information */}
                <Text style={styles.footerText}>
                    Scanning the same product again will increase
                    its quantity automatically.
                </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        paddingTop: spacing.lg,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing["2xl"],
    },

    // Summary Card
    summaryCard: {
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

    summaryIcon: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accent,
    },

    summaryCopy: {
        flex: 1,
        minWidth: 0,
    },

    summaryTitle: {
        color: colors.textInverse,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.bold,
    },

    summaryDescription: {
        marginTop: spacing.xs,
        color: colors.backgroundMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
    },

    summaryBadge: {
        minWidth: 52,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        alignItems: "center",
        borderRadius: radii.md,
        backgroundColor: colors.primary,
    },

    summaryCount: {
        color: colors.textInverse,
        fontSize: fontSizes.xl,
        fontWeight: fontWeights.extraBold,
    },

    summaryCountLabel: {
        color: colors.backgroundMuted,
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.bold,
    },

    // Section Header
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

    // Fixed Bottom Actions
    actionSection: {
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing["2xl"],
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },

    actionRow: {
        flexDirection: "row",
        alignItems: "stretch",
        gap: spacing.md,
    },

    // Scan Button
    scanButton: {
        flex: 1,
        minHeight: 58,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.sm,
        borderRadius: radii.lg,
        backgroundColor: colors.accentLight,
        borderWidth: 1,
        borderColor: colors.accent,
    },

    scanButtonTitle: {
        color: colors.primaryDark,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.bold,
    },

    // Inventory Button
    inventoryButton: {
        flex: 1,
        minHeight: 58,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.sm,
        borderRadius: radii.lg,
        backgroundColor: colors.primary,
    },

    inventoryButtonTitle: {
        color: colors.textInverse,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.bold,
    },

    // Button States
    pressed: {
        opacity: 0.8,
    },

    disabledButton: {
        opacity: 0.5,
    },

    // Footer
    footerText: {
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.sm,
        textAlign: "center",
    },
});
