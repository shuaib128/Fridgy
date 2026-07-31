import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import {
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";

import { theme } from "@/styles/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

type NotificationOptionProps = {
    icon: IconName;
    title: string;
    description: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
};

export function NotificationOption({
    icon,
    title,
    description,
    enabled,
    onChange,
}: NotificationOptionProps) {
    return (
        <View style={styles.notificationOption}>
            <View style={styles.notificationIcon}>
                <Ionicons
                    name={icon}
                    size={theme.iconSizes.md}
                    color={theme.colors.primaryDark}
                />
            </View>

            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>
                    {title}
                </Text>

                <Text style={styles.notificationDescription}>
                    {description}
                </Text>
            </View>

            <Switch
                value={enabled}
                onValueChange={onChange}
                trackColor={{
                    false: theme.colors.borderStrong,
                    true: theme.colors.primaryLight,
                }}
                thumbColor={
                    enabled
                        ? theme.colors.primaryDark
                        : theme.colors.surface
                }
                ios_backgroundColor={
                    theme.colors.borderStrong
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    notificationOption: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.lg,
        backgroundColor: theme.colors.surfaceSoft,
    },

    notificationIcon: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.spacing.md,
        borderRadius: theme.radii.md,
        backgroundColor: theme.colors.accentLight,
    },

    notificationContent: {
        flex: 1,
        paddingRight: theme.spacing.sm,
    },

    notificationTitle: {
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.text,
    },

    notificationDescription: {
        marginTop: theme.spacing.xs,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        color: theme.colors.textMuted,
    },
});