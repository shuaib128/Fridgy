import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Animated,
    Modal,
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
    opacity,
    radii,
    shadows,
    spacing,
} from "@/styles/theme";

const CHEF_TIP_STORAGE_KEY =
    "@fridgy:last-chef-tip-date";

export type ChefTip = {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    category: string;
};

const chefTips: ChefTip[] = [
    {
        id: "freeze-herbs",
        title: "Freeze fresh herbs",
        description:
            "Freeze fresh herbs with olive oil in ice cube trays. Drop one into your pan whenever you cook.",
        icon: "leaf-outline",
        category: "Freshness tip",
    },
    {
        id: "store-berries",
        title: "Keep berries fresher",
        description:
            "Wait to wash berries until you are ready to eat them. Extra moisture makes them spoil faster.",
        icon: "nutrition-outline",
        category: "Storage tip",
    },
    {
        id: "revive-greens",
        title: "Revive leafy greens",
        description:
            "Soak wilted greens in ice-cold water for a few minutes to help restore their crisp texture.",
        icon: "water-outline",
        category: "Kitchen trick",
    },
    {
        id: "bread-storage",
        title: "Freeze extra bread",
        description:
            "Freeze bread in individual slices so you can toast only what you need and reduce waste.",
        icon: "snow-outline",
        category: "Waste saver",
    },
    {
        id: "citrus-juice",
        title: "Get more citrus juice",
        description:
            "Roll lemons and limes firmly on the counter before cutting them to release more juice.",
        icon: "sunny-outline",
        category: "Chef trick",
    },
    {
        id: "fresh-celery",
        title: "Keep celery crisp",
        description:
            "Wrap celery tightly in foil before refrigerating it to help it stay crunchy for longer.",
        icon: "restaurant-outline",
        category: "Freshness tip",
    },
    {
        id: "leftover-rice",
        title: "Cool rice quickly",
        description:
            "Spread leftover rice in a shallow container before refrigerating so it cools more evenly.",
        icon: "timer-outline",
        category: "Food safety",
    },
];

type ChefTipModalProps = {
    /**
     * Set to false while onboarding, authentication,
     * or other startup work is still being resolved.
     */
    enabled?: boolean;

    /**
     * Optional callback after the modal closes.
     */
    onDismiss?: () => void;
};

function getLocalDateKey() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(
        now.getMonth() + 1,
    ).padStart(2, "0");
    const day = String(now.getDate()).padStart(
        2,
        "0",
    );

    return `${year}-${month}-${day}`;
}

function getTipForToday() {
    const now = new Date();

    // Produces a predictable daily rotation.
    const dayNumber = Math.floor(
        new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
        ).getTime() /
        86_400_000,
    );

    return chefTips[dayNumber % chefTips.length];
}

