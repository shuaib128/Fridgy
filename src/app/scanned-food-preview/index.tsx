import api from "@/hooks/api";
import { theme } from "@/styles/theme";
import { Food } from "@/types/food";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function FoodPreviewScreen() {
    const { barcode } = useLocalSearchParams<{
        barcode: string;
    }>();

    useEffect(() => {
        if (!barcode) return;

        async function fetchFood() {
            try {
                const food = await api.get<Food>(
                    `/foods/search/barcode?barcode=${encodeURIComponent(barcode)}`,
                );

                console.log("Food data:", food);
            } catch (error) {
                console.error("Failed to fetch food:", error);
            }
        }

        fetchFood();
    }, [barcode]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Food Preview
            </Text>

            <Text style={styles.barcode}>
                Barcode: {barcode}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
    },

    title: {
        fontSize: theme.fontSizes.xl,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.lg,
    },

    barcode: {
        fontSize: theme.fontSizes.md,
        color: theme.colors.textSecondary,
    },
});
