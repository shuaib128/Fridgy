import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import Animated, {
    SlideInDown,
    SlideOutDown
} from "react-native-reanimated";

import {
    colors,
    fontSizes,
    fontWeights,
    iconSizes,
    lineHeights,
    opacity,
    radii,
    shadows,
    spacing,
} from "@/styles/theme";

import { CategorySection } from "./modal/category-section";
import { ExpirationSection } from "./modal/expiration-section";
import { FoodNameSection } from "./modal/food-name-section";
import { FoodSuggestions } from "./modal/food-suggestions";
import { MealSuggestionsSection } from "./modal/meal-suggestions-section";
import { ModalBackdrop } from "./modal/modal-backdrop";
import { ModalHeader } from "./modal/modal-header";
import { NotesSection } from "./modal/notes-section";
import { QuantitySection } from "./modal/quantity-section";
import { SmartExpirationSuggestion } from "./modal/smart-expiration-suggestion";
import { StorageSection } from "./modal/storage-section";
import { SuccessState } from "./modal/success-state";
import { CategoryID } from "@/types/inventory-item";
import { StorageID } from "@/types/inventory-item";

export type ExpirationOption =
    | "today"
    | "tomorrow"
    | "3-days"
    | "1-week"
    | "2-weeks"
    | "pick-date";

export type FoodSuggestion = {
    name: string;
    emoji: string;
    category: CategoryID;
    storage: StorageID;
    unit: string;
    recommendedDays: number;
    meals: string[];
};

export type ManualKitchenItem = {
    name: string;
    emoji: string;
    quantity: number;
    unit: string;
    category: CategoryID;
    storage: StorageID;
    expiration: ExpirationOption;
    expirationDate: Date | null;
    notes: string;
};

export type AddManuallyModalProps = {
    visible: boolean;
    onClose: () => void;
    onAdd?: (item: ManualKitchenItem) => void | Promise<void>;
};

const FOOD_DATABASE: FoodSuggestion[] = [
    {
        name: "Rice",
        emoji: "🍚",
        category: "pantry",
        storage: "pantry",
        unit: "Bag",
        recommendedDays: 365,
        meals: [
            "Chicken Biryani",
            "Fried Rice",
            "Chicken Rice Bowl",
        ],
    },
    {
        name: "Frozen Vegetables",
        emoji: "🫛",
        category: "frozen",
        storage: "freezer",
        unit: "Bag",
        recommendedDays: 240,
        meals: [
            "Vegetable Stir Fry",
            "Vegetable Soup",
            "Vegetable Fried Rice",
        ],
    },
    {
        name: "Other Food",
        emoji: "🥫",
        category: "other",
        storage: "pantry",
        unit: "Pack",
        recommendedDays: 7,
        meals: [
            "Mixed Food Bowl",
            "Quick Snack",
            "Leftover Meal",
        ],
    },
    {
        name: "Chicken Breast",
        emoji: "🍗",
        category: "meat",
        storage: "fridge",
        unit: "Pieces",
        recommendedDays: 2,
        meals: [
            "Chicken Alfredo",
            "Caesar Salad",
            "Butter Chicken",
        ],
    },
    {
        name: "Chicken Thigh",
        emoji: "🍗",
        category: "meat",
        storage: "fridge",
        unit: "Pieces",
        recommendedDays: 2,
        meals: [
            "Chicken Curry",
            "Roasted Chicken",
            "Chicken Biryani",
        ],
    },
    {
        name: "Ground Chicken",
        emoji: "🍗",
        category: "meat",
        storage: "fridge",
        unit: "lbs",
        recommendedDays: 2,
        meals: [
            "Chicken Meatballs",
            "Chicken Lettuce Wraps",
            "Chicken Burgers",
        ],
    },
    {
        name: "Rotisserie Chicken",
        emoji: "🍗",
        category: "meat",
        storage: "fridge",
        unit: "Pieces",
        recommendedDays: 4,
        meals: [
            "Chicken Sandwich",
            "Chicken Soup",
            "Chicken Tacos",
        ],
    },
    {
        name: "Milk",
        emoji: "🥛",
        category: "dairy",
        storage: "fridge",
        unit: "Bottle",
        recommendedDays: 7,
        meals: [
            "Creamy Pasta",
            "Pancakes",
            "French Toast",
        ],
    },
    {
        name: "Eggs",
        emoji: "🥚",
        category: "dairy",
        storage: "fridge",
        unit: "Pieces",
        recommendedDays: 21,
        meals: [
            "Omelet",
            "Egg Fried Rice",
            "Breakfast Sandwich",
        ],
    },
    {
        name: "Avocado",
        emoji: "🥑",
        category: "produce",
        storage: "fridge",
        unit: "Pieces",
        recommendedDays: 4,
        meals: [
            "Avocado Toast",
            "Guacamole",
            "Chicken Avocado Salad",
        ],
    },
    {
        name: "Spinach",
        emoji: "🥬",
        category: "produce",
        storage: "fridge",
        unit: "Bag",
        recommendedDays: 5,
        meals: [
            "Spinach Omelet",
            "Green Smoothie",
            "Creamy Spinach Pasta",
        ],
    },
    {
        name: "Bread",
        emoji: "🍞",
        category: "bakery",
        storage: "pantry",
        unit: "Pack",
        recommendedDays: 7,
        meals: [
            "French Toast",
            "Grilled Cheese",
            "Breakfast Sandwich",
        ],
    },
    {
        name: "Orange Juice",
        emoji: "🧃",
        category: "drinks",
        storage: "fridge",
        unit: "Bottle",
        recommendedDays: 7,
        meals: [
            "Breakfast Smoothie",
            "Orange Chicken",
            "Fruit Punch",
        ],
    },
];

