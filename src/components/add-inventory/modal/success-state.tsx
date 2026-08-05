import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
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

type SuccessStateProps = {
    emoji: string;
};

export function SuccessState({
    emoji,
}: SuccessStateProps) {
    return (
        <Animated.View
            entering={FadeIn.duration(260)}
            style={styles.successContainer}
        >
            <Animated.View
                entering={FadeInDown.delay(100).duration(260)}
                style={styles.successFoodCard}
            >
                <Text style={styles.successFoodEmoji}>
                    {emoji}
                </Text>
            </Animated.View>

            <Ionicons
                name="arrow-down"
                size={iconSizes.lg}
                color={colors.primaryLight}
            />

            <Animated.View
                entering={FadeInDown.delay(260).duration(280)}
                style={styles.successFridgeIcon}
            >
                <Ionicons
                    name="snow-outline"
                    size={iconSizes.xl}
                    color={colors.textInverse}
                />
            </Animated.View>

            <Animated.View
                entering={FadeInDown.delay(430).duration(300)}
                style={styles.successBadge}
            >
                <Ionicons
                    name="checkmark-circle"
                    size={iconSizes.md}
                    color={colors.accent}
                />

                <Text style={styles.successText}>
                    Added to Kitchen
                </Text>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    successContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.lg,
        paddingHorizontal: spacing["3xl"],
    },

    successFoodCard: {
        width: 82,
        height: 82,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.xl,
        backgroundColor: colors.surface,
        ...shadows.medium,
    },

    successFoodEmoji: {
        fontSize: 44,
    },

    successFridgeIcon: {
        width: 94,
        height: 94,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.xl,
        backgroundColor: colors.primary,
        ...shadows.medium,
    },

    successBadge: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginTop: spacing.md,
        paddingHorizontal: spacing.lg,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        borderRadius: radii.full,
        backgroundColor: colors.primaryDark,
    },

    successText: {
        color: colors.textInverse,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.bold,
    },
});