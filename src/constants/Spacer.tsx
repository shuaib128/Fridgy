import { View } from "react-native";

type SpacerProps = {
    size?: number;
};

export function Spacer({
    size = 16,
}: SpacerProps) {
    return <View style={{ height: size }} />;
}