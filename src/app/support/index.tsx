import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { Screen } from "@/components/ui/screen";
import { theme } from "@/styles/theme";

type FAQItem = {
    id: string;
    question: string;
    answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
    {
        id: "1",
        question: "How do I add food to my inventory?",
        answer:
            "Go to the Add tab and enter the food information. Once saved, the item will appear in your inventory.",
    },
    {
        id: "2",
        question: "How does Fridgy track expiration dates?",
        answer:
            "Fridgy uses the expiration date you provide to show which items are expiring soon.",
    },
    {
        id: "3",
        question: "Can I change my preferred stores?",
        answer:
            "Yes. You can update your preferred stores from your profile and preferences.",
    },
    {
        id: "4",
        question: "How do meal suggestions work?",
        answer:
            "Meal suggestions are based on the food currently available in your inventory.",
    },
];

export default function SupportScreen() {
    const [openFAQ, setOpenFAQ] = useState<string | null>(null);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const toggleFAQ = (id: string) => {
        setOpenFAQ((current) =>
            current === id ? null : id
        );
    };

    const handleSubmit = () => {
        if (!message.trim()) {
            return;
        }

        console.log({
            subject,
            message,
        });

        // Later:
        // await sendSupportMessage({
        //     subject,
        //     message,
        // });

        setSubject("");
        setMessage("");
    };

    return (
        <Screen padded={false}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Pressable
                            onPress={() => router.back()}
                            style={styles.backButton}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={theme.iconSizes.md}
                                color={theme.colors.text}
                            />
                        </Pressable>

                        <View>
                            <Text style={styles.title}>
                                Help & Support
                            </Text>

                            <Text style={styles.subtitle}>
                                Find answers or get in touch
                            </Text>
                        </View>
                    </View>

                    {/* FAQ */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionIcon}>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={theme.iconSizes.md}
                                    color={theme.colors.primaryDark}
                                />
                            </View>

                            <View>
                                <Text style={styles.sectionTitle}>
                                    Frequently Asked Questions
                                </Text>

                                <Text style={styles.sectionDescription}>
                                    Quick answers to common questions
                                </Text>
                            </View>
                        </View>

                        <View style={styles.faqCard}>
                            {FAQ_ITEMS.map((item, index) => {
                                const isOpen = openFAQ === item.id;

                                return (
                                    <View
                                        key={item.id}
                                        style={[
                                            styles.faqItem,
                                            index !== FAQ_ITEMS.length - 1 &&
                                            styles.faqBorder,
                                        ]}
                                    >
                                        <Pressable
                                            onPress={() =>
                                                toggleFAQ(item.id)
                                            }
                                            style={({ pressed }) => [
                                                styles.faqButton,
                                                pressed &&
                                                styles.pressed,
                                            ]}
                                        >
                                            <Text
                                                style={styles.faqQuestion}
                                            >
                                                {item.question}
                                            </Text>

                                            <Ionicons
                                                name={
                                                    isOpen
                                                        ? "chevron-up"
                                                        : "chevron-down"
                                                }
                                                size={theme.iconSizes.sm}
                                                color={
                                                    theme.colors.textMuted
                                                }
                                            />
                                        </Pressable>

                                        {isOpen && (
                                            <Text style={styles.faqAnswer}>
                                                {item.answer}
                                            </Text>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    </View>

                    {/* Contact Support */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionIcon}>
                                <Ionicons
                                    name="chatbubble-ellipses-outline"
                                    size={theme.iconSizes.md}
                                    color={theme.colors.primaryDark}
                                />
                            </View>

                            <View style={styles.sectionHeaderText}>
                                <Text style={styles.sectionTitle}>
                                    Contact Support
                                </Text>

                                <Text style={styles.sectionDescription}>
                                    Still need help? Send us a message
                                </Text>
                            </View>
                        </View>

                        <View style={styles.formCard}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    Subject
                                </Text>

                                <TextInput
                                    value={subject}
                                    onChangeText={setSubject}
                                    placeholder="What do you need help with?"
                                    placeholderTextColor={
                                        theme.colors.textMuted
                                    }
                                    style={styles.input}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    Message
                                </Text>

                                <TextInput
                                    value={message}
                                    onChangeText={setMessage}
                                    placeholder="Tell us what's going on..."
                                    placeholderTextColor={
                                        theme.colors.textMuted
                                    }
                                    multiline
                                    textAlignVertical="top"
                                    style={[
                                        styles.input,
                                        styles.messageInput,
                                    ]}
                                />
                            </View>

                            <Pressable
                                onPress={handleSubmit}
                                style={({ pressed }) => [
                                    styles.submitButton,
                                    pressed && styles.pressed,
                                    !message.trim() &&
                                    styles.disabledButton,
                                ]}
                                disabled={!message.trim()}
                            >
                                <Ionicons
                                    name="send-outline"
                                    size={theme.iconSizes.sm}
                                    color={theme.colors.textInverse}
                                />

                                <Text style={styles.submitButtonText}>
                                    Send Message
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.spacing["4xl"],
        gap: theme.spacing["3xl"],
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.md,
        paddingTop: theme.spacing.md,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: theme.radii.full,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.surfaceSoft,
    },

    title: {
        fontSize: theme.fontSizes["2xl"],
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.text,
    },

    subtitle: {
        marginTop: theme.spacing.xs,
        fontSize: theme.fontSizes.sm,
        color: theme.colors.textMuted,
    },

    // Sections
    section: {
        gap: theme.spacing.md,
        marginTop: 20
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.md,
    },

    sectionHeaderText: {
        flex: 1,
    },

    sectionIcon: {
        width: 44,
        height: 44,
        borderRadius: theme.radii.md,
        backgroundColor: theme.colors.backgroundMuted,
        alignItems: "center",
        justifyContent: "center",
    },

    sectionTitle: {
        fontSize: theme.fontSizes.lg,
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.text,
    },

    sectionDescription: {
        marginTop: 2,
        fontSize: theme.fontSizes.sm,
        color: theme.colors.textMuted,
    },

    // FAQ
    faqCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        overflow: "hidden",
    },

    faqItem: {
        paddingHorizontal: theme.spacing.lg,
    },

    faqBorder: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },

    faqButton: {
        minHeight: 62,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing.md,
    },

    faqQuestion: {
        flex: 1,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.text,
    },

    faqAnswer: {
        paddingBottom: theme.spacing.lg,
        paddingRight: theme.spacing["2xl"],
        fontSize: theme.fontSizes.sm,
        lineHeight: theme.lineHeights.sm,
        color: theme.colors.textSecondary,
    },

    // Form
    formCard: {
        padding: theme.spacing.lg,
        gap: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },

    inputGroup: {
        gap: theme.spacing.sm,
    },

    label: {
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.textSecondary,
    },

    input: {
        height: theme.componentSizes.inputHeight,
        paddingHorizontal: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radii.md,
        backgroundColor: theme.colors.surfaceSoft,
        color: theme.colors.text,
        fontSize: theme.fontSizes.md,
    },

    messageInput: {
        height: 120,
        paddingTop: theme.spacing.md,
    },

    submitButton: {
        height: theme.componentSizes.buttonHeight,
        borderRadius: theme.radii.md,
        backgroundColor: theme.colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.sm,
    },

    submitButtonText: {
        color: theme.colors.textInverse,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.semibold,
    },

    pressed: {
        opacity: theme.opacity.pressed,
    },

    disabledButton: {
        opacity: theme.opacity.disabled,
    },
});