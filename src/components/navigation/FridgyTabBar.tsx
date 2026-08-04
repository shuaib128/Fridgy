import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import {
    memo,
    useEffect,
    type ComponentProps,
} from "react";
import {
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import { theme } from "@/styles/theme";

type ExpoTabsProps = ComponentProps<typeof Tabs>;

type FridgyTabBarProps = Parameters<
    NonNullable<ExpoTabsProps["tabBar"]>
>[0];

type IoniconName = ComponentProps<
    typeof Ionicons
>["name"];

type TabItem = {
    routeName: string;
    label: string;
    icon: IoniconName;
    activeIcon: IoniconName;
};

type AnimatedTabButtonProps = {
    item: TabItem;
    isFocused: boolean;
    isAddButton: boolean;
    onPress: () => void;
};

const TAB_ITEMS: TabItem[] = [
    {
        routeName: "index",
        label: "Home",
        icon: "home-outline",
        activeIcon: "home",
    },
    {
        routeName: "inventory",
        label: "Inventory",
        icon: "cube-outline",
        activeIcon: "cube",
    },
    {
        routeName: "add-inventory",
        label: "Add",
        icon: "add",
        activeIcon: "add",
    },
    {
        routeName: "meals",
        label: "Meals",
        icon: "restaurant-outline",
        activeIcon: "restaurant",
    },
    {
        routeName: "profile",
        label: "Profile",
        icon: "person-outline",
        activeIcon: "person",
    },
];

const ACTIVE_SPRING = {
    damping: 15,
    stiffness: 420,
    mass: 0.42,
    overshootClamping: false,
};

const PRESS_SPRING = {
    damping: 16,
    stiffness: 520,
    mass: 0.3,
    overshootClamping: true,
};

const AnimatedTabButton = memo(
    function AnimatedTabButton({
        item,
        isFocused,
        isAddButton,
        onPress,
    }: AnimatedTabButtonProps) {
        const activeProgress = useSharedValue(
            isFocused ? 1 : 0,
        );

        const pressProgress = useSharedValue(0);

        useEffect(() => {
            activeProgress.value = withSpring(
                isFocused ? 1 : 0,
                ACTIVE_SPRING,
            );
        }, [
            activeProgress,
            isFocused,
        ]);

        const handlePressIn = () => {
            pressProgress.value = withSpring(
                1,
                PRESS_SPRING,
            );
        };

        const handlePressOut = () => {
            pressProgress.value = withSpring(
                0,
                PRESS_SPRING,
            );
        };

        /*
         * The entire tab moves slightly when pressed,
         * but it never scales. This keeps Ionicons sharp.
         */
        const tabAnimatedStyle = useAnimatedStyle(
            () => ({
                transform: [
                    {
                        translateY: interpolate(
                            pressProgress.value,
                            [0, 1],
                            [0, 2],
                            Extrapolation.CLAMP,
                        ),
                    },
                ],
            }),
        );

        /*
         * Snap the active pill into place with movement,
         * not a slow fade.
         */
        const activeBackgroundAnimatedStyle =
            useAnimatedStyle(() => ({
                opacity:
                    activeProgress.value > 0.02
                        ? 1
                        : 0,
                transform: [
                    {
                        translateY: interpolate(
                            activeProgress.value,
                            [0, 1],
                            [10, 0],
                            Extrapolation.CLAMP,
                        ),
                    },
                    {
                        scaleX: interpolate(
                            activeProgress.value,
                            [0, 1],
                            [0.58, 1],
                            Extrapolation.CLAMP,
                        ),
                    },
                    {
                        scaleY: interpolate(
                            activeProgress.value,
                            [0, 1],
                            [0.74, 1],
                            Extrapolation.CLAMP,
                        ),
                    },
                ],
            }));

        /*
         * Move the fixed-size icon instead of scaling it.
         */
        const iconAnimatedStyle =
            useAnimatedStyle(() => ({
                transform: [
                    {
                        translateY: interpolate(
                            activeProgress.value,
                            [0, 0.65, 1],
                            [0, -6, -3],
                            Extrapolation.CLAMP,
                        ),
                    },
                ],
            }));

        const accentDotAnimatedStyle =
            useAnimatedStyle(() => ({
                opacity:
                    activeProgress.value > 0.45
                        ? 1
                        : 0,
                transform: [
                    {
                        translateY: interpolate(
                            activeProgress.value,
                            [0.45, 0.75, 1],
                            [7, -2, 0],
                            Extrapolation.CLAMP,
                        ),
                    },
                    {
                        scale: interpolate(
                            activeProgress.value,
                            [0.45, 0.75, 1],
                            [0.45, 1.2, 1],
                            Extrapolation.CLAMP,
                        ),
                    },
                ],
            }));

        const labelAnimatedStyle =
            useAnimatedStyle(() => ({
                transform: [
                    {
                        translateY: interpolate(
                            activeProgress.value,
                            [0, 0.7, 1],
                            [1, -2, -1],
                            Extrapolation.CLAMP,
                        ),
                    },
                ],
            }));

        /*
         * The Add button only lifts.
         * Its circle and icon remain the same size.
         */
        const addButtonAnimatedStyle =
            useAnimatedStyle(() => ({
                transform: [
                    {
                        translateY: interpolate(
                            activeProgress.value,
                            [0, 0.65, 1],
                            [0, -9, -6],
                            Extrapolation.CLAMP,
                        ),
                    },
                ],
            }));

        /*
         * Rotate the plus without enlarging it.
         */
        const addIconAnimatedStyle =
            useAnimatedStyle(() => ({
                transform: [
                    {
                        rotate: `${interpolate(
                            activeProgress.value,
                            [0, 1],
                            [0, 45],
                            Extrapolation.CLAMP,
                        )}deg`,
                    },
                ],
            }));

        if (isAddButton) {
            return (
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Add inventory"
                    accessibilityState={
                        isFocused
                            ? { selected: true }
                            : {}
                    }
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={[
                        styles.tabButton,
                        styles.addTabButton,
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.animatedTabContent,
                            tabAnimatedStyle,
                        ]}
                    >
                        <Animated.View
                            style={[
                                styles.addButton,
                                isFocused &&
                                styles.activeAddButton,
                                addButtonAnimatedStyle,
                            ]}
                        >
                            <Animated.View
                                style={
                                    addIconAnimatedStyle
                                }
                            >
                                <Ionicons
                                    name="add"
                                    size={
                                        theme.iconSizes.xl
                                    }
                                    color={
                                        theme.colors
                                            .primaryDark
                                    }
                                />
                            </Animated.View>
                        </Animated.View>

                        <Animated.Text
                            numberOfLines={1}
                            style={[
                                styles.addLabel,
                                isFocused &&
                                styles.activeLabel,
                                labelAnimatedStyle,
                            ]}
                        >
                            {item.label}
                        </Animated.Text>
                    </Animated.View>
                </Pressable>
            );
        }

        return (
            <Pressable
                accessibilityRole="button"
                accessibilityLabel={item.label}
                accessibilityState={
                    isFocused
                        ? { selected: true }
                        : {}
                }
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.tabButton}
            >
                <Animated.View
                    style={[
                        styles.animatedTabContent,
                        tabAnimatedStyle,
                    ]}
                >
                    <Animated.View
                        pointerEvents="none"
                        style={[
                            styles.activeBackground,
                            activeBackgroundAnimatedStyle,
                        ]}
                    />

                    <Animated.View
                        style={[
                            styles.iconArea,
                            iconAnimatedStyle,
                        ]}
                    >
                        <Animated.View
                            style={[
                                styles.iconAccentDot,
                                accentDotAnimatedStyle,
                            ]}
                        />

                        <Ionicons
                            name={
                                isFocused
                                    ? item.activeIcon
                                    : item.icon
                            }
                            size={theme.iconSizes.lg}
                            color={
                                isFocused
                                    ? theme.colors.primary
                                    : theme.colors
                                        .textMuted
                            }
                        />
                    </Animated.View>

                    <Animated.Text
                        numberOfLines={1}
                        style={[
                            styles.label,
                            isFocused &&
                            styles.activeLabel,
                            labelAnimatedStyle,
                        ]}
                    >
                        {item.label}
                    </Animated.Text>
                </Animated.View>
            </Pressable>
        );
    },
);

