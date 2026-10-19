
import { ScannedFood } from "@/stores/scanned-food-store";
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
import { Ionicons } from "@expo/vector-icons";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
    FadeInDown,
} from "react-native-reanimated";

type ScannedFoodListProps = {
    foods: ScannedFood[];
    isLoading: boolean;
    errorMessage: string | null;
    onRemoveFood: (code: string) => void;
    onIncreaseQuantity: (code: string) => void;
    onDecreaseQuantity: (code: string) => void;
};

export default function ScannedFoodList({
    foods,
    isLoading,
    errorMessage,
    onRemoveFood,
    onIncreaseQuantity,
    onDecreaseQuantity,
}: ScannedFoodListProps) {
    return (
        <>
            {/* Loading */}
            {isLoading && (
                <View style={styles.statusCard}>
                    <ActivityIndicator
                        color={colors.primary}
                    />

                    <Text style={styles.statusText}>
                        Looking up your food...
                    </Text>
                </View>
            )}

            {/* Error */}
            {errorMessage && (
                <View style={styles.errorCard}>
                    <Ionicons
                        name="alert-circle-outline"
                        size={iconSizes.md}
                        color={colors.error}
                    />

                    <Text style={styles.errorText}>
                        {errorMessage}
                    </Text>
                </View>
            )}

            {/* Food List */}
            <View style={styles.foodList}>
                {foods.map((food, index) => (
                    <ReanimatedSwipeable
                        key={food.code}
                        friction={2}
                        rightThreshold={40}
                        overshootRight={false}
                        renderRightActions={() => (
                            <Pressable
                                style={styles.swipeDeleteButton}
                                onPress={() => onRemoveFood(food.code)}
                                accessibilityRole="button"
                                accessibilityLabel={`Delete ${food.name}`}
                            >
                                <Ionicons name="trash-outline" size={iconSizes.md} color="#FFFFFF" />
                                <Text style={styles.swipeDeleteText}>Delete</Text>
                            </Pressable>
                        )}
                    >
                        <Animated.View
                            entering={FadeInDown.delay(
                                120 + Math.min(index, 8) * 55,
                            ).springify()}
                            style={styles.foodCard}
                        >
                            <View style={styles.foodIcon}>
                                <Ionicons
                                    name="nutrition-outline"
                                    size={iconSizes.lg}
                                    color={colors.primaryDark}
                                />
                            </View>

                            <View style={styles.foodCopy}>
                                <Text
                                    style={styles.foodName}
                                    numberOfLines={2}
                                >
                                    {food.name}
                                </Text>

                                <Text
                                    style={styles.foodBrand}
                                    numberOfLines={1}
                                >
                                    {food.brand || "Unknown brand"}
                                </Text>

                                <View style={styles.barcodeRow}>
                                    <Ionicons
                                        name="barcode-outline"
                                        size={iconSizes.xs}
                                        color={colors.textMuted}
                                    />

                                    <Text
                                        style={styles.barcodeText}
                                        numberOfLines={1}
                                    >
                                        {food.code}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.foodActions}>
                                {/* Remove Food */}
                                <Pressable
                                    style={styles.removeButton}
                                    onPress={() =>
                                        onRemoveFood(food.code)
                                    }
                                    accessibilityRole="button"
                                    accessibilityLabel={`Remove ${food.name}`}
                                >
                                    <Ionicons
                                        name="close"
                                        size={iconSizes.sm}
                                        color={colors.textMuted}
                                    />
                                </Pressable>

                                {/* Quantity Controls */}
                                <View style={styles.quantityControls}>
                                    <Pressable
                                        style={[
                                            styles.quantityButton,
                                            food.quantity <= 1 &&
                                            styles.quantityButtonDisabled,
                                        ]}
                                        onPress={() =>
                                            onDecreaseQuantity(food.code)
                                        }
                                        disabled={food.quantity <= 1}
                                        accessibilityRole="button"
                                        accessibilityLabel={`Decrease quantity of ${food.name}`}
                                    >
                                        <Ionicons
                                            name="remove"
                                            size={iconSizes.sm}
                                            color={
                                                food.quantity <= 1
                                                    ? colors.textMuted
                                                    : colors.primaryDark
                                            }
                                        />
                                    </Pressable>

                                    <Text style={styles.quantityText}>
                                        {food.quantity}
                                    </Text>

                                    <Pressable
                                        style={styles.quantityButton}
                                        onPress={() =>
                                            onIncreaseQuantity(food.code)
                                        }
                                        accessibilityRole="button"
                                        accessibilityLabel={`Increase quantity of ${food.name}`}
                                    >
                                        <Ionicons
                                            name="add"
                                            size={iconSizes.sm}
                                            color={colors.primaryDark}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        </Animated.View>
                    </ReanimatedSwipeable>
                ))}
            </View>

            {/* Empty State */}
            {foods.length === 0 && !isLoading && (
                <Animated.View
                    entering={FadeInDown.delay(150).duration(420)}
                    style={styles.emptyCard}
                >
                    <View style={styles.emptyIcon}>
                        <Ionicons
                            name="barcode-outline"
                            size={iconSizes["2xl"]}
                            color={colors.primaryDark}
                        />
                    </View>

                    <Text style={styles.emptyTitle}>
                        Your basket is empty
                    </Text>

                    <Text style={styles.emptyDescription}>
                        Scan a product barcode to start building
                        your grocery list.
                    </Text>
                </Animated.View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    foodList: {
        gap: spacing.md,
        marginBottom: spacing["2xl"],
    },

    swipeDeleteButton: {
        width: 92,
        marginLeft: spacing.sm,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xs,
        borderRadius: radii.xl,
        backgroundColor: colors.error,
    },

    swipeDeleteText: {
        color: "#FFFFFF",
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.bold,
    },

    foodCard: {
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

    foodIcon: {
        width: 56,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.lg,
        backgroundColor: colors.surfaceSoft,
    },

    foodCopy: {
        flex: 1,
        minWidth: 0,
        gap: spacing.xs,
    },

    foodName: {
        color: colors.text,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.bold,
    },

    foodBrand: {
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
    },

    barcodeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    barcodeText: {
        flexShrink: 1,
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
    },

    foodActions: {
        alignSelf: "stretch",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: spacing.md,
    },

    removeButton: {
        padding: spacing.xs,
    },

    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        padding: spacing.xs,
        borderRadius: radii.md,
        backgroundColor: colors.accentLight,
    },

    quantityButton: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.sm,
        backgroundColor: colors.surface,
    },

    quantityButtonDisabled: {
        opacity: 0.4,
    },

    quantityText: {
        minWidth: 20,
        textAlign: "center",
        color: colors.primaryDark,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.bold,
    },

    statusCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.md,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderRadius: radii.lg,
        backgroundColor: colors.surface,
    },

    statusText: {
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.medium,
    },

    errorCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderRadius: radii.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.error,
    },

    errorText: {
        flex: 1,
        color: colors.error,
        fontSize: fontSizes.sm,
    },

    emptyCard: {
        alignItems: "center",
        padding: spacing["3xl"],
        marginBottom: spacing["2xl"],
        borderRadius: radii.xl,
        backgroundColor: colors.surfaceSoft,
        borderWidth: 1,
        borderColor: colors.border,
    },

    emptyIcon: {
        width: 84,
        height: 84,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
    },

    emptyTitle: {
        color: colors.text,
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.bold,
    },

    emptyDescription: {
        maxWidth: 260,
        marginTop: spacing.sm,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        textAlign: "center",
    },
});
