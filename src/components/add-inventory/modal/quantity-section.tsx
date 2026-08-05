import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

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

const UNITS = [
    "Pieces",
    "lbs",
    "kg",
    "Bottle",
    "Can",
    "Pack",
    "Bag",
    "Cup",
];

type QuantitySectionProps = {
    quantity: number;
    unit: string;
    unitsExpanded: boolean;
    onDecrease: () => void;
    onIncrease: () => void;
    onToggleUnits: () => void;
    onSelectUnit: (unit: string) => void;
};

export function QuantitySection({
    quantity,
    unit,
    unitsExpanded,
    onDecrease,
    onIncrease,
    onToggleUnits,
    onSelectUnit,
}: QuantitySectionProps) {
    const canDecrease = quantity > 1;

    return (
        <Animated.View
            entering={FadeInDown.duration(360)}
            style={styles.section}
        >
            <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Quantity</Text>
                <Text style={styles.sectionDescription}>
                    How much do you have?
                </Text>
            </View>

            <View style={styles.quantityCard}>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Decrease quantity"
                    accessibilityState={{ disabled: !canDecrease }}
                    disabled={!canDecrease}
                    onPress={onDecrease}
                    style={({ pressed }) => [
                        styles.quantityButton,
                        !canDecrease && styles.quantityButtonDisabled,
                        pressed && canDecrease && styles.pressed,
                    ]}
                >
                    <Ionicons
                        name="remove"
                        size={iconSizes.lg}
                        color={
                            canDecrease
                                ? colors.text
                                : colors.textMuted
                        }
                    />
                </Pressable>

                <View style={styles.quantityValueContainer}>
                    <Text style={styles.quantityValue}>
                        {quantity}
                    </Text>

                    <Text style={styles.quantityUnit}>
                        {unit}
                    </Text>
                </View>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Increase quantity"
                    onPress={onIncrease}
                    style={({ pressed }) => [
                        styles.quantityButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Ionicons
                        name="add"
                        size={iconSizes.lg}
                        color={colors.text}
                    />
                </Pressable>
            </View>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Choose quantity unit"
                accessibilityState={{ expanded: unitsExpanded }}
                onPress={onToggleUnits}
                style={({ pressed }) => [
                    styles.unitSelector,
                    pressed && styles.pressed,
                ]}
            >
                <View style={styles.unitSelectorLeft}>
                    <Ionicons
                        name="scale-outline"
                        size={iconSizes.sm}
                        color={colors.primary}
                    />

                    <Text style={styles.unitSelectorText}>
                        Unit
                    </Text>
                </View>

                <View style={styles.unitSelectorRight}>
                    <Text style={styles.selectedUnitText}>
                        {unit}
                    </Text>

                    <Ionicons
                        name={
                            unitsExpanded
                                ? "chevron-up"
                                : "chevron-down"
                        }
                        size={iconSizes.sm}
                        color={colors.textMuted}
                    />
                </View>
            </Pressable>

            {unitsExpanded ? (
                <UnitOptions
                    selectedUnit={unit}
                    onSelect={onSelectUnit}
                />
            ) : null}
        </Animated.View>
    );
}

type UnitOptionsProps = {
    selectedUnit: string;
    onSelect: (unit: string) => void;
};

function UnitOptions({
    selectedUnit,
    onSelect,
}: UnitOptionsProps) {
    return (
        <Animated.View
            entering={FadeInDown.duration(220)}
            style={styles.unitOptions}
        >
            {UNITS.map((unitOption) => {
                const selected = selectedUnit === unitOption;

                return (
                    <Pressable
                        key={unitOption}
                        accessibilityRole="button"
                        accessibilityLabel={`Select ${unitOption}`}
                        accessibilityState={{ selected }}
                        onPress={() => onSelect(unitOption)}
                        style={({ pressed }) => [
                            styles.unitChip,
                            selected && styles.unitChipSelected,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Text
                            style={[
                                styles.unitChipText,
                                selected &&
                                styles.unitChipTextSelected,
                            ]}
                        >
                            {unitOption}
                        </Text>

                        {selected ? (
                            <Ionicons
                                name="checkmark"
                                size={iconSizes.xs}
                                color={colors.textInverse}
                            />
                        ) : null}
                    </Pressable>
                );
            })}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: spacing["3xl"],
    },

    sectionHeading: {
        marginBottom: spacing.md,
    },

    sectionTitle: {
        color: colors.text,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.lg,
        fontWeight: fontWeights.extraBold,
    },

    sectionDescription: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
    },

    quantityCard: {
        minHeight: 88,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.xl,
        backgroundColor: colors.surface,
        ...shadows.small,
    },

    quantityButton: {
        width: 56,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.primaryLight,
        borderRadius: radii.full,
        backgroundColor: colors.backgroundMuted,
    },

    quantityButtonDisabled: {
        opacity: opacity.disabled,
    },

    quantityValueContainer: {
        alignItems: "center",
    },

    quantityValue: {
        color: colors.text,
        fontSize: fontSizes["3xl"],
        lineHeight: lineHeights["3xl"],
        fontWeight: fontWeights.extraBold,
    },

    quantityUnit: {
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.semibold,
    },

    unitSelector: {
        minHeight: 52,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        backgroundColor: colors.surfaceSoft,
    },

    unitSelectorLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    unitSelectorRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    unitSelectorText: {
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.semibold,
    },

    selectedUnitText: {
        color: colors.text,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.bold,
    },

    unitOptions: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
        marginTop: spacing.sm,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        backgroundColor: colors.surface,
    },

    unitChip: {
        minHeight: 38,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.full,
        backgroundColor: colors.surfaceSoft,
    },

    unitChipSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },

    unitChipText: {
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.semibold,
    },

    unitChipTextSelected: {
        color: colors.textInverse,
    },

    pressed: {
        opacity: opacity.pressed,
    },
});