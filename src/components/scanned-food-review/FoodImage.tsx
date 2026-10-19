
import { colors, iconSizes } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { memo, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from "react-native";

type FoodImageProps = {
    imageUrl?: string | null;
};

function FoodImage({
    imageUrl,
}: FoodImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const hasImage = Boolean(imageUrl?.trim());
    const showImage = hasImage && !hasError;

    return (
        <View style={styles.foodIcon}>
            {showImage ? (
                <>
                    <Image
                        source={{ uri: imageUrl! }}
                        style={styles.image}
                        contentFit="contain"
                        cachePolicy="memory-disk"
                        recyclingKey={imageUrl!}
                        onLoadStart={() => {
                            setIsLoading(true);
                        }}
                        onLoad={() => {
                            setIsLoading(false);
                        }}
                        onError={() => {
                            setHasError(true);
                            setIsLoading(false);
                        }}
                    />

                    {isLoading && (
                        <View style={styles.loaderOverlay}>
                            <ActivityIndicator
                                size="small"
                                color={colors.primaryDark}
                            />
                        </View>
                    )}
                </>
            ) : (
                <Ionicons
                    name="nutrition-outline"
                    size={iconSizes.lg}
                    color={colors.primaryDark}
                />
            )}
        </View>
    );
}

export default memo(FoodImage);

const styles = StyleSheet.create({
    foodIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    loaderOverlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
    },
});
