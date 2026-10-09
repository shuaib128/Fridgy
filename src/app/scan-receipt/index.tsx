import {
    BarcodeScanningResult,
    CameraView,
    useCameraPermissions,
} from "expo-camera";

import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Text, View } from "react-native";

export default function BarcodeCameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();

    const scannedRef = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (permission?.status === "undetermined") {
            requestPermission();
        }
    }, [permission?.status, requestPermission]);

    const handleBarcodeScanned = (result: BarcodeScanningResult) => {
        if (scannedRef.current) return;

        scannedRef.current = true;

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
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={{ flex: 1 }}>
                <Text>Waiting for camera permission...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <CameraView
                style={{ flex: 1 }}
                facing="back"
                onBarcodeScanned={handleBarcodeScanned}
            />
        </View>
    );
}