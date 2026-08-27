import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";
import { theme } from "@/styles/theme";

type PreviewColors = {
    background: string;
    surface: string;
    surfaceSoft: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    primary: string;
    primaryDark: string;
    accent: string;
    accentLight: string;
    successSoft: string;
    warningSoft: string;
    dangerSoft: string;
};

const lightColors: PreviewColors = {
    background: theme.colors.background,
    surface: theme.colors.surface,
    surfaceSoft: theme.colors.surfaceSoft,
    text: theme.colors.text,
    textSecondary: theme.colors.textSecondary,
    textMuted: theme.colors.textMuted,
    border: theme.colors.border,
    primary: theme.colors.primary,
    primaryDark: theme.colors.primaryDark,
    accent: theme.colors.accent,
    accentLight: theme.colors.accentLight,
    successSoft: "#E8EED8",
    warningSoft: "#FFF0CC",
    dangerSoft: "#F8E3DF",
};

const darkColors: PreviewColors = {
    background: "#12160D",
    surface: "#1D2316",
    surfaceSoft: "#252C1D",
    text: "#F4F7E8",
    textSecondary: "#D9DEC9",
    textMuted: "#A6AE93",
    border: "#39422E",
    primary: "#A8BD68",
    primaryDark: "#C2D982",
    accent: "#FCC151",
    accentLight: "#4A3B1D",
    successSoft: "#29381F",
    warningSoft: "#44371D",
    dangerSoft: "#432823",
};

