import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, {
    FadeIn,
    FadeInDown,
} from "react-native-reanimated";

import {
    colors,
    fontSizes,
    fontWeights,
    iconSizes,
    radii,
    shadows,
    spacing,
} from "@/styles/theme";

type FoodNameSectionProps = {
    foodName: string;
    foodEmoji: string;
    onChangeFoodName: (name: string) => void;
    onClear: () => void;
};

export function FoodNameSection({
    foodName,
    foodEmoji,
    onChangeFoodName,
    onClear,
}: FoodNameSectionProps) {
    return (
        <Animated.View
            entering={FadeInDown.delay(80).duration(360)}
            style={styles.heroSection}
        >
            <Animated.View
                key={foodEmoji}
                entering={FadeIn.duration(220)}
                style={styles.foodIconBadge}
            >
                <Text style={styles.foodEmoji}>{foodEmoji}</Text>
            </Animated.View>

            <View style={styles.foodInputContainer}>
                <Text style={styles.inputLabel}>Food name</Text>

                <TextInput
                    value={foodName}
                    onChangeText={onChangeFoodName}
                    placeholder="What are you adding?"
                    placeholderTextColor={colors.textMuted}
                    cursorColor={colors.primary}
                    autoCapitalize="words"
                    returnKeyType="done"
                    style={styles.foodInput}
                />

                {foodName.length > 0 ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Clear food name"
                        hitSlop={spacing.sm}
                        onPress={onClear}
                        style={({ pressed }) => [
                            styles.clearInputButton,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Ionicons
                            name="close-circle"
                            size={iconSizes.md}
                            color={colors.textMuted}
                        />
                    </Pressable>
                ) : null}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    heroSection: {
        alignItems: "center",
    },

    foodIconBadge: {
        width: 86,
        height: 86,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
        borderRadius: radii.xl,
        borderWidth: 4,
        borderColor: colors.primaryLight,
        backgroundColor: colors.accent,
        transform: [{ rotate: "-4deg" }],
        ...shadows.medium,
    },

    foodEmoji: {
        fontSize: 46,
    },

    foodInputContainer: {
        position: "relative",
        width: "100%",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        borderWidth: 2,
        borderColor: colors.primaryLight,
        borderRadius: radii.xl,
        backgroundColor: colors.surface,
        ...shadows.small,
    },

    inputLabel: {
        color: colors.primary,
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.bold,
        textTransform: "uppercase",
        letterSpacing: 0.7,
    },

    foodInput: {
        height: 58,
        paddingRight: spacing["3xl"],
        color: colors.text,
        fontSize: fontSizes.xl,
        fontWeight: fontWeights.bold,
    },

    clearInputButton: {
        position: "absolute",
        right: spacing.lg,
        bottom: 17,
    },

    pressed: {
        opacity: 0.7,
    },
});