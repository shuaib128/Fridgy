import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/components/ui/screen";
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
import { PageHeader } from "../../components/navigation/screen-header";

function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "Good morning";
    }

    if (hour < 18) {
        return "Good afternoon";
    }

    return "Good evening";
}

export default function HomeScreen() {
    return (
        <Screen
            scrollable
            padded={false}
            backgroundColor={colors.background}
            contentContainerStyle={styles.content}
        >
            <PageHeader
                eyebrow={getGreeting().toUpperCase()}
                title="Hello, Shuaib 👋"
                description="Let’s see what is happening in your fridge."
                icon="person-outline"
                accessibilityLabel="Open profile"
                onPress={() => {
                    console.log("Profile pressed");
                }}
            />

            <View style={styles.fridgeCard}>
                <View style={styles.cardTopRow}>
                    <View style={styles.iconBadge}>
                        <Ionicons
                            name="leaf-outline"
                            size={iconSizes.xl}
                            color={colors.primaryDark}
                        />
                    </View>

                    <View style={styles.statusBadge}>
                        <View style={styles.statusDot} />

                        <Text style={styles.statusText}>
                            Looking good
                        </Text>
                    </View>
                </View>

                <Text style={styles.cardTitle}>
                    Your fridge is ready
                </Text>

                <Text style={styles.cardDescription}>
                    Add your first food item to start tracking freshness,
                    quantity, and meal ideas.
                </Text>

                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Add food"
                    style={({ pressed }) => [
                        styles.addButton,
                        pressed && styles.pressed,
                    ]}
                    onPress={() => {
                        console.log("Add food pressed");
                    }}
                >
                    <View style={styles.addButtonIcon}>
                        <Ionicons
                            name="add"
                            size={iconSizes.sm}
                            color={colors.primaryDark}
                        />
                    </View>

                    <Text style={styles.addButtonText}>
                        Add food
                    </Text>
                </Pressable>
            </View>

            <View style={styles.quickRow}>
                <View style={styles.quickCard}>
                    <View style={styles.quickIcon}>
                        <Ionicons
                            name="cube-outline"
                            size={iconSizes.md}
                            color={colors.primaryDark}
                        />
                    </View>

                    <Text style={styles.quickValue}>
                        0
                    </Text>

                    <Text style={styles.quickLabel}>
                        Food items
                    </Text>
                </View>

                <View style={styles.quickCard}>
                    <View style={styles.quickIcon}>
                        <Ionicons
                            name="time-outline"
                            size={iconSizes.md}
                            color={colors.primaryDark}
                        />
                    </View>

                    <Text style={styles.quickValue}>
                        0
                    </Text>

                    <Text style={styles.quickLabel}>
                        Expiring soon
                    </Text>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: spacing.md,
        paddingHorizontal: spacing.lg,
        paddingBottom:
            spacing["4xl"] +
            72,
    },

    fridgeCard: {
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

    cardTitle: {
        maxWidth: 280,
        color: colors.textInverse,
        fontSize: fontSizes["2xl"],
        lineHeight: lineHeights["2xl"],
        fontWeight: fontWeights.extraBold,
    },

    cardDescription: {
        maxWidth: 320,
        marginTop: spacing.sm,
        color: colors.backgroundMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.regular,
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

    quickRow: {
        flexDirection: "row",
        gap: spacing.md,
        marginTop: spacing.lg,
    },

    quickCard: {
        flex: 1,
        minHeight: 152,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii["2xl"],
        backgroundColor: colors.surface,
        ...shadows.medium,
    },

    quickIcon: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
        borderRadius: radii.lg,
        borderWidth: 1,
        borderColor: colors.accent,
        backgroundColor: colors.accentLight,
    },

    quickValue: {
        color: colors.text,
        fontSize: fontSizes["2xl"],
        lineHeight: lineHeights["2xl"],
        fontWeight: fontWeights.extraBold,
    },

    quickLabel: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
    },

    pressed: {
        opacity: 0.8,
        transform: [
            {
                scale: 0.98,
            },
        ],
    },
});