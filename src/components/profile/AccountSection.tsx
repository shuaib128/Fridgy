import React, { ReactNode } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import { theme } from "@/styles/theme";

type AccountItem = {
    id: string;
};

type AccountSectionProps<T extends AccountItem> = {
    items: T[];
    renderMenuItem: (item: T) => ReactNode;
};

export default function AccountSection<
    T extends AccountItem,
>({
    items,
    renderMenuItem,
}: AccountSectionProps<T>) {
    return (
        <>
            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionTitle}>
                        Account
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                        Your personal and household settings
                    </Text>
                </View>
            </View>

            <View style={styles.menuCard}>
                {items.map((item, index) => (
                    <View key={item.id}>
                        {renderMenuItem(item)}

                        {index < items.length - 1 && (
                            <View
                                style={styles.menuDivider}
                            />
                        )}
                    </View>
                ))}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        marginTop: theme.spacing["2xl"],
        marginBottom: theme.spacing.md,
    },

    sectionTitle: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.extraBold,
    },

    sectionSubtitle: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
        marginTop: 2,
    },

    menuCard: {
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii["2xl"],
        borderWidth: 1,
        borderColor: theme.colors.border,
        ...theme.shadows.medium,
    },

    menuDivider: {
        height: 1,
        marginLeft:
            48 +
            theme.spacing.md,
        backgroundColor: theme.colors.border,
    },
});