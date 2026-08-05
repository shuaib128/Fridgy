import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import {
    colors,
    fontSizes,
    fontWeights,
    iconSizes,
    opacity,
    radii,
    shadows,
    spacing,
} from "@/styles/theme";
import { FoodSuggestion } from "../add-manually-modal";

type FoodSuggestionsProps = {
    suggestions: FoodSuggestion[];
    hidden: boolean;
    onSelect: (suggestion: FoodSuggestion) => void;
};

export function FoodSuggestions({
    suggestions,
    hidden,
    onSelect,
}: FoodSuggestionsProps) {
    if (hidden || suggestions.length === 0) {
        return null;
    }

    return (
        <Animated.View
            entering={FadeInDown.duration(280)}
            style={styles.suggestionsCard}
        >
            <Text style={styles.suggestionsLabel}>Suggestions</Text>

            {suggestions.map((suggestion, index) => {
                const isLastSuggestion =
                    index === suggestions.length - 1;

                return (
                    <Pressable
                        key={suggestion.name}
                        accessibilityRole="button"
                        accessibilityLabel={`Select ${suggestion.name}`}
                        onPress={() => onSelect(suggestion)}
                        style={({ pressed }) => [
                            styles.suggestionRow,
                            !isLastSuggestion &&
                            styles.suggestionBorder,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Text style={styles.suggestionEmoji}>
                            {suggestion.emoji}
                        </Text>

                        <Text
                            numberOfLines={1}
                            style={styles.suggestionName}
                        >
                            {suggestion.name}
                        </Text>

                        <Ionicons
                            name="arrow-forward"
                            size={iconSizes.sm}
                            color={colors.primary}
                        />
                    </Pressable>
                );
            })}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    suggestionsCard: {
        overflow: "hidden",
        marginTop: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        backgroundColor: colors.surface,
        ...shadows.small,
    },

    suggestionsLabel: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.bold,
        textTransform: "uppercase",
        letterSpacing: 0.8,
    },

    suggestionRow: {
        minHeight: 54,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
    },

    suggestionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    suggestionEmoji: {
        fontSize: fontSizes.xl,
    },

    suggestionName: {
        flex: 1,
        color: colors.text,
        fontSize: fontSizes.md,
        fontWeight: fontWeights.semibold,
    },

    pressed: {
        opacity: opacity.pressed,
    },
});