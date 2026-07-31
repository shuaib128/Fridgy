import { Tabs } from "expo-router";

import FridgyTabBar from "@/components/navigation/FridgyTabBar";

export default function TabLayout() {
    return (
        <Tabs
            tabBar={(props) => (
                <FridgyTabBar {...props} />
            )}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />

            <Tabs.Screen
                name="inventory"
                options={{
                    title: "Inventory",
                }}
            />

            <Tabs.Screen
                name="add-inventory"
                options={{
                    title: "Add",
                }}
            />

            <Tabs.Screen
                name="meals"
                options={{
                    title: "Meals",
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                }}
            />
        </Tabs>
    );
}