export default function FridgyTabBar({
    state,
    navigation,
}: FridgyTabBarProps) {
    const handlePress = (
        routeName: string,
        routeKey?: string,
        isFocused?: boolean,
    ) => {
        if (!routeKey) {
            return;
        }

        const event = navigation.emit({
            type: "tabPress",
            target: routeKey,
            canPreventDefault: true,
        });

        if (
            !isFocused &&
            !event.defaultPrevented
        ) {
            navigation.navigate(routeName);
        }
    };

    return (
        <View
            pointerEvents="box-none"
            style={styles.wrapper}
        >
            <View style={styles.tabBar}>
                {TAB_ITEMS.map((item) => {
                    const routeIndex =
                        state.routes.findIndex(
                            (route) =>
                                route.name ===
                                item.routeName,
                        );

                    const route =
                        routeIndex >= 0
                            ? state.routes[
                            routeIndex
                            ]
                            : undefined;

                    const isFocused =
                        routeIndex >= 0 &&
                        state.index === routeIndex;

                    const isAddButton =
                        item.routeName ===
                        "add-inventory";

                    return (
                        <AnimatedTabButton
                            key={item.routeName}
                            item={item}
                            isFocused={isFocused}
                            isAddButton={
                                isAddButton
                            }
                            onPress={() =>
                                handlePress(
                                    item.routeName,
                                    route?.key,
                                    isFocused,
                                )
                            }
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        right: 0,
        bottom: 0,
        left: 0,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
    },

    tabBar: {
        minHeight: 82,
        flexDirection: "row",
        alignItems: "center",
        padding: theme.spacing.xs,

        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.border,

        ...theme.shadows.large,
    },

    tabButton: {
        minWidth: 0,
        flex: 1,
        minHeight: 70,
        borderRadius: theme.radii.full,
    },

    animatedTabContent: {
        position: "relative",
        flex: 1,
        minHeight: 70,
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        paddingHorizontal: theme.spacing.xs,
        borderRadius: theme.radii.full,
    },

    activeBackground: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        backgroundColor:
            theme.colors.backgroundMuted,
        borderRadius: theme.radii.full,
        borderWidth: 1,
        borderColor: theme.colors.border,

        ...theme.shadows.small,
    },

    iconArea: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },

    iconAccentDot: {
        position: "absolute",
        top: -2,
        right: -5,
        zIndex: 1,
        width: 9,
        height: 9,
        borderRadius: theme.radii.full,
        backgroundColor: theme.colors.accent,
    },

    label: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        fontWeight: theme.fontWeights.medium,
    },

    activeLabel: {
        color: theme.colors.primaryDark,
        fontWeight: theme.fontWeights.bold,
    },

    addTabButton: {
        overflow: "visible",
    },

    addButton: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: theme.colors.accent,
        borderRadius: theme.radii.full,
        borderWidth: 4,
        borderColor: theme.colors.surface,

        ...theme.shadows.medium,
    },

    activeAddButton: {
        backgroundColor:
            theme.colors.accentLight,
        borderColor: theme.colors.primary,
    },

    addLabel: {
        color: theme.colors.primaryDark,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        fontWeight: theme.fontWeights.bold,
    },
});