export const CATEGORIES: {
    id: CategoryID;
    label: string;
    emoji: string;
}[] = [
        { id: "produce", label: "Produce", emoji: "🥬" },
        { id: "meat", label: "Meat", emoji: "🥩" },
        { id: "dairy", label: "Dairy", emoji: "🥛" },
        { id: "bakery", label: "Bakery", emoji: "🍞" },
        { id: "pantry", label: "Pantry", emoji: "🥫" },
        { id: "frozen", label: "Frozen", emoji: "🧊" },
        { id: "drinks", label: "Drinks", emoji: "🥤" },
        { id: "other", label: "Other", emoji: "🥡" },
    ];

export const EXPIRATION_OPTIONS: {
    id: ExpirationOption;
    label: string;
    days: number | null;
}[] = [
        { id: "today", label: "Today", days: 0 },
        { id: "tomorrow", label: "Tomorrow", days: 1 },
        { id: "3-days", label: "3 Days", days: 3 },
        { id: "1-week", label: "1 Week", days: 7 },
        { id: "2-weeks", label: "2 Weeks", days: 14 },
        { id: "pick-date", label: "Pick Date", days: null },
    ];

function getExpirationFromDays(days: number): ExpirationOption {
    if (days <= 0) return "today";
    if (days === 1) return "tomorrow";
    if (days <= 3) return "3-days";
    if (days <= 7) return "1-week";
    if (days <= 14) return "2-weeks";

    return "pick-date";
}

function getDateFromExpiration(
    expiration: ExpirationOption,
): Date | null {
    const option = EXPIRATION_OPTIONS.find(
        (item) => item.id === expiration,
    );

    if (option?.days === null || option?.days === undefined) {
        return null;
    }

    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + option.days);

    return date;
}

type AddModalFooterProps = {
    canSubmit: boolean;
    isAdding: boolean;
    onAdd: () => void;
};

function AddModalFooter({
    canSubmit,
    isAdding,
    onAdd,
}: AddModalFooterProps) {
    return (
        <View style={styles.footer}>
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add to Kitchen"
                disabled={!canSubmit}
                onPress={onAdd}
                style={({ pressed }) => [
                    styles.addButton,
                    !canSubmit && styles.addButtonDisabled,
                    pressed && canSubmit && styles.addButtonPressed,
                ]}
            >
                <View style={styles.addButtonIcon}>
                    <Ionicons
                        name={isAdding ? "hourglass-outline" : "add"}
                        size={iconSizes.md}
                        color={colors.primaryDark}
                    />
                </View>

                <Text style={styles.addButtonText}>
                    {isAdding ? "Adding..." : "Add to Kitchen"}
                </Text>
            </Pressable>
        </View>
    );
}

