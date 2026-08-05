
import { colors } from "@/styles/theme";
import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type ModalBackdropProps = {
    onClose: () => void;
};

export function ModalBackdrop({ onClose }: ModalBackdropProps) {
    return (
        <Animated.View
            entering={FadeIn.duration(180)}
            exiting={FadeOut.duration(160)}
            style={styles.backdrop}
        >
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close add manually modal"
                onPress={onClose}
                style={StyleSheet.absoluteFill}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: colors.overlay,
    },
})