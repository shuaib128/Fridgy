import { useLocalSearchParams } from "expo-router";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { theme } from "@/styles/theme";

export default function FoodPreviewScreen() {
    const { barcode } = useLocalSearchParams<{
        barcode: string;
    }>();

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