export default function AppearancePreviewScreen() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const colors = isDarkMode ? darkColors : lightColors;

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: colors.background }]}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={[styles.title, { color: colors.text }]}>
                            Appearance
                        </Text>
                        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                            Preview how Fridgy looks on your device.
                        </Text>
                    </View>

                    <View
                        style={[styles.modeIcon, { backgroundColor: colors.accentLight }]}
                    >
                        <Ionicons
                            name={isDarkMode ? "moon" : "sunny"}
                            size={theme.iconSizes.md}
                            color={isDarkMode ? colors.accent : colors.primaryDark}
                        />
                    </View>
                </View>

                <View
                    style={[
                        styles.card,
                        { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                >
                    <View style={styles.settingRow}>
                        <View style={styles.settingCopy}>
                            <Text style={[styles.settingTitle, { color: colors.text }]}>
                                Dark mode
                            </Text>
                            <Text
                                style={[styles.settingDescription, { color: colors.textMuted }]}
                            >
                                Switch between light and dark appearance.
                            </Text>
                        </View>

                        <Switch
                            accessibilityLabel="Toggle dark mode preview"
                            value={isDarkMode}
                            onValueChange={setIsDarkMode}
                            trackColor={{ false: colors.border, true: colors.primary }}
                            thumbColor={theme.colors.white}
                            ios_backgroundColor={colors.border}
                        />
                    </View>
                </View>

                <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                    PREVIEW
                </Text>

                <View style={styles.statGrid}>
                    <StatCard
                        icon="cube-outline"
                        value="12"
                        label="Total items"
                        colors={colors}
                    />
                    <StatCard
                        icon="time-outline"
                        value="3"
                        label="Expiring soon"
                        colors={colors}
                        accent
                    />
                    <StatCard
                        icon="alert-circle-outline"
                        value="2"
                        label="Low stock"
                        colors={colors}
                        danger
                    />
                </View>

                <View>
                    <Text style={[styles.smallHeading, { color: colors.text }]}>
                        Categories
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.chipRow}
                    >
                        {["All", "Produce", "Dairy", "Pantry", "Frozen"].map((category) => {
                            const isSelected = selectedCategory === category;
                            return (
                                <Pressable
                                    key={category}
                                    onPress={() => setSelectedCategory(category)}
                                    style={({ pressed }) => [
                                        styles.filterChip,
                                        {
                                            backgroundColor: isSelected
                                                ? colors.primary
                                                : colors.surface,
                                            borderColor: isSelected ? colors.primary : colors.border,
                                        },
                                        pressed && styles.pressed,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.filterChipText,
                                            {
                                                color: isSelected
                                                    ? isDarkMode
                                                        ? "#12160D"
                                                        : theme.colors.textInverse
                                                    : colors.textSecondary,
                                            },
                                        ]}
                                    >
                                        {category}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </View>

                <View
                    style={[
                        styles.banner,
                        { backgroundColor: colors.warningSoft, borderColor: colors.accent },
                    ]}
                >
                    <View
                        style={[styles.bannerIcon, { backgroundColor: colors.accentLight }]}
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={theme.iconSizes.md}
                            color={colors.accent}
                        />
                    </View>
                    <View style={styles.bannerCopy}>
                        <Text style={[styles.bannerTitle, { color: colors.text }]}>
                            Milk expires tomorrow
                        </Text>
                        <Text style={[styles.bannerText, { color: colors.textMuted }]}>
                            Use it soon or add it to a meal plan.
                        </Text>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={theme.iconSizes.sm}
                        color={colors.textMuted}
                    />
                </View>

                <View
                    style={[
                        styles.card,
                        { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                >
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={[styles.cardTitle, { color: colors.text }]}>
                                Your kitchen
                            </Text>
                            <Text style={[styles.cardSubtitle, { color: colors.textMuted }]}>
                                3 items need attention
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.countBadge,
                                { backgroundColor: colors.accentLight },
                            ]}
                        >
                            <Text style={[styles.countText, { color: colors.primaryDark }]}>
                                12 items
                            </Text>
                        </View>
                    </View>

                    <InventoryRow
                        emoji="🥛"
                        name="Whole milk"
                        detail="1 carton · Fridge"
                        status="Expires tomorrow"
                        statusBackground={colors.warningSoft}
                        statusColor={colors.accent}
                        colors={colors}
                    />
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                    <InventoryRow
                        emoji="🥑"
                        name="Avocados"
                        detail="3 pieces · Counter"
                        status="Fresh"
                        statusBackground={colors.successSoft}
                        statusColor={colors.primary}
                        colors={colors}
                    />
                </View>

                <View
                    style={[
                        styles.card,
                        { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                >
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={[styles.cardTitle, { color: colors.text }]}>
                                Weekly freshness
                            </Text>
                            <Text style={[styles.cardSubtitle, { color: colors.textMuted }]}>
                                8 of 12 items are fresh
                            </Text>
                        </View>
                        <Text style={[styles.progressValue, { color: colors.primaryDark }]}>
                            67%
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.progressTrack,
                            { backgroundColor: colors.surfaceSoft },
                        ]}
                    >
                        <View
                            style={[styles.progressFill, { backgroundColor: colors.primary }]}
                        />
                    </View>
                    <View style={styles.legendRow}>
                        <View style={styles.legendItem}>
                            <View
                                style={[styles.legendDot, { backgroundColor: colors.primary }]}
                            />
                            <Text style={[styles.legendText, { color: colors.textMuted }]}>
                                Fresh
                            </Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View
                                style={[styles.legendDot, { backgroundColor: colors.accent }]}
                            />
                            <Text style={[styles.legendText, { color: colors.textMuted }]}>
                                Expiring
                            </Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View
                                style={[
                                    styles.legendDot,
                                    { backgroundColor: theme.colors.error },
                                ]}
                            />
                            <Text style={[styles.legendText, { color: colors.textMuted }]}>
                                Expired
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={[
                        styles.card,
                        { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                >
                    <Text style={[styles.cardTitle, { color: colors.text }]}>
                        Settings rows
                    </Text>
                    <SettingPreviewRow
                        icon="notifications-outline"
                        title="Expiry reminders"
                        description="Get notified before food expires"
                        colors={colors}
                        right={
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: colors.border, true: colors.primary }}
                                thumbColor={theme.colors.white}
                            />
                        }
                    />
                    <View
                        style={[styles.fullDivider, { backgroundColor: colors.border }]}
                    />
                    <SettingPreviewRow
                        icon="storefront-outline"
                        title="Preferred stores"
                        description="Costco, Trader Joe's"
                        colors={colors}
                        right={
                            <Ionicons
                                name="chevron-forward"
                                size={theme.iconSizes.sm}
                                color={colors.textMuted}
                            />
                        }
                    />
                </View>

                <View
                    style={[
                        styles.card,
                        { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                >
                    <Text style={[styles.cardTitle, { color: colors.text }]}>
                        Typography
                    </Text>
                    <Text style={[styles.typeDisplay, { color: colors.text }]}>
                        Fresh food, less waste.
                    </Text>
                    <Text style={[styles.typeBody, { color: colors.textSecondary }]}>
                        Body text is used for descriptions and helpful information
                        throughout the app.
                    </Text>
                    <Text style={[styles.typeCaption, { color: colors.textMuted }]}>
                        CAPTION · UPDATED 5 MIN AGO
                    </Text>
                </View>

                <View
                    style={[
                        styles.card,
                        styles.emptyState,
                        { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                >
                    <View
                        style={[styles.emptyIcon, { backgroundColor: colors.successSoft }]}
                    >
                        <Ionicons
                            name="basket-outline"
                            size={theme.iconSizes.xl}
                            color={colors.primary}
                        />
                    </View>
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>
                        Your freezer is empty
                    </Text>
                    <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                        Add your first frozen item to start tracking it.
                    </Text>
                    <Pressable
                        style={({ pressed }) => [
                            styles.compactButton,
                            { backgroundColor: colors.primary },
                            pressed && styles.pressed,
                        ]}
                    >
                        <Text
                            style={[
                                styles.compactButtonText,
                                { color: isDarkMode ? "#12160D" : theme.colors.textInverse },
                            ]}
                        >
                            Add an item
                        </Text>
                    </Pressable>
                </View>

                <View
                    style={[
                        styles.card,
                        { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                >
                    <Text style={[styles.cardTitle, { color: colors.text }]}>
                        Example form
                    </Text>
                    <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                        Item name
                    </Text>
                    <View
                        style={[
                            styles.inputContainer,
                            {
                                backgroundColor: colors.surfaceSoft,
                                borderColor: colors.border,
                            },
                        ]}
                    >
                        <Ionicons
                            name="search-outline"
                            size={theme.iconSizes.sm}
                            color={colors.textMuted}
                        />
                        <TextInput
                            placeholder="Search your inventory"
                            placeholderTextColor={colors.textMuted}
                            style={[styles.input, { color: colors.text }]}
                        />
                    </View>

                    <View style={styles.actions}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.secondaryButton,
                                { borderColor: colors.border },
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text
                                style={[styles.secondaryButtonText, { color: colors.text }]}
                            >
                                Cancel
                            </Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.primaryButton,
                                { backgroundColor: colors.primary },
                                pressed && styles.pressed,
                            ]}
                        >
                            <Ionicons
                                name="add"
                                size={theme.iconSizes.sm}
                                color={isDarkMode ? "#12160D" : theme.colors.textInverse}
                            />
                            <Text
                                style={[
                                    styles.primaryButtonText,
                                    { color: isDarkMode ? "#12160D" : theme.colors.textInverse },
                                ]}
                            >
                                Add item
                            </Text>
                        </Pressable>
                    </View>
                    <Pressable
                        disabled
                        style={[
                            styles.disabledButton,
                            { backgroundColor: colors.surfaceSoft },
                        ]}
                    >
                        <Text
                            style={[styles.disabledButtonText, { color: colors.textMuted }]}
                        >
                            Disabled button
                        </Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.dangerButton,
                            { borderColor: theme.colors.error },
                            pressed && styles.pressed,
                        ]}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={theme.iconSizes.sm}
                            color={theme.colors.error}
                        />
                        <Text style={styles.dangerButtonText}>Delete item</Text>
                    </Pressable>
                </View>

                <Text style={[styles.previewNote, { color: colors.textMuted }]}>
                    This is a preview. Save the selected appearance when you connect this
                    screen to your settings store.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

function StatCard({
    icon,
    value,
    label,
    colors,
    accent,
    danger,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    value: string;
    label: string;
    colors: PreviewColors;
    accent?: boolean;
    danger?: boolean;
}) {
    const tint = danger
        ? theme.colors.error
        : accent
            ? colors.accent
            : colors.primary;
    const background = danger
        ? colors.dangerSoft
        : accent
            ? colors.warningSoft
            : colors.successSoft;
    return (
        <View
            style={[
                styles.statCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
        >
            <View style={[styles.statIcon, { backgroundColor: background }]}>
                <Ionicons name={icon} size={theme.iconSizes.sm} color={tint} />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                {label}
            </Text>
        </View>
    );
}

function SettingPreviewRow({
    icon,
    title,
    description,
    colors,
    right,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
    colors: PreviewColors;
    right: React.ReactNode;
}) {
    return (
        <View style={styles.previewSettingRow}>
            <View
                style={[styles.settingIcon, { backgroundColor: colors.surfaceSoft }]}
            >
                <Ionicons
                    name={icon}
                    size={theme.iconSizes.sm}
                    color={colors.primaryDark}
                />
            </View>
            <View style={styles.settingRowCopy}>
                <Text style={[styles.itemName, { color: colors.text }]}>{title}</Text>
                <Text style={[styles.itemDetail, { color: colors.textMuted }]}>
                    {description}
                </Text>
            </View>
            {right}
        </View>
    );
}

function InventoryRow({
    emoji,
    name,
    detail,
    status,
    statusBackground,
    statusColor,
    colors,
}: {
    emoji: string;
    name: string;
    detail: string;
    status: string;
    statusBackground: string;
    statusColor: string;
    colors: PreviewColors;
}) {
    return (
        <View style={styles.inventoryRow}>
            <View style={[styles.emojiBox, { backgroundColor: colors.surfaceSoft }]}>
                <Text style={styles.emoji}>{emoji}</Text>
            </View>
            <View style={styles.itemCopy}>
                <Text style={[styles.itemName, { color: colors.text }]}>{name}</Text>
                <Text style={[styles.itemDetail, { color: colors.textMuted }]}>
                    {detail}
                </Text>
            </View>
            <View style={[styles.statusChip, { backgroundColor: statusBackground }]}>
                <Text style={[styles.statusText, { color: statusColor }]}>
                    {status}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    content: {
        padding: theme.spacing.lg,
        paddingBottom: theme.spacing["4xl"],
        gap: theme.spacing.lg,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: theme.spacing.sm,
    },
    headerText: { flex: 1, paddingRight: theme.spacing.lg },
    title: {
        fontSize: theme.fontSizes["2xl"],
        lineHeight: theme.lineHeights["2xl"],
        fontWeight: theme.fontWeights.bold,
    },
    subtitle: {
        marginTop: theme.spacing.xs,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
    },
    modeIcon: {
        width: 46,
        height: 46,
        borderRadius: theme.radii.md,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        borderWidth: 1,
        borderRadius: theme.radii.lg,
        padding: theme.spacing.lg,
        ...theme.shadows.small,
    },
    statGrid: { flexDirection: "row", gap: theme.spacing.sm },
    statCard: {
        flex: 1,
        minHeight: 126,
        borderWidth: 1,
        borderRadius: theme.radii.md,
        padding: theme.spacing.md,
    },
    statIcon: {
        width: 34,
        height: 34,
        borderRadius: theme.radii.sm,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: theme.spacing.sm,
    },
    statValue: {
        fontSize: theme.fontSizes.xl,
        fontWeight: theme.fontWeights.bold,
    },
    statLabel: {
        marginTop: 2,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
    },
    smallHeading: {
        marginBottom: theme.spacing.sm,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.semibold,
    },
    chipRow: { gap: theme.spacing.sm, paddingRight: theme.spacing.lg },
    filterChip: {
        borderWidth: 1,
        borderRadius: theme.radii.full,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: 10,
    },
    filterChipText: {
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.semibold,
    },
    banner: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: theme.radii.lg,
        padding: theme.spacing.md,
    },
    bannerIcon: {
        width: 42,
        height: 42,
        borderRadius: theme.radii.md,
        alignItems: "center",
        justifyContent: "center",
    },
    bannerCopy: { flex: 1, marginHorizontal: theme.spacing.md },
    bannerTitle: {
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.bold,
    },
    bannerText: {
        marginTop: 2,
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
    },
    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.lg,
    },
    settingCopy: { flex: 1 },
    settingTitle: {
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.semibold,
    },
    settingDescription: {
        marginTop: theme.spacing.xs,
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
    },
    sectionLabel: {
        marginBottom: -theme.spacing.sm,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.bold,
        letterSpacing: 1.2,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: theme.spacing.sm,
    },
    cardTitle: {
        fontSize: theme.fontSizes.lg,
        lineHeight: theme.lineHeights.lg,
        fontWeight: theme.fontWeights.bold,
    },
    cardSubtitle: { marginTop: 2, fontSize: theme.fontSizes.sm },
    countBadge: {
        borderRadius: theme.radii.full,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
    countText: {
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.bold,
    },
    inventoryRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.spacing.md,
    },
    emojiBox: {
        width: 46,
        height: 46,
        borderRadius: theme.radii.md,
        alignItems: "center",
        justifyContent: "center",
    },
    emoji: { fontSize: 24 },
    itemCopy: { flex: 1, marginHorizontal: theme.spacing.md },
    itemName: {
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.semibold,
    },
    itemDetail: { marginTop: 2, fontSize: theme.fontSizes.xs },
    statusChip: {
        maxWidth: 90,
        borderRadius: theme.radii.full,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 6,
    },
    statusText: {
        textAlign: "center",
        fontSize: 10,
        fontWeight: theme.fontWeights.bold,
    },
    divider: { height: StyleSheet.hairlineWidth, marginLeft: 58 },
    fullDivider: { height: StyleSheet.hairlineWidth },
    progressValue: {
        fontSize: theme.fontSizes.xl,
        fontWeight: theme.fontWeights.bold,
    },
    progressTrack: {
        height: 10,
        borderRadius: theme.radii.full,
        overflow: "hidden",
        marginTop: theme.spacing.md,
    },
    progressFill: {
        width: "67%",
        height: "100%",
        borderRadius: theme.radii.full,
    },
    legendRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.spacing.lg,
        marginTop: theme.spacing.md,
    },
    legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
    legendDot: { width: 8, height: 8, borderRadius: theme.radii.full },
    legendText: { fontSize: theme.fontSizes.xs },
    previewSettingRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: theme.spacing.md,
    },
    settingIcon: {
        width: 42,
        height: 42,
        borderRadius: theme.radii.md,
        alignItems: "center",
        justifyContent: "center",
    },
    settingRowCopy: { flex: 1, marginHorizontal: theme.spacing.md },
    typeDisplay: {
        marginTop: theme.spacing.lg,
        fontSize: theme.fontSizes.xl,
        lineHeight: theme.lineHeights.xl,
        fontWeight: theme.fontWeights.bold,
    },
    typeBody: {
        marginTop: theme.spacing.md,
        fontSize: theme.fontSizes.md,
        lineHeight: theme.lineHeights.md,
    },
    typeCaption: {
        marginTop: theme.spacing.md,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.fontWeights.semibold,
        letterSpacing: 0.6,
    },
    emptyState: { alignItems: "center" },
    emptyIcon: {
        width: 72,
        height: 72,
        borderRadius: theme.radii.full,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyTitle: {
        marginTop: theme.spacing.md,
        fontSize: theme.fontSizes.lg,
        fontWeight: theme.fontWeights.bold,
    },
    emptyText: {
        marginTop: theme.spacing.xs,
        maxWidth: 260,
        textAlign: "center",
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
    },
    compactButton: {
        minHeight: theme.componentSizes.compactButtonHeight,
        borderRadius: theme.radii.md,
        justifyContent: "center",
        marginTop: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
    },
    compactButtonText: {
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.bold,
    },
    fieldLabel: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.semibold,
    },
    inputContainer: {
        height: theme.componentSizes.inputHeight,
        borderWidth: 1,
        borderRadius: theme.radii.md,
        paddingHorizontal: theme.spacing.md,
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.sm,
    },
    input: { flex: 1, height: "100%", fontSize: theme.fontSizes.md },
    actions: {
        flexDirection: "row",
        gap: theme.spacing.md,
        marginTop: theme.spacing.lg,
    },
    primaryButton: {
        flex: 1,
        height: theme.componentSizes.buttonHeight,
        borderRadius: theme.radii.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.sm,
    },
    primaryButtonText: {
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.bold,
    },
    secondaryButton: {
        flex: 1,
        height: theme.componentSizes.buttonHeight,
        borderWidth: 1,
        borderRadius: theme.radii.md,
        alignItems: "center",
        justifyContent: "center",
    },
    secondaryButtonText: {
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.semibold,
    },
    disabledButton: {
        height: theme.componentSizes.buttonHeight,
        borderRadius: theme.radii.md,
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing.md,
        opacity: theme.opacity.disabled,
    },
    disabledButtonText: {
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.semibold,
    },
    dangerButton: {
        height: theme.componentSizes.buttonHeight,
        borderWidth: 1,
        borderRadius: theme.radii.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.sm,
        marginTop: theme.spacing.md,
    },
    dangerButtonText: {
        color: theme.colors.error,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.semibold,
    },
    pressed: { opacity: theme.opacity.pressed },
    previewNote: {
        paddingHorizontal: theme.spacing.md,
        textAlign: "center",
        fontSize: theme.fontSizes.xs,
        lineHeight: theme.lineHeights.xs,
    },
});
