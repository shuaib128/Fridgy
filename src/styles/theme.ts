import { Platform } from "react-native";

export type ThemeColors = {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    accent: string;
    accentDark: string;
    accentLight: string;
    background: string;
    backgroundMuted: string;
    surface: string;
    surfaceSoft: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    textInverse: string;
    border: string;
    borderStrong: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    successSoft: string;
    warningSoft: string;
    errorSoft: string;
    infoSoft: string;
    white: string;
    black: string;
    transparent: string;
    overlay: string;
};

export const lightColors = {
    // Brand colors
    primary: "#6E8434",
    primaryDark: "#4F6423",
    primaryLight: "#90986D",

    accent: "#FCC151",
    accentDark: "#D99A22",
    accentLight: "#FFE2A1",

    // Backgrounds
    background: "#FFFFEA",
    backgroundMuted: "#FCF2DB",
    surface: "#FFFFFF",
    surfaceSoft: "#F7F4E8",

    // Text
    text: "#1E2A00",
    textSecondary: "#302C23",
    textMuted: "#6F7460",
    textInverse: "#FFFFEA",

    // Borders
    border: "#DDDCC9",
    borderStrong: "#B9BCA1",

    // Status colors
    success: "#6E8434",
    warning: "#FCC151",
    error: "#C45446",
    info: "#6F8FAF",

    // Soft status backgrounds
    successSoft: "#E8EED8",
    warningSoft: "#FFF0CC",
    errorSoft: "#F8E3DF",
    infoSoft: "#E4EDF5",

    // Utility
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
    overlay: "rgba(30, 42, 0, 0.45)",
} as const satisfies ThemeColors;

export const darkColors = {
    // Brand colors adjusted for dark backgrounds
    primary: "#A8BD68",
    primaryDark: "#C2D982",
    primaryLight: "#829653",

    accent: "#FCC151",
    accentDark: "#E5A72F",
    accentLight: "#4A3B1D",

    // Backgrounds
    background: "#12160D",
    backgroundMuted: "#181D12",
    surface: "#1D2316",
    surfaceSoft: "#252C1D",

    // Text
    text: "#F4F7E8",
    textSecondary: "#D9DEC9",
    textMuted: "#A6AE93",
    textInverse: "#12160D",

    // Borders
    border: "#39422E",
    borderStrong: "#566348",

    // Status colors
    success: "#A8BD68",
    warning: "#FCC151",
    error: "#E27B6E",
    info: "#8FB3D5",

    // Soft status backgrounds
    successSoft: "#29381F",
    warningSoft: "#44371D",
    errorSoft: "#432823",
    infoSoft: "#223442",

    // Utility
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
    overlay: "rgba(0, 0, 0, 0.65)",
} as const satisfies ThemeColors;

// Backward-compatible export. Existing components keep using the light colors
// until they are changed to consume lightTheme or darkTheme dynamically.
export const colors = lightColors;

export const spacing = {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
    "4xl": 40,
    "5xl": 48,
    "6xl": 64,
} as const;

export const fontSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    "2xl": 28,
    "3xl": 34,
    "4xl": 42,
} as const;

export const lineHeights = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 26,
    xl: 30,
    "2xl": 36,
    "3xl": 42,
    "4xl": 50,
} as const;

export const fontWeights = {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extraBold: "800",
} as const;

export const radii = {
    none: 0,
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
    "2xl": 32,
    full: 999,
} as const;

export const iconSizes = {
    xs: 14,
    sm: 18,
    md: 22,
    lg: 28,
    xl: 36,
    "2xl": 48,
} as const;

export const componentSizes = {
    buttonHeight: 52,
    inputHeight: 52,
    compactButtonHeight: 42,
    tabBarHeight: 72,
    headerHeight: 64,
} as const;

function createShadows(shadowColor: string) {
    return {
        small: Platform.select({
            ios: {
                shadowColor,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.08,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
            default: {},
        }),

        medium: Platform.select({
            ios: {
                shadowColor,
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.12,
                shadowRadius: 12,
            },
            android: {
                elevation: 5,
            },
            default: {},
        }),

        large: Platform.select({
            ios: {
                shadowColor,
                shadowOffset: {
                    width: 0,
                    height: 12,
                },
                shadowOpacity: 0.16,
                shadowRadius: 20,
            },
            android: {
                elevation: 9,
            },
            default: {},
        }),
    } as const;
}

export const lightShadows = createShadows("#1E2A00");
export const darkShadows = createShadows("#000000");

// Backward-compatible export for all existing style files.
export const shadows = lightShadows;

export const opacity = {
    disabled: 0.45,
    muted: 0.65,
    pressed: 0.8,
} as const;

const sharedTheme = {
    spacing,
    fontSizes,
    lineHeights,
    fontWeights,
    radii,
    iconSizes,
    componentSizes,
    opacity,
} as const;

export const lightTheme = {
    ...sharedTheme,
    colors: lightColors,
    shadows: lightShadows,
} as const;

export const darkTheme = {
    ...sharedTheme,
    colors: darkColors,
    shadows: darkShadows,
} as const;

// Backward-compatible default theme. Nothing currently using `theme` breaks.
export const theme = lightTheme;

export type AppTheme = {
    colors: ThemeColors;
    spacing: typeof spacing;
    fontSizes: typeof fontSizes;
    lineHeights: typeof lineHeights;
    fontWeights: typeof fontWeights;
    radii: typeof radii;
    iconSizes: typeof iconSizes;
    componentSizes: typeof componentSizes;
    shadows: ReturnType<typeof createShadows>;
    opacity: typeof opacity;
};
