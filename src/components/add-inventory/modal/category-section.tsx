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
    spacing,
} from "@/styles/theme";
import { CategoryID } from "@/types/inventory-item";
import { CATEGORIES } from "../add-manually-modal";

type CategorySectionProps = {
    selectedCategory: CategoryID;
    onSelect: (category: CategoryID) => void;
};

export function CategorySection({
    selectedCategory,
    onSelect,
}: CategorySectionProps) {
    return (
        <Animated.View
            entering={FadeInDown.duration(360)}
            style={styles.section}
        >
            <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Category</Text>

                <Text style={styles.sectionDescription}>
                    What kind of food is it?
                </Text>
            </View>

            <View style={styles.chipContainer}>
                {CATEGORIES.map((option) => {
                    const selected =
                        selectedCategory === option.id;

                    return (
                        <Pressable
                            key={option.id}
                            accessibilityRole="button"
                            accessibilityLabel={`Select ${option.label}`}
                            accessibilityState={{ selected }}
                            onPress={() => onSelect(option.id)}
                            style={({ pressed }) => [
                                styles.categoryChip,
                                selected &&
                                styles.categoryChipSelected,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.categoryEmoji}>
                                {option.emoji}
                            </Text>

                            <Text
                                style={[
                                    styles.categoryChipText,
                                    selected &&
                                    styles.categoryChipTextSelected,
                                ]}
                            >
                                {option.label}
                            </Text>

                            {selected ? (
                                <View style={styles.selectedCheck}>
                                    <Ionicons
                                        name="checkmark"
                                        size={iconSizes.xs}
                                        color={colors.primaryDark}
                                    />
                                </View>
                            ) : null}
                        </Pressable>
                    );
                })}
            </View>
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

    chipContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
    },

    categoryChip: {
        minHeight: 46,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.full,
        backgroundColor: colors.surface,
    },

    categoryChipSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },

    categoryEmoji: {
        fontSize: fontSizes.lg,
    },

    categoryChipText: {
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.bold,
    },

    categoryChipTextSelected: {
        color: colors.textInverse,
    },

    selectedCheck: {
        width: 18,
        height: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accent,
    },

    pressed: {
        opacity: opacity.pressed,
    },
});