import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ExpirationOption, EXPIRATION_OPTIONS } from "@/types/inventory-item";
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

const QUICK_DATE_OPTIONS = [
    { label: "In 3 days", days: 3 },
    { label: "Next week", days: 7 },
    { label: "In 2 weeks", days: 14 },
];

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

type ExpirationSectionProps = {
    selectedExpiration: ExpirationOption;
    customDate: Date | null;
    onSelect: (expiration: ExpirationOption) => void;
    onCustomDateChange: (date: Date) => void;
};

export function ExpirationSection({
    selectedExpiration,
    customDate,
    onSelect,
    onCustomDateChange,
}: ExpirationSectionProps) {
    return (
        <Animated.View
            entering={FadeInDown.duration(360)}
            style={styles.section}
        >
            <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>When does it expire?</Text>
                <Text style={styles.sectionDescription}>
                    A quick estimate is enough.
                </Text>
            </View>

            <View style={styles.expirationGrid}>
                {EXPIRATION_OPTIONS.map((option) => {
                    const selected = selectedExpiration === option.id;

                    return (
                        <Pressable
                            key={option.id}
                            accessibilityRole="button"
                            accessibilityLabel={option.label}
                            accessibilityState={{ selected }}
                            onPress={() => onSelect(option.id)}
                            style={({ pressed }) => [
                                styles.expirationOption,
                                selected && styles.expirationOptionSelected,
                                pressed && styles.pressed,
                            ]}
                        >
                            <View
                                style={[
                                    styles.radioOuter,
                                    selected && styles.radioOuterSelected,
                                ]}
                            >
                                {selected ? <View style={styles.radioInner} /> : null}
                            </View>

                            <Text
                                style={[
                                    styles.expirationText,
                                    selected && styles.expirationTextSelected,
                                ]}
                            >
                                {option.label}
                            </Text>

                            {option.id === "pick-date" ? (
                                <Ionicons
                                    name="calendar-outline"
                                    size={iconSizes.sm}
                                    color={
                                        selected
                                            ? colors.textInverse
                                            : colors.primary
                                    }
                                />
                            ) : null}
                        </Pressable>
                    );
                })}
            </View>

            {selectedExpiration === "pick-date" ? (
                <CustomDatePicker
                    value={customDate}
                    onChange={onCustomDateChange}
                />
            ) : null}
        </Animated.View>
    );
}

type CustomDatePickerProps = {
    value: Date | null;
    onChange: (date: Date) => void;
};

