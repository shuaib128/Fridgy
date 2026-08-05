import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import {
    colors,
    fontSizes,
    fontWeights,
    iconSizes,
    opacity,
    radii,
    spacing,
} from "@/styles/theme";

type SmartExpirationSuggestionProps = {
    days: number | null;
    onApply: () => void;
};

export function SmartExpirationSuggestion({
    days,
    onApply,
}: SmartExpirationSuggestionProps) {
    if (days === null) {
        return null;
    }

    return (
        <Animated.View
            entering={FadeInDown.duration(320)}
            style={styles.smartSuggestion}
        >
            <View style={styles.smartSuggestionIcon}>
                <Ionicons
                    name="sparkles"
                    size={iconSizes.md}
                    color={colors.accentDark}
                />
            </View>

            <View style={styles.smartSuggestionContent}>
                <Text style={styles.smartSuggestionEyebrow}>
                    Usually lasts
                </Text>

                <Text style={styles.smartSuggestionTitle}>
                    {days} {days === 1 ? "day" : "days"}
                </Text>
            </View>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Use ${days} ${days === 1 ? "day" : "days"
                    } as expiration`}
                onPress={onApply}
                style={({ pressed }) => [
                    styles.useSuggestionButton,
                    pressed && styles.pressed,
                ]}
            >
                <Text style={styles.useSuggestionText}>
                    Use this
                </Text>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    smartSuggestion: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        marginTop: spacing.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.accentLight,
        borderRadius: radii.lg,
        backgroundColor: colors.backgroundMuted,
    },

    smartSuggestionIcon: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
    },

    smartSuggestionContent: {
        flex: 1,
    },

    smartSuggestionEyebrow: {
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.semibold,
    },

    smartSuggestionTitle: {
        marginTop: 2,
        color: colors.text,
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.extraBold,
    },

    useSuggestionButton: {
        minHeight: 36,
        justifyContent: "center",
        paddingHorizontal: spacing.md,
        borderRadius: radii.full,
        backgroundColor: colors.primary,
    },

    useSuggestionText: {
        color: colors.textInverse,
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.bold,
    },

    pressed: {
        opacity: opacity.pressed,
    },
});