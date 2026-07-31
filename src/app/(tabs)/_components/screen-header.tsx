import { Ionicons } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    colors,
    fontSizes,
    fontWeights,
    iconSizes,
    lineHeights,
    radii,
    shadows,
    spacing,
} from "@/styles/theme";

type IconName = React.ComponentProps<
    typeof Ionicons
>["name"];

type PageHeaderProps = {
    eyebrow: string;
    title: string;
    description: string;
    icon: IconName;
    accessibilityLabel: string;
    onPress?: () => void;
    badgeCount?: number;
};

export function PageHeader({
    eyebrow,
    title,
    description,
    icon,
    accessibilityLabel,
    onPress,
    badgeCount = 0,
}: PageHeaderProps) {
    return (
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <Text style={styles.eyebrow}>
                    {eyebrow}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.description}>
                    {description}
                </Text>
            </View>

            <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                    accessibilityLabel
                }
                onPress={onPress}
                style={({ pressed }) => [
                    styles.iconButton,
                    pressed && styles.pressed,
                ]}
            >
                <Ionicons
                    name={icon}
                    size={iconSizes.lg}
                    color={colors.primaryDark}
                />

                {badgeCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {badgeCount > 99
                                ? "99+"
                                : badgeCount}
                        </Text>
                    </View>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: spacing.lg,
        marginBottom: spacing.xl,
    },

    headerContent: {
        flex: 1,
        minWidth: 0,
    },

    eyebrow: {
        marginBottom: spacing.xs,
        color: colors.primary,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
        letterSpacing: 1.4,
    },

    title: {
        color: colors.text,
        fontSize: fontSizes["3xl"],
        lineHeight: lineHeights["3xl"],
        fontWeight: fontWeights.extraBold,
    },

    description: {
        maxWidth: 280,
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.regular,
    },

    iconButton: {
        position: "relative",
        width: 54,
        height: 54,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        ...shadows.medium,
    },

    badge: {
        position: "absolute",
        top: -5,
        right: -5,
        minWidth: 22,
        height: 22,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.xs,
        borderRadius: radii.full,
        borderWidth: 2,
        borderColor: colors.background,
        backgroundColor: colors.accent,
    },

    badgeText: {
        color: colors.primaryDark,
        fontSize: 10,
        lineHeight: 14,
        fontWeight: fontWeights.extraBold,
    },

    pressed: {
        opacity: 0.8,
        transform: [
            {
                scale: 0.98,
            },
        ],
    },
});