import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ModalHeaderProps = {
    onClose: () => void;
};

export function ModalHeader({ onClose }: ModalHeaderProps) {
    return (
        <View style={styles.header}>
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                hitSlop={theme.spacing.md}
                onPress={onClose}
                style={({ pressed }) => [
                    styles.closeButton,
                    pressed && styles.pressed,
                ]}
            >
                <Ionicons
                    name="close"
                    size={theme.iconSizes.md}
                    color={theme.colors.text}
                />
            </Pressable>

            <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Add Manually</Text>
                <Text style={styles.headerDescription}>
                    Add one ingredient to your kitchen.
                </Text>
            </View>

            <View style={styles.headerSpacer} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },


    closeButton: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        ...theme.shadows.small,
    },

    pressed: {
        opacity: theme.opacity.pressed,
    },

    headerText: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: theme.spacing.md,
    },

    headerTitle: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.extraBold,
    },

    headerDescription: {
        marginTop: theme.spacing.xs,
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
        textAlign: "center",
    },

    headerSpacer: {
        width: 42,
    },
})