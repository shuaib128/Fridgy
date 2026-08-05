import { Ionicons } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
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

type NotesSectionProps = {
    notes: string;
    expanded: boolean;
    onChangeNotes: (notes: string) => void;
    onToggle: () => void;
};

export function NotesSection({
    notes,
    expanded,
    onChangeNotes,
    onToggle,
}: NotesSectionProps) {
    return (
        <View style={styles.notesSection}>
            <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                    expanded ? "Hide notes" : "Add notes"
                }
                accessibilityState={{ expanded }}
                onPress={onToggle}
                style={({ pressed }) => [
                    styles.notesHeader,
                    pressed && styles.pressed,
                ]}
            >
                <View>
                    <Text style={styles.sectionTitle}>
                        Notes
                    </Text>

                    <Text style={styles.sectionDescription}>
                        Optional
                    </Text>
                </View>

                <Ionicons
                    name={
                        expanded
                            ? "chevron-up"
                            : "chevron-down"
                    }
                    size={iconSizes.md}
                    color={colors.textMuted}
                />
            </Pressable>

            {expanded ? (
                <Animated.View
                    entering={FadeInDown.duration(220)}
                >
                    <TextInput
                        value={notes}
                        onChangeText={onChangeNotes}
                        placeholder="Brand, ripeness, meal plans..."
                        placeholderTextColor={colors.textMuted}
                        cursorColor={colors.primary}
                        multiline
                        textAlignVertical="top"
                        maxLength={300}
                        style={styles.notesInput}
                    />
                </Animated.View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    notesSection: {
        marginTop: spacing["3xl"],
    },

    notesHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: spacing.sm,
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

    notesInput: {
        minHeight: 96,
        marginTop: spacing.sm,
        padding: spacing.lg,
        color: colors.text,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        backgroundColor: colors.surface,
    },

    pressed: {
        opacity: opacity.pressed,
    },
});