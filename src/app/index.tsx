import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Screen } from "@/components/screen";
import { theme } from "@/styles/theme";

export default function HomeScreen() {
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(24)).current;
  const iconAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.spring(cardTranslateY, {
        toValue: 0,
        damping: 12,
        stiffness: 120,
        mass: 0.8,
        useNativeDriver: true,
      }),
    ]).start();

    const iconLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(iconAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(iconAnimation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    iconLoop.start();

    return () => {
      iconLoop.stop();
    };
  }, [cardOpacity, cardTranslateY, iconAnimation]);

  const iconTranslateY = iconAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  const iconRotate = iconAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "4deg"],
  });

  const iconScale = iconAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  return (
    <Screen contentContainerStyle={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: cardOpacity,
            transform: [
              {
                translateY: cardTranslateY,
              },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [
                {
                  translateY: iconTranslateY,
                },
                {
                  rotate: iconRotate,
                },
                {
                  scale: iconScale,
                },
              ],
            },
          ]}
        >
          <Text style={styles.icon}>🥬</Text>
        </Animated.View>

        <View style={styles.content}>
          <Text style={styles.title}>Hello World</Text>
          <Text style={styles.subtitle}>
            6 items in your fridge
          </Text>
        </View>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },

  card: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,

    padding: theme.spacing.lg,

    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,

    ...theme.shadows.small,
  },

  iconContainer: {
    width: 56,
    height: 56,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.colors.backgroundMuted,
    borderRadius: theme.radii.md,
  },

  icon: {
    fontSize: 28,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: theme.fontSizes.lg,
    lineHeight: theme.lineHeights.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text,
  },

  subtitle: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fontSizes.sm,
    lineHeight: theme.lineHeights.sm,
    color: theme.colors.textMuted,
  },
});