function CustomDatePicker({ value, onChange }: CustomDatePickerProps) {
    const selectedDate = value ?? getDefaultCustomDate();
    const minimumDate = getStartOfToday();
    const [visibleMonth, setVisibleMonth] = useState(() =>
        getStartOfMonth(selectedDate),
    );

    useEffect(() => {
        setVisibleMonth(getStartOfMonth(selectedDate));
    }, [selectedDate.getFullYear(), selectedDate.getMonth()]);

    const calendarDays = useMemo(
        () => getCalendarDays(visibleMonth),
        [visibleMonth],
    );

    const formattedWeekday = selectedDate.toLocaleDateString(undefined, {
        weekday: "long",
    });

    const formattedDate = selectedDate.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const monthLabel = visibleMonth.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
    });

    const previousMonthDisabled = isSameMonth(visibleMonth, minimumDate);

    const selectDate = (date: Date) => {
        if (isBeforeCalendarDay(date, minimumDate)) {
            return;
        }

        const normalizedDate = new Date(date);
        normalizedDate.setHours(12, 0, 0, 0);
        onChange(normalizedDate);
    };

    const selectQuickDate = (days: number) => {
        const nextDate = getStartOfToday();
        nextDate.setDate(nextDate.getDate() + days);
        nextDate.setHours(12, 0, 0, 0);
        onChange(nextDate);
    };

    const changeMonth = (amount: number) => {
        setVisibleMonth((current) => {
            const next = new Date(current);
            next.setMonth(next.getMonth() + amount);
            return getStartOfMonth(next);
        });
    };

    return (
        <Animated.View
            entering={FadeInDown.duration(240)}
            style={styles.customDateCard}
        >
            <View style={styles.customDateHeader}>
                <View style={styles.customDateIcon}>
                    <Ionicons
                        name="calendar"
                        size={iconSizes.md}
                        color={colors.primaryDark}
                    />
                </View>

                <View style={styles.customDateHeaderText}>
                    <Text style={styles.customDateEyebrow}>
                        Selected expiration
                    </Text>
                    <Text style={styles.customDateTitle}>{formattedWeekday}</Text>
                    <Text style={styles.customDateValue}>{formattedDate}</Text>
                </View>

                <View style={styles.customDateCheck}>
                    <Ionicons
                        name="checkmark"
                        size={iconSizes.xs}
                        color={colors.primaryDark}
                    />
                </View>
            </View>

            <View style={styles.quickDateContainer}>
                {QUICK_DATE_OPTIONS.map((option) => {
                    const optionDate = getStartOfToday();
                    optionDate.setDate(optionDate.getDate() + option.days);

                    const selected = isSameCalendarDay(selectedDate, optionDate);

                    return (
                        <Pressable
                            key={option.label}
                            accessibilityRole="button"
                            accessibilityLabel={option.label}
                            accessibilityState={{ selected }}
                            onPress={() => selectQuickDate(option.days)}
                            style={({ pressed }) => [
                                styles.quickDateChip,
                                selected && styles.quickDateChipSelected,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.quickDateChipText,
                                    selected && styles.quickDateChipTextSelected,
                                ]}
                            >
                                {option.label}
                            </Text>

                            {selected ? (
                                <Ionicons
                                    name="checkmark-circle"
                                    size={iconSizes.xs}
                                    color={colors.accent}
                                />
                            ) : null}
                        </Pressable>
                    );
                })}
            </View>

            <View style={styles.calendarCard}>
                <View style={styles.calendarHeader}>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Previous month"
                        accessibilityState={{ disabled: previousMonthDisabled }}
                        disabled={previousMonthDisabled}
                        onPress={() => changeMonth(-1)}
                        hitSlop={spacing.sm}
                        style={({ pressed }) => [
                            styles.monthButton,
                            previousMonthDisabled && styles.monthButtonDisabled,
                            pressed && !previousMonthDisabled && styles.pressed,
                        ]}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={iconSizes.sm}
                            color={colors.primaryDark}
                        />
                    </Pressable>

                    <View style={styles.monthTitleWrap}>
                        <Text style={styles.monthTitle}>{monthLabel}</Text>
                        <Text style={styles.monthSubtitle}>Choose a date</Text>
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Next month"
                        onPress={() => changeMonth(1)}
                        hitSlop={spacing.sm}
                        style={({ pressed }) => [
                            styles.monthButton,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Ionicons
                            name="chevron-forward"
                            size={iconSizes.sm}
                            color={colors.primaryDark}
                        />
                    </Pressable>
                </View>

                <View style={styles.weekRow}>
                    {WEEK_DAYS.map((day, index) => (
                        <Text key={`${day}-${index}`} style={styles.weekDayText}>
                            {day}
                        </Text>
                    ))}
                </View>

                <View style={styles.daysGrid}>
                    {calendarDays.map((date) => {
                        const outsideMonth = !isSameMonth(date, visibleMonth);
                        const disabled = isBeforeCalendarDay(date, minimumDate);
                        const selected = isSameCalendarDay(date, selectedDate);
                        const today = isSameCalendarDay(date, minimumDate);

                        return (
                            <View key={date.toISOString()} style={styles.dayCell}>
                                <Pressable
                                    accessibilityRole="button"
                                    accessibilityLabel={date.toLocaleDateString(
                                        undefined,
                                        {
                                            weekday: "long",
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        },
                                    )}
                                    accessibilityState={{ selected, disabled }}
                                    disabled={disabled}
                                    onPress={() => selectDate(date)}
                                    style={({ pressed }) => [
                                        styles.dayButton,
                                        today && styles.todayButton,
                                        selected && styles.dayButtonSelected,
                                        pressed && !disabled && styles.dayButtonPressed,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.dayText,
                                            outsideMonth && styles.dayTextOutside,
                                            disabled && styles.dayTextDisabled,
                                            today && styles.todayText,
                                            selected && styles.dayTextSelected,
                                        ]}
                                    >
                                        {date.getDate()}
                                    </Text>

                                    {today && !selected ? (
                                        <View style={styles.todayDot} />
                                    ) : null}
                                </Pressable>
                            </View>
                        );
                    })}
                </View>
            </View>
        </Animated.View>
    );
}

function getStartOfToday() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
}

function getDefaultCustomDate() {
    const date = getStartOfToday();
    date.setDate(date.getDate() + 7);
    date.setHours(12, 0, 0, 0);
    return date;
}

function getStartOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getCalendarDays(month: Date) {
    const firstDay = getStartOfMonth(month);
    const calendarStart = new Date(firstDay);
    calendarStart.setDate(firstDay.getDate() - firstDay.getDay());

    return Array.from({ length: 42 }, (_, index) => {
        const date = new Date(calendarStart);
        date.setDate(calendarStart.getDate() + index);
        date.setHours(0, 0, 0, 0);
        return date;
    });
}

