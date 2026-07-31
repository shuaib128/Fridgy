// components/hero-feature.tsx

import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { theme } from "@/styles/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

type HeroFeatureProps = {
    icon: IconName;
    title: string;
    subtitle: string;
};

export function HeroFeature({
    icon,
    title,
    subtitle,
}: HeroFeatureProps) {
    return (
        <View style={styles.heroFeature}>
            <View style={styles.heroFeatureIcon}>
                <Ionicons
                    name={icon}
                    size={theme.iconSizes.sm}
                    color={theme.colors.primaryDark}
                />
            </View>

            <Text style={styles.heroFeatureTitle}>
                {title}
            </Text>

            <Text style={styles.heroFeatureSubtitle}>
                {subtitle}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    heroFeature: {
        flex: 1,
        alignItems: "center",
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.xs,
        borderRadius: theme.radii.lg,
        backgroundColor: theme.colors.surface,
    },

    heroFeatureIcon: {
        width: 34,
        height: 34,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: theme.spacing.xs,
        borderRadius: theme.radii.full,
        backgroundColor: theme.colors.accentLight,
    },

    heroFeatureTitle: {
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.text,
    },

    heroFeatureSubtitle: {
        marginTop: 2,
        fontSize: theme.fontSizes.xs,
        color: theme.colors.textMuted,
        textAlign: "center",
    },
});