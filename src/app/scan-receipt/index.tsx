import { useEffect } from "react";
import { View, Text } from "react-native";
import {
    CameraView,
    useCameraPermissions,
} from "expo-camera";

export default function BarcodeCameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        if (permission?.status === "undetermined") {
            requestPermission();
        }
    }, [permission?.status, requestPermission]);

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
                onCameraReady={() => {
                    console.log("Camera ready!");
                }}
                onMountError={(error) => {
                    console.log("Camera error:", error);
                }}
            />
        </View>
    );
}