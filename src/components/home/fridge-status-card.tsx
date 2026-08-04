import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, {
    Easing,
    FadeInLeft,
    FadeInRight,
    FadeOutLeft,
    FadeOutRight,
    interpolate,
    LinearTransition,
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

export type DailyFridgeInsight = {
    icon: IoniconName;
    status: string;
    headline: string;
    description: string;
    recipeName: string;
    duration: string;
    matchPercentage: number;
    buttonLabel?: string;
};

type FridgeStatusCardProps = {
    insights?: DailyFridgeInsight[];
    autoRotateInterval?: number;
    onStartCooking?: (
        insight: DailyFridgeInsight,
    ) => void;
};

const DEFAULT_INSIGHTS: DailyFridgeInsight[] = [
    {
        icon: "restaurant-outline",
        status: "Use soon",
        headline: "Your chicken expires tomorrow.",
        description:
            "You already have everything needed for",
        recipeName: "Creamy Garlic Chicken Pasta",
        duration: "28 min",
        matchPercentage: 98,
        buttonLabel: "Start cooking",
    },
    {
        icon: "leaf-outline",
        status: "Fresh pick",
        headline: "Your spinach is at its best today.",
        description:
            "Use it while it is fresh in a quick",
        recipeName: "Spinach and Feta Omelet",
        duration: "15 min",
        matchPercentage: 94,
        buttonLabel: "View recipe",
    },
    {
        icon: "cart-outline",
        status: "Running low",
        headline: "You only have one serving of rice left.",
        description:
            "Add it to your next shopping trip after making",
        recipeName: "One-Pan Veggie Fried Rice",
        duration: "22 min",
        matchPercentage: 91,
        buttonLabel: "Cook this meal",
    },
];

const CARD_ANIMATION_DURATION = 450;
const CONTENT_ANIMATION_DURATION = 420;
const DEFAULT_ROTATION_INTERVAL = 6500;

export function FridgeStatusCard({
    insights = DEFAULT_INSIGHTS,
    autoRotateInterval = DEFAULT_ROTATION_INTERVAL,
    onStartCooking,
}: FridgeStatusCardProps) {
    const safeInsights = useMemo(
        () =>
            insights.length > 0
                ? insights
                : DEFAULT_INSIGHTS,
        [insights],
    );

    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<
        1 | -1
    >(1);

    const cardProgress = useSharedValue(0);
    const iconMovement = useSharedValue(0);
    const buttonScale = useSharedValue(1);

    const activeInsight = safeInsights[activeIndex];
    const hasMultipleInsights = safeInsights.length > 1;

    useEffect(() => {
        if (activeIndex >= safeInsights.length) {
            setActiveIndex(0);
        }
    }, [activeIndex, safeInsights.length]);

    useEffect(() => {
        cardProgress.value = withTiming(1, {
            duration: CARD_ANIMATION_DURATION,
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
    }, [cardProgress, iconMovement]);

    useEffect(() => {
        if (
            !hasMultipleInsights ||
            autoRotateInterval <= 0
        ) {
            return;
        }

        const interval = setInterval(() => {
            setDirection(1);
            setActiveIndex(
                (currentIndex) =>
                    (currentIndex + 1) %
                    safeInsights.length,
            );
        }, autoRotateInterval);

        return () => clearInterval(interval);
    }, [
        activeIndex,
        autoRotateInterval,
        hasMultipleInsights,
        safeInsights.length,
    ]);

    const cardAnimatedStyle = useAnimatedStyle(
        () => ({
            opacity: cardProgress.value,
            transform: [
                {
                    translateY: interpolate(
                        cardProgress.value,
                        [0, 1],
                        [18, 0],
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

    const enteringAnimation =
        direction === 1
            ? FadeInRight
            : FadeInLeft;

    const exitingAnimation =
        direction === 1
            ? FadeOutLeft
            : FadeOutRight;

    function showPreviousInsight() {
        setDirection(-1);
        setActiveIndex(
            (currentIndex) =>
                (currentIndex -
                    1 +
                    safeInsights.length) %
                safeInsights.length,
        );
    }

    function showNextInsight() {
        setDirection(1);
        setActiveIndex(
            (currentIndex) =>
                (currentIndex + 1) %
                safeInsights.length,
        );
    }

    function showInsight(index: number) {
        if (index === activeIndex) {
            return;
        }

        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    }

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

    return (
        <Animated.View
            style={[
                styles.fridgeCard,
                cardAnimatedStyle,
            ]}
        >
            <Animated.View
                key={activeIndex}
                entering={enteringAnimation
                    .duration(
                        CONTENT_ANIMATION_DURATION,
                    )
                    .easing(
                        Easing.out(Easing.cubic),
                    )}
                exiting={exitingAnimation
                    .duration(260)
                    .easing(
                        Easing.in(Easing.cubic),
                    )}
                layout={LinearTransition.duration(300)}
            >
                <View style={styles.cardTopRow}>
                    <Animated.View
                        style={[
                            styles.iconBadge,
                            iconAnimatedStyle,
                        ]}
                    >
                        <Ionicons
                            name={activeInsight.icon}
                            size={iconSizes.xl}
                            color={colors.primaryDark}
                        />
                    </Animated.View>

                    <View style={styles.statusBadge}>
                        <View
                            style={styles.statusDot}
                        />

                        <Text
                            style={styles.statusText}
                        >
                            {activeInsight.status}
                        </Text>
                    </View>
                </View>

                <Text style={styles.eyebrow}>
                    AI DAILY INSIGHTS
                </Text>

                <Text style={styles.cardTitle}>
                    {activeInsight.headline}
                </Text>

                <Text style={styles.cardDescription}>
                    {activeInsight.description}
                </Text>

                <Text style={styles.recipeName}>
                    {activeInsight.recipeName}.
                </Text>

                <View style={styles.recipeMetaRow}>
                    <View style={styles.recipeMeta}>
                        <Ionicons
                            name="time-outline"
                            size={iconSizes.sm}
                            color={colors.textInverse}
                        />

                        <Text
                            style={
                                styles.recipeMetaText
                            }
                        >
                            {activeInsight.duration}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.recipeMeta,
                            styles.matchBadge,
                        ]}
                    >
                        <Ionicons
                            name="sparkles"
                            size={iconSizes.xs}
                            color={colors.primaryDark}
                        />

                        <Text style={styles.matchText}>
                            {
                                activeInsight.matchPercentage
                            }
                            % match
                        </Text>
                    </View>
                </View>

                <Animated.View
                    style={buttonAnimatedStyle}
                >
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={
                            activeInsight.buttonLabel ??
                            "Start cooking"
                        }
                        onPress={() =>
                            onStartCooking?.(
                                activeInsight,
                            )
                        }
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
                            style={styles.addButtonText}
                        >
                            {activeInsight.buttonLabel ??
                                "Start cooking"}
                        </Text>

                        <Ionicons
                            name="arrow-forward"
                            size={iconSizes.sm}
                            color={colors.primaryDark}
                        />
                    </Pressable>
                </Animated.View>
            </Animated.View>

            {hasMultipleInsights && (
                <View style={styles.carouselFooter}>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Show previous insight"
                        hitSlop={spacing.sm}
                        onPress={showPreviousInsight}
                        style={({ pressed }) => [
                            styles.carouselButton,
                            pressed &&
                            styles.carouselButtonPressed,
                        ]}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={iconSizes.sm}
                            color={colors.textInverse}
                        />
                    </Pressable>

                    <View
                        accessibilityRole="tablist"
                        style={styles.pagination}
                    >
                        {safeInsights.map((_, index) => {
                            const isActive =
                                index === activeIndex;

                            return (
                                <Pressable
                                    key={index}
                                    accessibilityRole="tab"
                                    accessibilityLabel={`Show insight ${index + 1
                                        } of ${safeInsights.length
                                        }`}
                                    accessibilityState={{
                                        selected: isActive,
                                    }}
                                    hitSlop={spacing.sm}
                                    onPress={() =>
                                        showInsight(index)
                                    }
                                    style={[
                                        styles.paginationDot,
                                        isActive &&
                                        styles.paginationDotActive,
                                    ]}
                                />
                            );
                        })}
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Show next insight"
                        hitSlop={spacing.sm}
                        onPress={showNextInsight}
                        style={({ pressed }) => [
                            styles.carouselButton,
                            pressed &&
                            styles.carouselButtonPressed,
                        ]}
                    >
                        <Ionicons
                            name="chevron-forward"
                            size={iconSizes.sm}
                            color={colors.textInverse}
                        />
                    </Pressable>
                </View>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    fridgeCard: {
        overflow: "hidden",
        padding: spacing.xl,
        borderRadius: radii["2xl"],
        borderWidth: 1,
        borderColor: colors.primaryDark,
        backgroundColor: colors.primary,
        ...shadows.large,
    },

    cardTopRow: {
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

    statusBadge: {
        minHeight: 36,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        backgroundColor: colors.primaryDark,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: radii.full,
        backgroundColor: colors.accent,
    },

    statusText: {
        color: colors.textInverse,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },

    eyebrow: {
        marginBottom: spacing.sm,
        color: colors.accentLight,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.extraBold,
        letterSpacing: 1.4,
    },

    cardTitle: {
        maxWidth: 300,
        color: colors.textInverse,
        fontSize: fontSizes["2xl"],
        lineHeight: lineHeights["2xl"],
        fontWeight: fontWeights.extraBold,
    },

    cardDescription: {
        maxWidth: 320,
        marginTop: spacing.md,
        color: colors.backgroundMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.regular,
    },

    recipeName: {
        maxWidth: 320,
        marginTop: spacing.xs,
        color: colors.textInverse,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.lg,
        fontWeight: fontWeights.bold,
    },

    recipeMetaRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: spacing.sm,
        marginTop: spacing.lg,
    },

    recipeMeta: {
        minHeight: 36,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        backgroundColor: colors.primaryDark,
    },

    recipeMetaText: {
        color: colors.textInverse,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
    },

    matchBadge: {
        borderColor: colors.accentLight,
        backgroundColor: colors.accent,
    },

    matchText: {
        color: colors.primaryDark,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.extraBold,
    },

    addButton: {
        alignSelf: "flex-start",
        minHeight: 46,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        marginTop: spacing.lg,
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

    carouselFooter: {
        minHeight: 38,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
        marginTop: spacing.xl,
    },

    carouselButton: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        backgroundColor: colors.primaryDark,
    },

    carouselButtonPressed: {
        opacity: 0.8,
        transform: [
            {
                scale: 0.94,
            },
        ],
    },

    pagination: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
    },

    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: radii.full,
        backgroundColor: colors.primaryLight,
    },

    paginationDotActive: {
        width: 24,
        backgroundColor: colors.accent,
    },
});
