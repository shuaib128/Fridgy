
import {
    BarcodeScanningResult,
    CameraView,
    useCameraPermissions,
} from "expo-camera";

import {
    useFocusEffect,
    useIsFocused,
    useRouter,
} from "expo-router";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    AppState,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";

import { theme } from "@/styles/theme";

export default function BarcodeCameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();

    const router = useRouter();
    const isFocused = useIsFocused();

    const scannedRef = useRef(false);

    const [hasScanned, setHasScanned] = useState(false);

    const [isAppActive, setIsAppActive] = useState(
        AppState.currentState === "active"
    );

    const { width } = useWindowDimensions();

    const scanWidth = Math.min(width - 48, 340);
    const scanHeight = 170;

    // Request camera permission when needed.
    useEffect(() => {
        if (permission?.status === "undetermined") {
            requestPermission();
        }
    }, [permission?.status, requestPermission]);

    // Stop the camera when the app enters the background.
    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            (nextAppState) => {
                setIsAppActive(nextAppState === "active");
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    // Reset scanner when returning to this screen.
    useFocusEffect(
        useCallback(() => {
            scannedRef.current = false;
            setHasScanned(false);

            return () => {
                scannedRef.current = true;
            };
        }, [])
    );

    // Camera only exists when all conditions are satisfied.
    const shouldRenderCamera =
        isFocused &&
        isAppActive &&
        !hasScanned;

    const handleBarcodeScanned = (
        result: BarcodeScanningResult
    ) => {
        // Prevent duplicate barcode events.
        if (scannedRef.current) {
            return;
        }

        // Immediately block additional scan events.
        scannedRef.current = true;

        // Trigger camera unmount on the next render.
        setHasScanned(true);

        console.log("Barcode:", result.data);
        console.log("Type:", result.type);

        router.push({
            pathname: "/scanned-food-preview",
            params: {
                barcode: result.data,
            },
        });
    };

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.instruction}>
                    Camera permission is required.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Only mount camera when needed */}
            {shouldRenderCamera && (
                <CameraView
                    style={StyleSheet.absoluteFill}
                    facing="back"
                    barcodeScannerSettings={{
                        barcodeTypes: [
                            "ean13",
                            "ean8",
                            "upc_a",
                            "upc_e",
                        ],
                    }}
                    onBarcodeScanned={handleBarcodeScanned}
                />
            )}

            {/* Scanner overlay */}
            <View
                style={styles.overlay}
                pointerEvents="none"
            >
                {/* Top darkened area */}
                <View style={styles.topOverlay}>
                    <Text style={styles.title}>
                        Scan a product
                    </Text>

                    <Text style={styles.subtitle}>
                        Position the barcode inside the frame
                    </Text>
                </View>

                {/* Middle scanning area */}
                <View style={styles.middleRow}>
                    <View style={styles.sideOverlay} />

                    <View
                        style={[
                            styles.scanFrame,
                            {
                                width: scanWidth,
                                height: scanHeight,
                            },
                        ]}
                    >
                        <View
                            style={[
                                styles.corner,
                                styles.topLeft,
                            ]}
                        />

                        <View
                            style={[
                                styles.corner,
                                styles.topRight,
                            ]}
                        />

                        <View
                            style={[
                                styles.corner,
                                styles.bottomLeft,
                            ]}
                        />

                        <View
                            style={[
                                styles.corner,
                                styles.bottomRight,
                            ]}
                        />
                    </View>

                    <View style={styles.sideOverlay} />
                </View>

                {/* Bottom darkened area */}
                <View style={styles.bottomOverlay}>
                    <Text style={styles.instruction}>
                        Align barcode within the frame
                    </Text>

                    <Text style={styles.hint}>
                        Scanning happens automatically
                    </Text>
                </View>
            </View>
        </View>
    );
}

const OVERLAY_COLOR = "rgba(0, 0, 0, 0.55)";
const CORNER_COLOR = theme.colors.accent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.black,
    },

    overlay: {
        ...StyleSheet.absoluteFill,
    },

    topOverlay: {
        flex: 1,
        backgroundColor: OVERLAY_COLOR,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 24,
        paddingBottom: 32,
    },

    title: {
        color: theme.colors.white,
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 8,
    },

    subtitle: {
        color: theme.colors.white,
        fontSize: 14,
        textAlign: "center",
    },

    middleRow: {
        flexDirection: "row",
    },

    sideOverlay: {
        flex: 1,
        backgroundColor: OVERLAY_COLOR,
    },

    scanFrame: {
        position: "relative",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: 16,
    },

    corner: {
        position: "absolute",
        width: 32,
        height: 32,
        borderColor: CORNER_COLOR,
    },

    topLeft: {
        top: -2,
        left: -2,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderTopLeftRadius: 16,
    },

    topRight: {
        top: -2,
        right: -2,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderTopRightRadius: 16,
    },

    bottomLeft: {
        bottom: -2,
        left: -2,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderBottomLeftRadius: 16,
    },

    bottomRight: {
        bottom: -2,
        right: -2,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderBottomRightRadius: 16,
    },

    bottomOverlay: {
        flex: 1,
        backgroundColor: OVERLAY_COLOR,
        alignItems: "center",
        paddingTop: 28,
        paddingHorizontal: 24,
    },

    instruction: {
        color: theme.colors.white,
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },

    hint: {
        color: "#D1D5C8",
        fontSize: 13,
        marginTop: 8,
        textAlign: "center",
    },
});
