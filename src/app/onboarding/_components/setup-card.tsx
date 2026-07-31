import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/styles/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

type SetupCardProps = {
    number: string;
    icon: IconName;
    title: string;
    description: string;
    children: ReactNode;
};

export function SetupCard({
    number,
    icon,
    title,
    description,
    children,
}: SetupCardProps) {
    return (
        <View style={styles.setupCard}>
            <View style={styles.cardTopRow}>
                <View style={styles.cardNumber}>
                    <Text style={styles.cardNumberText}>
                        {number}
                    </Text>
                </View>

                <View style={styles.cardIcon}>
                    <Ionicons
                        name={icon}
                        size={theme.iconSizes.md}
                        color={theme.colors.primaryDark}
                    />
                </View>
            </View>

            <Text style={styles.cardTitle}>
                {title}
            </Text>

            <Text style={styles.cardDescription}>
                {description}
            </Text>

            <View style={styles.cardContent}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    setupCard: {
        marginBottom: theme.spacing.xl,
        padding: theme.spacing.xl,
        borderRadius: theme.radii.xl,
        backgroundColor: theme.colors.surface,
        ...theme.shadows.medium,
    },

    cardTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.spacing.lg,
    },

    cardNumber: {
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
        borderRadius: theme.radii.xs,
        backgroundColor: theme.colors.primary,
    },

    cardNumberText: {
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textInverse,
    },

    cardIcon: {
        width: 52,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.radii.full,
        backgroundColor: theme.colors.accentLight,
    },

    cardTitle: {
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.text,
    },

    cardDescription: {
        marginTop: theme.spacing.xs,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
        color: theme.colors.textMuted,
    },

    cardContent: {
        marginTop: theme.spacing.lg,
    },
});