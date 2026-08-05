import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

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

export type AddMethod = {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    badge?: string;
};

type ActionCardProps = {
    method: AddMethod;
    emphasized?: boolean;
    onPress: () => void;
};

export function ActionCard({
    method,
    emphasized = false,
    onPress,
}: ActionCardProps) {
    const scale = useSharedValue(1);
    const lift = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: lift.value,
            },
            {
                scale: scale.value,
            },
        ],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.985, {
            damping: 18,
            stiffness: 260,
        });

        lift.value = withSpring(-3, {
            damping: 18,
            stiffness: 260,
        });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 18,
            stiffness: 220,
        });

        lift.value = withSpring(0, {
            damping: 18,
            stiffness: 220,
        });
    };

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                accessibilityRole="button"
                accessibilityLabel={method.title}
                accessibilityHint={method.description}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[
                    styles.actionCard,
                    emphasized && styles.actionCardEmphasized,
                ]}
            >
                <View
                    style={[
                        styles.actionIcon,
                        emphasized && styles.actionIconEmphasized,
                    ]}
                >
                    <Ionicons
                        name={method.icon}
                        size={iconSizes.lg}
                        color={
                            emphasized
                                ? colors.textInverse
                                : colors.primaryDark
                        }
                    />
                </View>

                <View style={styles.actionCopy}>
                    <View style={styles.actionTitleRow}>
                        <Text
                            numberOfLines={1}
                            style={styles.actionTitle}
                        >
                            {method.title}
                        </Text>

                        {method.badge ? (
                            <View style={styles.methodBadge}>
                                <Text style={styles.methodBadgeText}>
                                    {method.badge}
                                </Text>
                            </View>
                        ) : null}
                    </View>

                    <Text
                        numberOfLines={2}
                        style={styles.actionDescription}
                    >
                        {method.description}
                    </Text>
                </View>

                <View style={styles.actionArrow}>
                    <Ionicons
                        name="chevron-forward"
                        size={iconSizes.sm}
                        color={colors.primaryDark}
                    />
                </View>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    actionCard: {
        minHeight: 112,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.lg,
        padding: spacing.lg,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        ...shadows.small,
    },

    actionCardEmphasized: {
        borderColor: colors.primaryLight,
        backgroundColor: colors.surfaceSoft,
    },

    actionIcon: {
        width: 64,
        height: 64,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.xl,
        borderWidth: 3,
        borderColor: colors.primaryLight,
        backgroundColor: colors.accent,
        transform: [{ rotate: "-4deg" }],
        ...shadows.small,
    },

    actionIconEmphasized: {
        borderColor: colors.primaryLight,
        backgroundColor: colors.primary,
    },

    actionCopy: {
        minWidth: 0,
        flex: 1,
        gap: spacing.xs,
    },

    actionTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: spacing.sm,
    },

    actionTitle: {
        flexShrink: 1,
        color: colors.text,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.lg,
        fontWeight: fontWeights.bold,
    },

    actionDescription: {
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.regular,
    },

    methodBadge: {
        minHeight: 28,
        justifyContent: "center",
        paddingHorizontal: spacing.sm,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.accentLight,
        backgroundColor: colors.accent,
    },

    methodBadgeText: {
        color: colors.text,
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.bold,
    },

    actionArrow: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.backgroundMuted,
    },
});