export default function ChefTipModal({
    enabled = true,
    onDismiss,
}: ChefTipModalProps) {
    const [visible, setVisible] = useState(false);
    const [isChecking, setIsChecking] =
        useState(true);

    const tip = useMemo(() => getTipForToday(), []);

    const backdropOpacity = useRef(
        new Animated.Value(0),
    ).current;

    const cardOpacity = useRef(
        new Animated.Value(0),
    ).current;

    const cardScale = useRef(
        new Animated.Value(0.88),
    ).current;

    const cardTranslateY = useRef(
        new Animated.Value(32),
    ).current;

    const iconRotate = useRef(
        new Animated.Value(0),
    ).current;

    const showAnimation = useCallback(() => {
        backdropOpacity.setValue(0);
        cardOpacity.setValue(0);
        cardScale.setValue(0.88);
        cardTranslateY.setValue(32);
        iconRotate.setValue(0);

        Animated.parallel([
            Animated.timing(backdropOpacity, {
                toValue: 1,
                duration: 260,
                useNativeDriver: true,
            }),
            Animated.spring(cardOpacity, {
                toValue: 1,
                speed: 18,
                bounciness: 0,
                useNativeDriver: true,
            }),
            Animated.spring(cardScale, {
                toValue: 1,
                speed: 14,
                bounciness: 8,
                useNativeDriver: true,
            }),
            Animated.spring(cardTranslateY, {
                toValue: 0,
                speed: 14,
                bounciness: 7,
                useNativeDriver: true,
            }),
            Animated.spring(iconRotate, {
                toValue: 1,
                delay: 150,
                speed: 10,
                bounciness: 12,
                useNativeDriver: true,
            }),
        ]).start();
    }, [
        backdropOpacity,
        cardOpacity,
        cardScale,
        cardTranslateY,
        iconRotate,
    ]);

    useEffect(() => {
        if (!enabled) {
            setIsChecking(false);
            return;
        }

        let mounted = true;

        const checkDailyTip = async () => {
            try {
                const today = getLocalDateKey();
                const lastShownDate =
                    await AsyncStorage.getItem(
                        CHEF_TIP_STORAGE_KEY,
                    );

                if (
                    mounted &&
                    lastShownDate !== today
                ) {
                    setVisible(true);
                }
            } catch (error) {
                console.warn(
                    "Unable to check daily Chef Tip:",
                    error,
                );

                // Still show the feature if storage fails.
                if (mounted) {
                    setVisible(true);
                }
            } finally {
                if (mounted) {
                    setIsChecking(false);
                }
            }
        };

        checkDailyTip();

        return () => {
            mounted = false;
        };
    }, [enabled]);

    useEffect(() => {
        if (visible) {
            requestAnimationFrame(showAnimation);
        }
    }, [showAnimation, visible]);

    const closeModal = useCallback(() => {
        Animated.parallel([
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 180,
                useNativeDriver: true,
            }),
            Animated.timing(cardOpacity, {
                toValue: 0,
                duration: 160,
                useNativeDriver: true,
            }),
            Animated.timing(cardScale, {
                toValue: 0.94,
                duration: 180,
                useNativeDriver: true,
            }),
            Animated.timing(cardTranslateY, {
                toValue: 20,
                duration: 180,
                useNativeDriver: true,
            }),
        ]).start(async ({ finished }) => {
            if (!finished) {
                return;
            }

            setVisible(false);

            try {
                await AsyncStorage.setItem(
                    CHEF_TIP_STORAGE_KEY,
                    getLocalDateKey(),
                );
            } catch (error) {
                console.warn(
                    "Unable to save Chef Tip date:",
                    error,
                );
            }

            onDismiss?.();
        });
    }, [
        backdropOpacity,
        cardOpacity,
        cardScale,
        cardTranslateY,
        onDismiss,
    ]);

    const iconRotation = iconRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ["-14deg", "-4deg"],
    });

    if (isChecking || !enabled) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={closeModal}
        >
            <View style={styles.modalRoot}>
                <Animated.View
                    style={[
                        styles.backdrop,
                        {
                            opacity: backdropOpacity,
                        },
                    ]}
                />

                <View style={styles.centerContent}>
                    <Animated.View
                        style={[
                            styles.card,
                            {
                                opacity: cardOpacity,
                                transform: [
                                    {
                                        translateY:
                                            cardTranslateY,
                                    },
                                    {
                                        scale: cardScale,
                                    },
                                ],
                            },
                        ]}
                    >
                        <View
                            style={
                                styles.decorativeCircleLarge
                            }
                        />

                        <View
                            style={
                                styles.decorativeCircleSmall
                            }
                        />

                        <View style={styles.topRow}>
                            <View
                                style={styles.dailyBadge}
                            >
                                <View
                                    style={
                                        styles.dailyBadgeDot
                                    }
                                />

                                <Text
                                    style={
                                        styles.dailyBadgeText
                                    }
                                >
                                    TODAY&apos;S CHEF TIP
                                </Text>
                            </View>

                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel="Close Chef Tip"
                                hitSlop={spacing.md}
                                onPress={closeModal}
                                style={({ pressed }) => [
                                    styles.closeButton,
                                    pressed &&
                                    styles.closeButtonPressed,
                                ]}
                            >
                                <Ionicons
                                    name="close"
                                    size={iconSizes.sm}
                                    color={colors.text}
                                />
                            </Pressable>
                        </View>

                        <Animated.View
                            style={[
                                styles.iconBadge,
                                {
                                    transform: [
                                        {
                                            rotate: iconRotation,
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Ionicons
                                name={tip.icon}
                                size={iconSizes.xl}
                                color={colors.primaryDark}
                            />
                        </Animated.View>

                        <Text style={styles.eyebrow}>
                            EVERY DAY
                        </Text>

                        <Text style={styles.title}>
                            {tip.title}
                        </Text>

                        <Text style={styles.description}>
                            {tip.description}
                        </Text>

                        <View style={styles.divider} />

                        <View style={styles.footer}>
                            <View
                                style={styles.categoryRow}
                            >
                                <Ionicons
                                    name="sparkles"
                                    size={iconSizes.xs}
                                    color={colors.accentDark}
                                />

                                <Text
                                    style={
                                        styles.categoryText
                                    }
                                >
                                    {tip.category}
                                </Text>
                            </View>

                            <Text style={styles.tipCount}>
                                Fresh idea for today
                            </Text>
                        </View>

                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Continue to Fridgy"
                            onPress={closeModal}
                            style={({ pressed }) => [
                                styles.continueButton,
                                pressed &&
                                styles.continueButtonPressed,
                            ]}
                        >
                            <View
                                style={
                                    styles.continueButtonIcon
                                }
                            >
                                <Ionicons
                                    name="checkmark"
                                    size={iconSizes.sm}
                                    color={colors.text}
                                />
                            </View>

                            <Text
                                style={
                                    styles.continueButtonText
                                }
                            >
                                Got it
                            </Text>

                            <Ionicons
                                name="arrow-forward"
                                size={iconSizes.sm}
                                color={colors.text}
                            />
                        </Pressable>
                    </Animated.View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalRoot: {
        flex: 1,
    },

    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: colors.overlay,
    },

    centerContent: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing["3xl"],
    },

    card: {
        overflow: "hidden",
        width: "100%",
        maxWidth: 440,
        alignSelf: "center",
        padding: spacing["2xl"],
        borderRadius: radii["2xl"],
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        ...shadows.large,
    },

    decorativeCircleLarge: {
        position: "absolute",
        top: -72,
        right: -58,
        width: 170,
        height: 170,
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
        opacity: opacity.muted,
    },

    decorativeCircleSmall: {
        position: "absolute",
        top: 76,
        right: 42,
        width: 32,
        height: 32,
        borderRadius: radii.full,
        backgroundColor: colors.primaryLight,
        opacity: opacity.disabled,
    },

    topRow: {
        zIndex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: spacing.xl,
    },

    dailyBadge: {
        minHeight: 36,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.primaryLight,
        backgroundColor: colors.primaryDark,
    },

    dailyBadgeDot: {
        width: 7,
        height: 7,
        borderRadius: radii.full,
        backgroundColor: colors.accent,
    },

    dailyBadgeText: {
        color: colors.textInverse,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
        letterSpacing: 0.8,
    },

    closeButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surfaceSoft,
    },

    closeButtonPressed: {
        opacity: opacity.pressed,
        transform: [{ scale: 0.94 }],
    },

    iconBadge: {
        width: 72,
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.xl,
        borderRadius: radii.xl,
        borderWidth: 4,
        borderColor: colors.primaryLight,
        backgroundColor: colors.accent,
        ...shadows.small,
    },

    eyebrow: {
        marginBottom: spacing.xs,
        color: colors.primary,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.bold,
        letterSpacing: 1.6,
    },

    title: {
        maxWidth: 280,
        color: colors.text,
        fontSize: fontSizes["3xl"],
        lineHeight: lineHeights["3xl"],
        fontWeight: fontWeights.extraBold,
    },

    description: {
        marginTop: spacing.md,
        color: colors.textMuted,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.medium,
    },

    divider: {
        height: 1,
        marginVertical: spacing.xl,
        backgroundColor: colors.border,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
    },

    categoryRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },

    categoryText: {
        color: colors.primaryDark,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.bold,
    },

    tipCount: {
        flexShrink: 1,
        textAlign: "right",
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.medium,
    },

    continueButton: {
        minHeight: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.md,
        marginTop: spacing["2xl"],
        paddingHorizontal: spacing.lg,
        borderRadius: radii.full,
        borderWidth: 1,
        borderColor: colors.accentLight,
        backgroundColor: colors.accent,
        ...shadows.small,
    },

    continueButtonPressed: {
        opacity: opacity.pressed,
        transform: [{ scale: 0.98 }],
    },

    continueButtonIcon: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
    },

    continueButtonText: {
        flex: 1,
        color: colors.text,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.bold,
    },
});