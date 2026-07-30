import {
    forwardRef,
    type PropsWithChildren,
    type ReactNode,
} from "react";
import {
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
    type ScrollViewProps,
    type ViewStyle,
} from "react-native";
import {
    SafeAreaView,
    type Edge,
} from "react-native-safe-area-context";

type ScreenProps = PropsWithChildren<{
    // Enables vertical scrolling.
    scrollable?: boolean;

    // Adds standard horizontal and vertical padding.
    padded?: boolean;

    // Enables keyboard avoidance.
    avoidKeyboard?: boolean;

    // Safe-area edges that should be respected.
    edges?: Edge[];

    // Background color for the entire screen.
    backgroundColor?: string;

    // Style applied to the SafeAreaView.
    style?: ViewStyle;

    // Style applied to the inner content container.
    contentContainerStyle?: ViewStyle;
    // Optional content rendered above the main screen content.
    header?: ReactNode;

    // Optional content rendered below the main screen content.
    footer?: ReactNode;
    // Pull-to-refresh loading state.
    refreshing?: boolean;

    // Pull-to-refresh callback.
    onRefresh?: () => void;

    // Additional ScrollView properties.
    scrollViewProps?: Omit<
        ScrollViewProps,
        "contentContainerStyle" | "refreshControl"
    >;
}>;

export const Screen = forwardRef<ScrollView, ScreenProps>(
    function Screen(
        {
            children,
            scrollable = false,
            padded = true,
            avoidKeyboard = true,
            edges = ["top", "left", "right"],
            backgroundColor = "#FFFFFF",
            style,
            contentContainerStyle,
            header,
            footer,
            refreshing = false,
            onRefresh,
            scrollViewProps,
        },
        ref,
    ) {
        const contentStyles = [
            styles.content,
            !scrollable && styles.fill,
            padded && styles.padded,
            contentContainerStyle,
        ];

        const content = scrollable ? (
            <ScrollView
                ref={ref}
                style={styles.scrollView}
                contentContainerStyle={contentStyles}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode={
                    Platform.OS === "ios" ? "interactive" : "on-drag"
                }
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior="automatic"
                refreshControl={
                    onRefresh ? (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    ) : undefined
                }
                {...scrollViewProps}
            >
                {children}
            </ScrollView>
        ) : (
            <View style={contentStyles}>{children}</View>
        );

        return (
            <SafeAreaView
                edges={edges}
                style={[
                    styles.safeArea,
                    { backgroundColor },
                    style,
                ]}
            >
                {header}

                {avoidKeyboard ? (
                    <KeyboardAvoidingView
                        style={styles.keyboardView}
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                    >
                        {content}
                    </KeyboardAvoidingView>
                ) : (
                    content
                )}

                {footer}
            </SafeAreaView>
        );
    },
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    keyboardView: {
        flex: 1,
    },

    scrollView: {
        flex: 1,
    },

    content: {
        width: "100%",
    },

    fill: {
        flex: 1,
    },

    padded: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
});