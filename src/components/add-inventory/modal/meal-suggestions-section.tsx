import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import {
    colors,
    fontSizes,
    fontWeights,
    lineHeights,
    radii,
    spacing,
} from "@/styles/theme";

const MEAL_EMOJIS = ["🍝", "🥗", "🍛"];

type MealSuggestionsSectionProps = {
    meals: string[];
};

export function MealSuggestionsSection({
    meals,
}: MealSuggestionsSectionProps) {
    if (meals.length === 0) {
        return null;
    }

    return (
        <Animated.View
            entering={FadeInDown.duration(360)}
            style={styles.section}
        >
            <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>
                    Commonly used in
                </Text>

                <Text style={styles.sectionDescription}>
                    Ideas based on this ingredient.
                </Text>
            </View>

            <View style={styles.mealSuggestions}>
                {meals.map((meal, index) => {
                    const isLastMeal = index === meals.length - 1;

                    return (
                        <View
                            key={`${meal}-${index}`}
                            style={[
                                styles.mealSuggestion,
                                isLastMeal &&
                                styles.mealSuggestionLast,
                            ]}
                        >
                            <View style={styles.mealIcon}>
                                <Text style={styles.mealEmoji}>
                                    {MEAL_EMOJIS[index] ?? "🍽️"}
                                </Text>
                            </View>

                            <Text
                                numberOfLines={1}
                                style={styles.mealName}
                            >
                                {meal}
                            </Text>
                        </View>
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

    mealSuggestions: {
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.xl,
        backgroundColor: colors.surface,
    },

    mealSuggestion: {
        minHeight: 58,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    mealSuggestionLast: {
        borderBottomWidth: 0,
    },

    mealIcon: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.md,
        backgroundColor: colors.backgroundMuted,
    },

    mealEmoji: {
        fontSize: fontSizes.md,
    },

    mealName: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.semibold,
    },
});