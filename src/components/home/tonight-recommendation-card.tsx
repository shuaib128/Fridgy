import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, {
    Easing,
    FadeInDown,
    FadeInUp,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
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

type IoniconName =
    React.ComponentProps<typeof Ionicons>["name"];

export type TonightRecommendation = {
    icon?: IoniconName;
    recipeName: string;
    matchPercentage: number;
    duration: string;
    ingredients: string[];
    buttonLabel?: string;
};

type TonightRecommendationCardProps = {
    recommendation: TonightRecommendation;
    onCookNow?: (
        recommendation: TonightRecommendation,
    ) => void;
};

export function TonightRecommendationCard({
    recommendation,
    onCookNow,
}: TonightRecommendationCardProps) {
    const cardProgress = useSharedValue(0);
    const iconMovement = useSharedValue(0);
    const buttonScale = useSharedValue(1);

    useEffect(() => {
        cardProgress.value = withTiming(1, {
            duration: 480,
            easing: Easing.out(Easing.cubic),
        });

        iconMovement.value = withDelay(
            700,
            withRepeat(
                withSequence(
                    withTiming(1, {
                        duration: 1800,
                        easing: Easing.inOut(
                            Easing.cubic,
                        ),
                    }),
                    withTiming(0, {
                        duration: 1800,
                        easing: Easing.inOut(
                            Easing.cubic,
                        ),
                    }),
                ),
                -1,
                false,
            ),
        );
    }, [
        cardProgress,
        iconMovement,
    ]);

    const cardAnimatedStyle = useAnimatedStyle(
        () => ({
            opacity: cardProgress.value,
            transform: [
                {
                    translateY: interpolate(
                        cardProgress.value,
                        [0, 1],
                        [20, 0],
                    ),
                },
                {
                    scale: interpolate(
                        cardProgress.value,
                        [0, 1],
                        [0.98, 1],
                    ),
                },
            ],
        }),
    );

    const iconAnimatedStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    translateY: interpolate(
                        iconMovement.value,
                        [0, 1],
                        [0, -4],
                    ),
                },
                {
                    rotate: `${interpolate(
                        iconMovement.value,
                        [0, 1],
                        [-4, 1],
                    )}deg`,
                },
            ],
        }),
    );

    const buttonAnimatedStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    scale: buttonScale.value,
                },
            ],
        }),
    );

    function handlePressIn() {
        buttonScale.value = withTiming(0.97, {
            duration: 90,
            easing: Easing.out(Easing.quad),
        });
    }

    function handlePressOut() {
        buttonScale.value = withTiming(1, {
            duration: 150,
            easing: Easing.out(Easing.cubic),
        });
    }

    function handleCookNow() {
        onCookNow?.(recommendation);
    }

    return (
        <Animated.View
            style={[
                styles.card,
                cardAnimatedStyle,
            ]}
        >
            <View style={styles.topRow}>
                <Animated.View
                    style={[
                        styles.iconBadge,
                        iconAnimatedStyle,
                    ]}
                >
                    <Ionicons
                        name={
                            recommendation.icon ??
                            "restaurant-outline"
                        }
                        size={iconSizes.xl}
                        color={colors.primaryDark}
                    />
                </Animated.View>

                <Animated.View
                    entering={FadeInUp
                        .delay(140)
                        .duration(380)
                        .easing(
                            Easing.out(
                                Easing.cubic,
                            ),
                        )}
                    style={styles.matchBadge}
                >
                    <Ionicons
                        name="sparkles"
                        size={iconSizes.xs}
                        color={colors.primaryDark}
                    />

                    <Text style={styles.matchText}>
                        {
                            recommendation.matchPercentage
                        }
                        % Match
                    </Text>
                </Animated.View>
            </View>

            <Animated.View
                entering={FadeInDown
                    .delay(200)
                    .duration(400)
                    .easing(
                        Easing.out(Easing.cubic),
                    )}
            >
                <Text style={styles.eyebrow}>
                    TONIGHT&apos;S RECOMMENDATION
                </Text>

                <Text style={styles.recipeName}>
                    {recommendation.recipeName}
                </Text>
            </Animated.View>

            <Animated.View
                entering={FadeInDown
                    .delay(300)
                    .duration(400)
                    .easing(
                        Easing.out(Easing.cubic),
                    )}
                style={styles.detailsContainer}
            >
                <Text style={styles.usesLabel}>
                    Uses what you already have
                </Text>

                <View style={styles.ingredients}>
                    {recommendation.ingredients.map(
                        (ingredient) => (
                            <View
                                key={ingredient}
                                style={
                                    styles.ingredientRow
                                }
                            >
                                <View
                                    style={
                                        styles.checkIcon
                                    }
                                >
                                    <Ionicons
                                        name="checkmark"
                                        size={
                                            iconSizes.xs
                                        }
                                        color={
                                            colors
                                                .primaryDark
                                        }
                                    />
                                </View>

                                <Text
                                    style={
                                        styles.ingredientText
                                    }
                                >
                                    {ingredient}
                                </Text>
                            </View>
                        ),
                    )}
                </View>
            </Animated.View>

            <Animated.View
                entering={FadeInDown
                    .delay(400)
                    .duration(400)
                    .easing(
                        Easing.out(Easing.cubic),
                    )}
                style={styles.bottomRow}
            >
                <View style={styles.durationBadge}>
                    <Ionicons
                        name="time-outline"
                        size={iconSizes.sm}
                        color={colors.textInverse}
                    />

                    <Text style={styles.durationText}>
                        {recommendation.duration}
                    </Text>
                </View>

                <Animated.View
                    style={buttonAnimatedStyle}
                >
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={
                            recommendation.buttonLabel ??
                            `Cook ${recommendation.recipeName}`
                        }
                        onPress={handleCookNow}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        style={styles.addButton}
                    >
                        <View
                            style={
                                styles.addButtonIcon
                            }
                        >
                            <Ionicons
                                name="restaurant-outline"
                                size={iconSizes.sm}
                                color={
                                    colors.primaryDark
                                }
                            />
                        </View>

                        <Text
                            style={
                                styles.addButtonText
                            }
                        >
                            {recommendation.buttonLabel ??
                                "Cook now"}
                        </Text>

                        <Ionicons
                            name="arrow-forward"
                            size={iconSizes.sm}
                            color={colors.primaryDark}
                        />
                    </Pressable>
                </Animated.View>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        overflow: "hidden",
        padding: spacing.xl,
        borderRadius: radii["2xl"],
        borderWidth: 1,
        borderColor: colors.primaryDark,
        backgroundColor: colors.primary,
        ...shadows.large,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: spacing.md,
        marginBottom: spacing.xl,
    },

    iconBadge: {
        width: 72,
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.accent,
        borderRadius: radii.xl,
        borderWidth: 4,
        borderColor: colors.primaryLight,
        transform: [
            {
                rotate: "-4deg",
            },
        ],
        ...shadows.small,
    },

    matchBadge: {
        minHeight: 36,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.accentLight,
        backgroundColor: colors.accent,
    },

    matchText: {
        color: colors.primaryDark,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.extraBold,
    },

    eyebrow: {
        marginBottom: spacing.sm,
        color: colors.accentLight,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.extraBold,
        letterSpacing: 1.4,
    },

    recipeName: {
        maxWidth: 310,
        color: colors.textInverse,
        fontSize: fontSizes["2xl"],
        lineHeight: lineHeights["2xl"],
        fontWeight: fontWeights.extraBold,
    },

    detailsContainer: {
        marginTop: spacing.xl,
        padding: spacing.lg,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        backgroundColor: colors.primaryDark,
    },

    usesLabel: {
        marginBottom: spacing.md,
        color: colors.accentLight,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
        letterSpacing: 0.7,
        textTransform: "uppercase",
    },

    ingredients: {
        gap: spacing.sm,
    },

    ingredientRow: {
        minHeight: 30,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },

    checkIcon: {
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accent,
    },

    ingredientText: {
        flex: 1,
        color: colors.textInverse,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.semibold,
    },

    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: spacing.md,
        marginTop: spacing.lg,
    },

    durationBadge: {
        minHeight: 42,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        backgroundColor: colors.primaryDark,
    },

    durationText: {
        color: colors.textInverse,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.bold,
    },

    addButton: {
        minHeight: 46,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.accentLight,
        backgroundColor: colors.accent,
        ...shadows.small,
    },

    addButtonIcon: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
    },

    addButtonText: {
        color: colors.primaryDark,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.bold,
    },
});