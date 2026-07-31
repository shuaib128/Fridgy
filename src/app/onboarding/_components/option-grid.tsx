import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { theme } from "@/styles/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

export type Option = {
    label: string;
    icon: IconName;
};

type OptionGridProps = {
    options: Option[];
    selectedValues: string[];
    onToggle: (value: string) => void;
};

export function OptionGrid({
    options,
    selectedValues,
    onToggle,
}: OptionGridProps) {
    return (
        <View style={styles.optionGrid}>
            {options.map((option, index) => {
                const selected = selectedValues.includes(
                    option.label,
                );

                return (
                    <Pressable
                        key={option.label}
                        onPress={() =>
                            onToggle(option.label)
                        }
                        style={({ pressed }) => [
                            styles.option,
                            index % 3 === 1 &&
                            styles.optionAccent,
                            selected &&
                            styles.optionSelected,
                            pressed &&
                            styles.optionPressed,
                        ]}
                    >
                        <View
                            style={[
                                styles.optionIcon,
                                selected &&
                                styles.optionIconSelected,
                            ]}
                        >
                            <Ionicons
                                name={
                                    selected
                                        ? "checkmark"
                                        : option.icon
                                }
                                size={theme.iconSizes.sm}
                                color={
                                    selected
                                        ? theme.colors
                                            .primaryDark
                                        : theme.colors
                                            .textSecondary
                                }
                            />
                        </View>

                        <Text
                            style={[
                                styles.optionText,
                                selected &&
                                styles.optionTextSelected,
                            ]}
                        >
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    optionGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.sm,
    },

    option: {
        minHeight:
            theme.componentSizes.compactButtonHeight,
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.sm,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.lg,
        backgroundColor: theme.colors.surfaceSoft,
        ...theme.shadows.small,
    },

    optionAccent: {
        backgroundColor: theme.colors.accentLight,
        borderColor: theme.colors.accent,
    },

    optionSelected: {
        borderColor: theme.colors.primaryDark,
        backgroundColor: theme.colors.primary,
    },

    optionPressed: {
        opacity: theme.opacity.pressed,
        transform: [{ scale: 0.97 }],
    },

    optionIcon: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.radii.full,
        backgroundColor: theme.colors.surface,
    },

    optionIconSelected: {
        backgroundColor: theme.colors.accent,
    },

    optionText: {
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.textSecondary,
    },

    optionTextSelected: {
        color: theme.colors.textInverse,
    },
});