export function AddManuallyModal({
    visible,
    onClose,
    onAdd,
}: AddManuallyModalProps) {
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState("Pieces");
    const [category, setCategory] = useState<CategoryID>("produce");
    const [storage, setStorage] = useState<StorageID>("fridge");
    const [expiration, setExpiration] = useState<ExpirationOption>("3-days");
    const [customExpirationDate, setCustomExpirationDate] = useState<Date | null>(null);
    const [notes, setNotes] = useState("");
    const [notesExpanded, setNotesExpanded] = useState(false);
    const [unitsExpanded, setUnitsExpanded] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [addedSuccessfully, setAddedSuccessfully] = useState(false);


    const matchedFood = useMemo(() => {
        const normalizedName = foodName.trim().toLowerCase();

        if (!normalizedName) return null;

        return (
            FOOD_DATABASE.find(
                (food) =>
                    food.name.toLowerCase() === normalizedName,
            ) ?? null
        );
    }, [foodName]);

    const suggestions = useMemo(() => {
        const normalizedName = foodName.trim().toLowerCase();

        if (!normalizedName || matchedFood) return [];

        return FOOD_DATABASE.filter((food) =>
            food.name.toLowerCase().includes(normalizedName),
        ).slice(0, 4);
    }, [foodName, matchedFood]);

    const categoryEmoji = useMemo(() => {
        return (
            CATEGORIES.find((item) => item.id === category)?.emoji ??
            "🥫"
        );
    }, [category]);

    const foodEmoji = matchedFood?.emoji ?? categoryEmoji;
    const smartExpiration = matchedFood?.recommendedDays ?? null;
    const suggestedMeals = matchedFood?.meals ?? [];
    const canSubmit = foodName.trim().length > 0 && !isAdding;

    useEffect(() => {
        if (!visible) return;

        setFoodName("");
        setQuantity(1);
        setUnit("Pieces");
        setCategory("produce");
        setStorage("fridge");
        setExpiration("3-days");
        setCustomExpirationDate(null);
        setNotes("");
        setNotesExpanded(false);
        setUnitsExpanded(false);
        setIsAdding(false);
        setAddedSuccessfully(false);
    }, [visible]);

    const applyFoodSuggestion = (suggestion: FoodSuggestion) => {
        setFoodName(suggestion.name);
        setCategory(suggestion.category);
        setStorage(suggestion.storage);
        setUnit(suggestion.unit);
        setExpiration(
            getExpirationFromDays(suggestion.recommendedDays),
        );
    };

    const applySmartExpiration = () => {
        if (!matchedFood) return;

        setExpiration(
            getExpirationFromDays(matchedFood.recommendedDays),
        );
    };

    const handleClose = () => {
        if (!isAdding) onClose();
    };

    const handleAdd = async () => {
        if (!canSubmit) return;

        const item: ManualKitchenItem = {
            name: foodName.trim(),
            emoji: foodEmoji,
            quantity,
            unit,
            category,
            storage,
            expiration,
            expirationDate:
                expiration === "pick-date"
                    ? customExpirationDate
                    : getDateFromExpiration(expiration),
            notes: notes.trim(),
        };

        try {
            setIsAdding(true);
            await onAdd?.(item);
            setAddedSuccessfully(true);

            setTimeout(() => {
                setIsAdding(false);
                onClose();
            }, 1250);
        } catch (error) {
            console.error("Failed to add kitchen item:", error);
            setIsAdding(false);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            statusBarTranslucent
            animationType="none"
            onRequestClose={handleClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.modalRoot}
            >
                <ModalBackdrop onClose={handleClose} />

                <Animated.View
                    entering={SlideInDown.duration(280)}
                    exiting={SlideOutDown.duration(220)}
                    style={styles.modalContainer}
                >
                    {addedSuccessfully ? (
                        <SuccessState emoji={foodEmoji} />
                    ) : (
                        <>
                            <View style={styles.dragHandle} />
                            <ModalHeader onClose={handleClose} />

                            <ScrollView
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.scrollContent}
                            >
                                <FoodNameSection
                                    foodName={foodName}
                                    foodEmoji={foodEmoji}
                                    onChangeFoodName={setFoodName}
                                    onClear={() => setFoodName("")}
                                />

                                <FoodSuggestions
                                    suggestions={suggestions}
                                    hidden={suggestions.length === 0}
                                    onSelect={applyFoodSuggestion}
                                />

                                <SmartExpirationSuggestion
                                    days={smartExpiration}
                                    onApply={applySmartExpiration}
                                />

                                <QuantitySection
                                    quantity={quantity}
                                    unit={unit}
                                    unitsExpanded={unitsExpanded}
                                    onDecrease={() =>
                                        setQuantity((current) =>
                                            Math.max(1, current - 1),
                                        )
                                    }
                                    onIncrease={() =>
                                        setQuantity((current) => current + 1)
                                    }
                                    onToggleUnits={() =>
                                        setUnitsExpanded((current) => !current)
                                    }
                                    onSelectUnit={(nextUnit) => {
                                        setUnit(nextUnit);
                                        setUnitsExpanded(false);
                                    }}
                                />

                                <CategorySection
                                    selectedCategory={category}
                                    onSelect={setCategory}
                                />

                                <StorageSection
                                    selectedStorage={storage}
                                    onSelect={setStorage}
                                />

                                <ExpirationSection
                                    selectedExpiration={expiration}
                                    customDate={customExpirationDate}
                                    onSelect={setExpiration}
                                    onCustomDateChange={setCustomExpirationDate}

                                />

                                <MealSuggestionsSection
                                    meals={suggestedMeals}
                                />

                                <NotesSection
                                    notes={notes}
                                    expanded={notesExpanded}
                                    onChangeNotes={setNotes}
                                    onToggle={() =>
                                        setNotesExpanded((current) => !current)
                                    }
                                />

                                <View style={styles.bottomSpacing} />
                            </ScrollView>

                            <AddModalFooter
                                canSubmit={canSubmit}
                                isAdding={isAdding}
                                onAdd={handleAdd}
                            />
                        </>
                    )}
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalRoot: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: colors.overlay,
    },

    modalContainer: {
        width: "100%",
        height: "94%",
        overflow: "hidden",
        borderTopLeftRadius: radii["2xl"],
        borderTopRightRadius: radii["2xl"],
        backgroundColor: colors.background,
        ...shadows.large,
    },

    dragHandle: {
        width: 46,
        height: 5,
        alignSelf: "center",
        marginTop: spacing.sm,
        marginBottom: spacing.xs,
        borderRadius: radii.full,
        backgroundColor: colors.borderStrong,
        opacity: 0.8,
    },

    scrollContent: {
        flexGrow: 1,
        paddingTop: spacing.lg,
        paddingHorizontal: spacing.xl,
    },

    bottomSpacing: {
        height: spacing["3xl"],
    },

    footer: {
        paddingTop: spacing.md,
        paddingHorizontal: spacing.xl,
        paddingBottom:
            Platform.OS === "ios"
                ? spacing["3xl"]
                : spacing.xl,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.background,
        ...shadows.small,
    },

    addButton: {
        minHeight: 62,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.md,
        paddingHorizontal: spacing.xl,
        borderWidth: 2,
        borderColor: colors.accentLight,
        borderRadius: radii.full,
        backgroundColor: colors.accent,
        ...shadows.small,
    },

    addButtonDisabled: {
        opacity: opacity.disabled,
        shadowOpacity: 0,
        elevation: 0,
    },

    addButtonPressed: {
        opacity: opacity.pressed,
        transform: [{ scale: 0.985 }],
    },

    addButtonIcon: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
    },

    addButtonText: {
        color: colors.primaryDark,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.extraBold,
    },

    successContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing["3xl"],
        backgroundColor: colors.background,
    },

    successFoodCard: {
        width: 88,
        height: 88,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
        borderWidth: 4,
        borderColor: colors.primaryLight,
        borderRadius: radii.xl,
        backgroundColor: colors.accent,
        transform: [{ rotate: "-4deg" }],
        ...shadows.medium,
    },

    successFoodEmoji: {
        fontSize: 48,
    },

    successFridgeIcon: {
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: spacing.lg,
        borderWidth: 4,
        borderColor: colors.primaryLight,
        borderRadius: radii.xl,
        backgroundColor: colors.primary,
        ...shadows.medium,
    },

    successBadge: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        marginTop: spacing.xl,
        paddingHorizontal: spacing.lg,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        borderRadius: radii.full,
        backgroundColor: colors.primaryDark,
    },

    successText: {
        color: colors.textInverse,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.bold,
    },

    pressed: {
        opacity: opacity.pressed,
    },
});