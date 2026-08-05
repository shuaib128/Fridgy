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
import { StorageId } from "../add-manually-modal";


const STORAGE_OPTIONS: {
    id: StorageId;
    label: string;
    emoji: string;
}[] = [
        {
            id: "fridge",
            label: "Fridge",
            emoji: "🧊",
        },
        {
            id: "freezer",
            label: "Freezer",
            emoji: "❄️",
        },
        {
            id: "pantry",
            label: "Pantry",
            emoji: "🏠",
        },
    ];

type StorageSectionProps = {
    selectedStorage: StorageId;
    onSelect: (storage: StorageId) => void;
};

export function StorageSection({
    selectedStorage,
    onSelect,
}: StorageSectionProps) {
    return (
        <Animated.View
            entering={FadeInDown.duration(360)}
            style={styles.section}
        >
            <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>
                    Where will you keep it?
                </Text>

                <Text style={styles.sectionDescription}>
                    Choose its kitchen location.
                </Text>
            </View>

            <View style={styles.storageContainer}>
                {STORAGE_OPTIONS.map((option) => {
                    const selected =
                        selectedStorage === option.id;

                    return (
                        <Pressable
                            key={option.id}
                            accessibilityRole="button"
                            accessibilityLabel={`Store in ${option.label}`}
                            accessibilityState={{ selected }}
                            onPress={() => onSelect(option.id)}
                            style={({ pressed }) => [
                                styles.storageOption,
                                selected &&
                                styles.storageOptionSelected,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.storageEmoji}>
                                {option.emoji}
                            </Text>

                            <Text
                                style={[
                                    styles.storageLabel,
                                    selected &&
                                    styles.storageLabelSelected,
                                ]}
                            >
                                {option.label}
                            </Text>

                            {selected ? (
                                <Ionicons
                                    name="checkmark-circle"
                                    size={iconSizes.sm}
                                    color={colors.accent}
                                />
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

    storageContainer: {
        flexDirection: "row",
        gap: spacing.sm,
    },

    storageOption: {
        minHeight: 104,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xs,
        padding: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.xl,
        backgroundColor: colors.surface,
    },

    storageOptionSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
        ...shadows.small,
    },

    storageEmoji: {
        fontSize: fontSizes["2xl"],
    },

    storageLabel: {
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.bold,
    },

    storageLabelSelected: {
        color: colors.textInverse,
    },

    pressed: {
        opacity: opacity.pressed,
    },
});