import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

import { Screen } from "@/components/ui/screen";
import { useUserStore } from "@/stores/auth-store";
import { useRouter } from "expo-router";

import {
    signInWithGoogle
} from "@/auth/google-auth";
import {
    colors,
    componentSizes,
    fontSizes,
    fontWeights,
    iconSizes,
    lineHeights,
    opacity,
    radii,
    shadows,
    spacing,
} from "@/styles/theme";

const googleColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853",
} as const;

function GoogleColorDots() {
    return (
        <View style={styles.googleColorDots}>
            <View style={[styles.googleColorDot, styles.googleBlue]} />
            <View style={[styles.googleColorDot, styles.googleRed]} />
            <View style={[styles.googleColorDot, styles.googleYellow]} />
            <View style={[styles.googleColorDot, styles.googleGreen]} />
        </View>
    );
}

export default function LoginScreen() {
    const router = useRouter();

    const setUser = useUserStore((state) => state.setUser);
    const [loading, setLoading] = useState(false);

    const getSignInErrorMessage = (error: unknown): string => {
        if (!(error instanceof Error)) {
            return "Something went wrong. Please try again.";
        }

        const message = error.message.toLowerCase();

        if (
            message.includes("cancel") ||
            message.includes("sign_in_cancelled")
        ) {
            return "";
        }

        if (
            message.includes("network request failed") ||
            message.includes("failed to fetch") ||
            message.includes("network error")
        ) {
            return "Unable to reach Fridgy. Check your internet connection and make sure the server is running.";
        }

        if (
            message.includes("timeout") ||
            message.includes("aborted")
        ) {
            return "The server took too long to respond. Please try again.";
        }

        return "We couldn't sign you in right now. Please try again shortly.";
    };

    const handleGoogleSignIn = async (): Promise<void> => {
        if (loading) return;

        setLoading(true);

        try {
            const verifiedUser = await signInWithGoogle();

            // The user may have closed Google's sign-in window.
            if (!verifiedUser) {
                return;
            }

            setUser(verifiedUser);
            router.replace("/(tabs)");
        } catch (error) {
            console.error("Google sign-in failed:", error);

            const message = getSignInErrorMessage(error);

            // Don't show an error when the user intentionally cancelled.
            if (!message) {
                return;
            }

            Alert.alert(
                "Unable to sign in",
                message,
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Try Again",
                        onPress: () => {
                            void handleGoogleSignIn();
                        },
                    },
                ],
            );
        } finally {
            setLoading(false);
        }
    };

    // Logout handler
    const handleSignOut = async (): Promise<void> => { };

    return (
        <Screen
            padded={false}
            avoidKeyboard={false}
            backgroundColor={colors.background}
            contentContainerStyle={styles.container}
        >
            <View style={styles.hero}>
                <View style={styles.accentBubbleLeft} />
                <View style={styles.accentBubbleRight} />

                <View style={styles.logoWrap}>
                    <View style={styles.logo}>
                        <Ionicons
                            name="leaf"
                            color={colors.textInverse}
                            size={iconSizes["2xl"]}
                        />
                    </View>

                    <View style={styles.sparkleBadge}>
                        <Ionicons
                            name="sparkles"
                            color={colors.text}
                            size={iconSizes.sm}
                        />
                    </View>
                </View>

                <Text style={styles.eyebrow}>YOUR SMART KITCHEN</Text>
                <Text style={styles.title}>Welcome to Fridgy</Text>

                <Text style={styles.subtitle}>
                    Less food waste, more delicious meals. Let’s make your kitchen
                    smarter. 🌱
                </Text>
            </View>

            <View style={styles.authCard}>
                <GoogleColorDots />

                <Text style={styles.cardTitle}>Ready to get cooking?</Text>

                <Text style={styles.cardDescription}>
                    Sign in to save your kitchen and meal ideas.
                </Text>

                <Pressable
                    disabled={loading}
                    onPress={handleGoogleSignIn}
                    style={({ pressed }) => [
                        styles.googleButton,
                        pressed && styles.googleButtonPressed,
                        loading && styles.buttonDisabled,
                    ]}
                >
                    {loading ? (
                        <ActivityIndicator color={colors.white} />
                    ) : (
                        <>
                            <View style={styles.googleIconWrap}>
                                <Ionicons
                                    name="logo-google"
                                    color={googleColors.blue}
                                    size={iconSizes.md}
                                />
                            </View>

                            <Text style={styles.googleButtonText}>
                                Continue with Google
                            </Text>

                            <Ionicons
                                name="arrow-forward"
                                color={colors.white}
                                size={iconSizes.sm}
                            />
                        </>
                    )}
                </Pressable>

                <View style={styles.privacyRow}>
                    <Ionicons
                        name="shield-checkmark"
                        color={colors.primary}
                        size={iconSizes.xs}
                    />

                    <Text style={styles.privacyText}>
                        Secure sign-in — your password stays with Google
                    </Text>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing["3xl"],
    },
    hero: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    accentBubbleLeft: {
        position: "absolute",
        top: spacing["4xl"],
        left: -spacing["3xl"],
        width: 110,
        height: 110,
        borderRadius: radii.full,
        backgroundColor: colors.accentLight,
        opacity: opacity.muted,
    },
    accentBubbleRight: {
        position: "absolute",
        right: -spacing["4xl"],
        bottom: spacing["4xl"],
        width: 140,
        height: 140,
        borderRadius: radii.full,
        backgroundColor: colors.primaryLight,
        opacity: 0.18,
    },
    logoWrap: { marginBottom: spacing.xl },
    logo: {
        width: 96,
        height: 96,
        borderRadius: radii["2xl"],
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ rotate: "-4deg" }],
        ...shadows.large,
    },
    sparkleBadge: {
        position: "absolute",
        right: -spacing.sm,
        top: -spacing.sm,
        width: 36,
        height: 36,
        borderRadius: radii.full,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.accent,
        borderWidth: 3,
        borderColor: colors.background,
        ...shadows.small,
    },
    eyebrow: {
        color: colors.primaryDark,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        fontWeight: fontWeights.extraBold,
        letterSpacing: 1.8,
    },
    title: {
        marginTop: spacing.sm,
        color: colors.text,
        fontSize: fontSizes["3xl"],
        lineHeight: lineHeights["3xl"],
        fontWeight: fontWeights.extraBold,
        textAlign: "center",
    },
    subtitle: {
        maxWidth: 340,
        marginTop: spacing.md,
        color: colors.textMuted,
        fontSize: fontSizes.md,
        lineHeight: lineHeights.md,
        textAlign: "center",
    },
    authCard: {
        padding: spacing.xl,
        borderRadius: radii.xl,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadows.medium,
    },
    googleColorDots: {
        alignSelf: "center",
        flexDirection: "row",
        gap: spacing.xs,
        marginBottom: spacing.md,
    },
    googleColorDot: { width: 7, height: 7, borderRadius: radii.full },
    googleBlue: { backgroundColor: googleColors.blue },
    googleRed: { backgroundColor: googleColors.red },
    googleYellow: { backgroundColor: googleColors.yellow },
    googleGreen: { backgroundColor: googleColors.green },
    cardTitle: {
        color: colors.text,
        fontSize: fontSizes.xl,
        lineHeight: lineHeights.xl,
        fontWeight: fontWeights.bold,
        textAlign: "center",
    },
    cardDescription: {
        marginTop: spacing.sm,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.sm,
        textAlign: "center",
    },
    googleButton: {
        height: componentSizes.buttonHeight,
        marginTop: spacing.xl,
        paddingHorizontal: spacing.sm,
        borderRadius: radii.md,
        backgroundColor: googleColors.blue,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...shadows.small,
    },
    googleButtonPressed: {
        opacity: opacity.pressed,
        transform: [{ scale: 0.985 }],
    },
    googleIconWrap: {
        width: 38,
        height: 38,
        borderRadius: radii.sm,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
    },
    googleButtonText: {
        color: colors.white,
        fontSize: fontSizes.md,
        fontWeight: fontWeights.semibold,
    },
    privacyRow: {
        marginTop: spacing.lg,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xs,
    },
    privacyText: {
        color: colors.textMuted,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.xs,
        textAlign: "center",
    },
    profileCard: {
        marginTop: spacing["4xl"],
        padding: spacing["2xl"],
        alignItems: "center",
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        ...shadows.medium,
    },
    successBadge: {
        position: "absolute",
        right: spacing.xl,
        top: spacing.xl,
        width: 32,
        height: 32,
        borderRadius: radii.full,
        backgroundColor: colors.success,
        alignItems: "center",
        justifyContent: "center",
    },
    profileImage: { width: 88, height: 88, borderRadius: radii.full },
    profilePlaceholder: {
        width: 88,
        height: 88,
        borderRadius: radii.full,
        backgroundColor: colors.surfaceSoft,
        alignItems: "center",
        justifyContent: "center",
    },
    welcomeText: {
        marginTop: spacing.xl,
        color: colors.primary,
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.semibold,
    },
    userName: {
        marginTop: spacing.xs,
        color: colors.text,
        fontSize: fontSizes.xl,
        fontWeight: fontWeights.bold,
    },
    userEmail: {
        marginTop: spacing.xs,
        color: colors.textMuted,
        fontSize: fontSizes.sm,
    },
    signOutButton: {
        height: componentSizes.buttonHeight,
        alignSelf: "stretch",
        marginTop: spacing["2xl"],
        borderRadius: radii.md,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    signOutButtonText: {
        color: colors.textInverse,
        fontSize: fontSizes.md,
        fontWeight: fontWeights.semibold,
    },
    buttonPressed: { opacity: opacity.pressed },
    buttonDisabled: { opacity: opacity.disabled },
});
