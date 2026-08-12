import { StyleSheet } from "react-native";

import { AttentionCard } from "@/components/home/attention-card";
import { DailyFridgeInsight, FridgeStatusCard } from "@/components/home/fridge-status-card";
import KitchenOverviewCard from "@/components/home/kitchen-overview-card";
import SavingsStreakCard from "@/components/home/savings-streak-card";
import SmartGroceryCard from "@/components/home/smart-grocery-card";
import { TonightRecommendation, TonightRecommendationCard } from "@/components/home/tonight-recommendation-card";
import WeeklyInsightsCard from "@/components/home/weekly-usage-data";
import { Screen } from "@/components/ui/screen";
import ChefTipModal from "@/constants/chef-tip-modal";
import { Spacer } from "@/constants/Spacer";
import {
    colors,
    fontSizes,
    fontWeights,
    lineHeights,
    radii,
    shadows,
    spacing
} from "@/styles/theme";
import { router } from "expo-router";
import { PageHeader } from "../../components/navigation/screen-header";

// Greeting function for the home screen
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

const dailyInsights: DailyFridgeInsight[] = [
    {
        icon: "restaurant-outline",
        status: "Use soon",
        headline: "Your chicken expires tomorrow.",
        description:
            "You already have everything needed for",
        recipeName: "Creamy Garlic Chicken Pasta",
        duration: "28 min",
        matchPercentage: 98,
        buttonLabel: "Start cooking",
    },
    {
        icon: "leaf-outline",
        status: "Fresh pick",
        headline: "Your spinach is at its best today.",
        description:
            "Use it while it is fresh in a quick",
        recipeName: "Spinach and Feta Omelet",
        duration: "15 min",
        matchPercentage: 94,
        buttonLabel: "View recipe",
    },
    {
        icon: "warning-outline",
        status: "Running low",
        headline: "You only have one egg left.",
        description:
            "Add eggs to your next shopping trip or make",
        recipeName: "Avocado Breakfast Toast",
        duration: "12 min",
        matchPercentage: 91,
        buttonLabel: "View meal",
    },
    {
        icon: "snow-outline",
        status: "Freezer find",
        headline: "Your frozen salmon is ready to use.",
        description:
            "Pair it with your rice and vegetables for",
        recipeName: "Honey Garlic Salmon Bowl",
        duration: "32 min",
        matchPercentage: 96,
        buttonLabel: "Start cooking",
    },
    {
        icon: "sparkles-outline",
        status: "Perfect match",
        headline: "You can make dinner without shopping.",
        description:
            "Your current ingredients are a great match for",
        recipeName: "One-Pan Chicken Fried Rice",
        duration: "25 min",
        matchPercentage: 100,
        buttonLabel: "Cook this meal",
    },
];

const attentionItems = [
    {
        id: "avocados",
        emoji: "🥑",
        name: "Avocados",
        message: "2 days left",
    },
    {
        id: "chicken",
        emoji: "🍗",
        name: "Chicken",
        message: "Expires tomorrow",
    },
    {
        id: "spinach",
        emoji: "🥬",
        name: "Spinach",
        message: "Running low",
    },
];

const tonightRecommendation: TonightRecommendation = {
    icon: "restaurant-outline",
    recipeName: "Creamy Chicken Pasta",
    matchPercentage: 98,
    duration: "25 min",
    ingredients: [
        "Chicken",
        "Milk",
        "Garlic",
    ],
    buttonLabel: "Cook now",
};

const grocerySuggestions = [
    {
        id: "onion",
        name: "Onion",
        icon: "leaf-outline" as const,
    },
    {
        id: "parmesan",
        name: "Parmesan",
        icon: "restaurant-outline" as const,
    },
];

const weeklyProduceUsage = [
    { id: "mon", day: "M", percentage: 62 },
    { id: "tue", day: "T", percentage: 78 },
    { id: "wed", day: "W", percentage: 70 },
    { id: "thu", day: "T", percentage: 88 },
    { id: "fri", day: "F", percentage: 82 },
    { id: "sat", day: "S", percentage: 96 },
    { id: "sun", day: "S", percentage: 92 },
];

export default function HomeScreen() {
    return (
        <Screen
            scrollable
            padded={false}
            backgroundColor={colors.background}
            contentContainerStyle={styles.content}
        >
            <ChefTipModal />
            
            <PageHeader
                eyebrow={getGreeting().toUpperCase()}
                title="Hello, Shuaib 👋"
                description="Let’s see what is happening in your fridge."
                icon="person-outline"
                accessibilityLabel="Open profile"
                onPress={() => router.push("/profile")}
            />

            <FridgeStatusCard
                insights={dailyInsights}
                autoRotateInterval={6500}
                onStartCooking={(insight) => {

                }}
            />

            <Spacer size={25} />

            <AttentionCard
                items={attentionItems}
                onItemPress={(item) => {

                }}
                onViewAll={() => {
                    router.push("/inventory");
                }}
            />

            <Spacer size={25} />

            <TonightRecommendationCard
                recommendation={tonightRecommendation}
                onCookNow={(recipe) => {

                }}
            />

            <Spacer size={50} />

            <KitchenOverviewCard
                totalItems={24}
                expiringSoon={3}
                runningLow={2}
                onPress={() => {
                    router.push("/inventory");
                }}
            />

            <Spacer size={25} />

            <SmartGroceryCard
                items={grocerySuggestions}
                estimatedPrice={7.2}
                storeName="Safeway"
                onPress={() => {
                    router.push("/profile");
                }}
            />

            <Spacer size={25} />

            <SavingsStreakCard
                foodsSaved={14}
                estimatedSavings={43}
                mealsCooked={6}
                streakDays={4}
                onPress={() => {
                }}
            />

            <Spacer size={70} />

            <WeeklyInsightsCard
                produceUsagePercentage={92}
                produceUsed={23}
                produceWasted={2}
                changeFromLastWeek={8}
                weeklyData={weeklyProduceUsage}
                onPress={() => {
                }}
            />
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
});