function isSameCalendarDay(first: Date, second: Date) {
    return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
    );
}

function isSameMonth(first: Date, second: Date) {
    return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth()
    );
}

function isBeforeCalendarDay(first: Date, second: Date) {
    const firstDay = new Date(
        first.getFullYear(),
        first.getMonth(),
        first.getDate(),
    );
    const secondDay = new Date(
        second.getFullYear(),
        second.getMonth(),
        second.getDate(),
    );

    return firstDay.getTime() < secondDay.getTime();
}

const styles = StyleSheet.create({
    section: {
        marginTop: spacing["3xl"],
    },
    sectionHeading: {
        marginBottom: spacing.md,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.lg,
        fontWeight: fontWeights.extraBold,
    },
    sectionDescription: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
    },
    expirationGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
    },
    expirationOption: {
        width: "48%",
        minHeight: 50,
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.lg,
        backgroundColor: colors.surface,
    },
    expirationOptionSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },
    radioOuter: {
        width: 19,
        height: 19,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: colors.borderStrong,
        borderRadius: radii.full,
    },
    radioOuterSelected: {
        borderColor: colors.accent,
    },
    radioInner: {
        width: 9,
        height: 9,
        borderRadius: radii.full,
        backgroundColor: colors.accent,
    },
    expirationText: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.bold,
    },
    expirationTextSelected: {
        color: colors.textInverse,
    },
    customDateCard: {
        marginTop: spacing.md,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.xl,
        backgroundColor: colors.surface,
        ...shadows.small,
    },
    customDateHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },
    customDateIcon: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.lg,
        backgroundColor: colors.accent,
    },
    customDateHeaderText: {
        flex: 1,
    },
    customDateEyebrow: {
        color: colors.primary,
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.bold,
        textTransform: "uppercase",
        letterSpacing: 0.7,
    },
    customDateTitle: {
        marginTop: 2,
        color: colors.text,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.lg,
        fontWeight: fontWeights.extraBold,
    },
    customDateValue: {
        marginTop: 2,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.medium,
    },
    customDateCheck: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
    },
    quickDateContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
        marginTop: spacing.lg,
    },
    quickDateChip: {
        minHeight: 38,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.full,
        backgroundColor: colors.surfaceSoft,
    },
    quickDateChipSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },
    quickDateChipText: {
        color: colors.textSecondary,
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.bold,
    },
    quickDateChipTextSelected: {
        color: colors.textInverse,
    },
    calendarCard: {
        marginTop: spacing.lg,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.xl,
        backgroundColor: colors.background,
    },
    calendarHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: spacing.md,
    },
    monthButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.full,
        backgroundColor: colors.surface,
        ...shadows.small,
    },
    monthButtonDisabled: {
        opacity: opacity.disabled,
    },
    monthTitleWrap: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: spacing.sm,
    },
    monthTitle: {
        color: colors.text,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        fontWeight: fontWeights.extraBold,
    },
    monthSubtitle: {
        marginTop: 1,
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.medium,
    },
    weekRow: {
        flexDirection: "row",
        marginBottom: spacing.xs,
    },
    weekDayText: {
        width: "14.2857%",
        textAlign: "center",
        color: colors.primary,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.extraBold,
    },
    daysGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    dayCell: {
        width: "14.2857%",
        aspectRatio: 1,
        padding: 2,
    },
    dayButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radii.full,
    },
    dayButtonPressed: {
        backgroundColor: colors.accentLight,
    },
    dayButtonSelected: {
        backgroundColor: colors.primary,
        ...shadows.small,
    },
    todayButton: {
        borderWidth: 1.5,
        borderColor: colors.accentDark,
    },
    dayText: {
        color: colors.textSecondary,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        fontWeight: fontWeights.semibold,
    },
    dayTextOutside: {
        color: colors.borderStrong,
    },
    dayTextDisabled: {
        color: colors.border,
    },
    dayTextSelected: {
        color: colors.textInverse,
        fontWeight: fontWeights.extraBold,
    },
    todayText: {
        color: colors.primaryDark,
        fontWeight: fontWeights.extraBold,
    },
    todayDot: {
        position: "absolute",
        bottom: 5,
        width: 4,
        height: 4,
        borderRadius: radii.full,
        backgroundColor: colors.accentDark,
    },
    pressed: {
        opacity: opacity.pressed,
    },
});
