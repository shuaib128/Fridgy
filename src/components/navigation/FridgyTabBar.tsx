import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

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

        if (!isFocused && !event.defaultPrevented) {
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
                            ? state.routes[routeIndex]
                            : undefined;

                    const isFocused =
                        routeIndex >= 0 &&
                        state.index === routeIndex;

                    const isAddButton =
                        item.routeName ===
                        "add-inventory";

                    if (isAddButton) {
                        return (
                            <Pressable
                                key={item.routeName}
                                accessibilityRole="button"
                                accessibilityLabel="Add inventory"
                                accessibilityState={
                                    isFocused
                                        ? {
                                            selected:
                                                true,
                                        }
                                        : {}
                                }
                                onPress={() =>
                                    handlePress(
                                        item.routeName,
                                        route?.key,
                                        isFocused,
                                    )
                                }
                                style={({ pressed }) => [
                                    styles.tabButton,
                                    styles.addTabButton,
                                    pressed &&
                                    styles.pressed,
                                ]}
                            >
                                <View
                                    style={[
                                        styles.addButton,
                                        isFocused &&
                                        styles
                                            .activeAddButton,
                                    ]}
                                >
                                    <Ionicons
                                        name="add"
                                        size={
                                            theme
                                                .iconSizes
                                                .xl
                                        }
                                        color={
                                            theme.colors
                                                .primaryDark
                                        }
                                    />
                                </View>

                                <Text
                                    style={[
                                        styles.addLabel,
                                        isFocused &&
                                        styles
                                            .activeLabel,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </Pressable>
                        );
                    }

                    return (
                        <Pressable
                            key={item.routeName}
                            accessibilityRole="button"
                            accessibilityLabel={
                                item.label
                            }
                            accessibilityState={
                                isFocused
                                    ? {
                                        selected: true,
                                    }
                                    : {}
                            }
                            onPress={() =>
                                handlePress(
                                    item.routeName,
                                    route?.key,
                                    isFocused,
                                )
                            }
                            style={({ pressed }) => [
                                styles.tabButton,
                                isFocused &&
                                styles.activeTabButton,
                                pressed &&
                                styles.pressed,
                            ]}
                        >
                            <View
                                style={styles.iconArea}
                            >
                                {isFocused && (
                                    <View
                                        style={
                                            styles.iconAccentDot
                                        }
                                    />
                                )}

                                <Ionicons
                                    name={
                                        isFocused
                                            ? item.activeIcon
                                            : item.icon
                                    }
                                    size={
                                        theme.iconSizes.lg
                                    }
                                    color={
                                        isFocused
                                            ? theme.colors
                                                .primary
                                            : theme.colors
                                                .textMuted
                                    }
                                />
                            </View>

                            <Text
                                numberOfLines={1}
                                style={[
                                    styles.label,
                                    isFocused &&
                                    styles.activeLabel,
                                ]}
                            >
                                {item.label}
                            </Text>
                        </Pressable>
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
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        paddingHorizontal: theme.spacing.xs,
        borderRadius: theme.radii.full,
    },

    activeTabButton: {
        backgroundColor:
            theme.colors.backgroundMuted,
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
        backgroundColor: theme.colors.accentLight,
        borderColor: theme.colors.primary,
    },

    addLabel: {
        color: theme.colors.primaryDark,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        fontWeight: theme.fontWeights.bold,
    },

    pressed: {
        opacity: theme.opacity.pressed,
        transform: [
            {
                scale: 0.97,
            },
        ],
    },
});