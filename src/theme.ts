import { ThemeColors, CustomTheme, ColorMode, ColorOverride } from "./types";

export type TerminalName =
  | "ghostty"
  | "iterm2"
  | "kitty"
  | "wezterm"
  | "alacritty"
  | "default";

const THEMES: Record<TerminalName, ThemeColors> = {
  ghostty: {
    primary: "#7aa2f7",
    secondary: "#9ece6a",
    accent: "#e0af68",
    muted: "#565f89",
    border: "#3b4261",
    card: "#c0caf5",
    highlight: "#7aa2f7",
    bg: "#1a1b26",
    headerBg: "#24283b",
    statusBg: "#1f2335",
  },
  iterm2: {
    primary: "#bd93f9",
    secondary: "#50fa7b",
    accent: "#ffb86c",
    muted: "#6272a4",
    border: "#44475a",
    card: "#f8f8f2",
    highlight: "#bd93f9",
    bg: "#282a36",
    headerBg: "#343746",
    statusBg: "#21222c",
  },
  kitty: {
    primary: "#73daca",
    secondary: "#9ece6a",
    accent: "#ff9e64",
    muted: "#545c7e",
    border: "#3b4261",
    card: "#a9b1d6",
    highlight: "#73daca",
    bg: "#1a1b26",
    headerBg: "#24283b",
    statusBg: "#1f2335",
  },
  wezterm: {
    primary: "#f5a97f",
    secondary: "#a6da95",
    accent: "#eed49f",
    muted: "#6e738d",
    border: "#494d64",
    card: "#cad3f5",
    highlight: "#f5a97f",
    bg: "#24273a",
    headerBg: "#363a4f",
    statusBg: "#1e2030",
  },
  alacritty: {
    primary: "#89b4fa",
    secondary: "#a6e3a1",
    accent: "#fab387",
    muted: "#585b70",
    border: "#45475a",
    card: "#cdd6f4",
    highlight: "#89b4fa",
    bg: "#1e1e2e",
    headerBg: "#313244",
    statusBg: "#181825",
  },
  default: {
    primary: "#7aa2f7",
    secondary: "#9ece6a",
    accent: "#e0af68",
    muted: "#565f89",
    border: "#3b4261",
    card: "#c0caf5",
    highlight: "#7aa2f7",
    bg: "#1a1b26",
    headerBg: "#24283b",
    statusBg: "#1f2335",
  },
};

// Dark/Light mode color adjustments
const LIGHT_MODE_ADJUSTMENTS: Record<string, Record<string, string>> = {
  primary: { light: "#5a7ad4", dark: "#7aa2f7" },
  secondary: { light: "#6ba85f", dark: "#9ece6a" },
  accent: { light: "#c68d42", dark: "#e0af68" },
  muted: { light: "#888888", dark: "#565f89" },
  border: { light: "#d0d0d0", dark: "#3b4261" },
  card: { light: "#333333", dark: "#c0caf5" },
  highlight: { light: "#5a7ad4", dark: "#7aa2f7" },
  bg: { light: "#f5f5f5", dark: "#1a1b26" },
  headerBg: { light: "#e8e8e8", dark: "#24283b" },
  statusBg: { light: "#efefef", dark: "#1f2335" },
};

export function detectTerminal(): TerminalName {
  const env = process.env;

  if (env.GHOSTTY_RESOURCES_DIR || env.GHOSTTY_BIN_DIR) return "ghostty";
  if (env.TERM_PROGRAM === "iTerm.app") return "iterm2";
  if (env.TERM === "xterm-kitty" || env.KITTY_WINDOW_ID) return "kitty";
  if (env.TERM_PROGRAM === "WezTerm" || env.WEZTERM_PANE) return "wezterm";
  if (env.TERM === "alacritty" || env.ALACRITTY_LOG || env.ALACRITTY_SOCKET)
    return "alacritty";

  return "default";
}

export function getThemeColors(override?: string): ThemeColors {
  if (override && override in THEMES) {
    return THEMES[override as TerminalName];
  }
  const terminal = detectTerminal();
  return THEMES[terminal];
}

export function getTerminalLabel(): string {
  const name = detectTerminal();
  const labels: Record<TerminalName, string> = {
    ghostty: "Ghostty",
    iterm2: "iTerm2",
    kitty: "Kitty",
    wezterm: "WezTerm",
    alacritty: "Alacritty",
    default: "Terminal",
  };
  return labels[name];
}

export function getAvailableThemes(): TerminalName[] {
  return Object.keys(THEMES) as TerminalName[];
}

export function getThemeLabel(theme: TerminalName): string {
  const labels: Record<TerminalName, string> = {
    ghostty: "Ghostty",
    iterm2: "iTerm2",
    kitty: "Kitty",
    wezterm: "WezTerm",
    alacritty: "Alacritty",
    default: "Default",
  };
  return labels[theme];
}

// Color mode functions
export function applyColorMode(
  colors: ThemeColors,
  mode: ColorMode,
): ThemeColors {
  if (mode === "auto") {
    // Auto-detect based on background brightness
    const bgHex = colors.bg.slice(1);
    const bgRgb = parseInt(bgHex, 16);
    const brightness =
      ((bgRgb >> 16) & (255 * 0.299)) +
      ((bgRgb >> 8) & 255) * 0.587 +
      (bgRgb & (255 * 0.114));
    mode = brightness > 128 ? "light" : "dark";
  }

  if (mode === "light") {
    return {
      primary: LIGHT_MODE_ADJUSTMENTS.primary.light,
      secondary: LIGHT_MODE_ADJUSTMENTS.secondary.light,
      accent: LIGHT_MODE_ADJUSTMENTS.accent.light,
      muted: LIGHT_MODE_ADJUSTMENTS.muted.light,
      border: LIGHT_MODE_ADJUSTMENTS.border.light,
      card: LIGHT_MODE_ADJUSTMENTS.card.light,
      highlight: LIGHT_MODE_ADJUSTMENTS.highlight.light,
      bg: LIGHT_MODE_ADJUSTMENTS.bg.light,
      headerBg: LIGHT_MODE_ADJUSTMENTS.headerBg.light,
      statusBg: LIGHT_MODE_ADJUSTMENTS.statusBg.light,
    };
  }

  return colors;
}

// Custom theme management
export function createCustomTheme(
  name: string,
  baseTheme: TerminalName,
  colorMode: ColorMode = "auto",
  description?: string,
): CustomTheme {
  const baseColors = getThemeColors(baseTheme);
  const adjustedColors = applyColorMode(baseColors, colorMode);

  return {
    id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name,
    description,
    baseTheme,
    colors: adjustedColors,
    colorMode,
    overrides: {},
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  };
}

export function updateCustomTheme(
  theme: CustomTheme,
  updates: Partial<CustomTheme>,
): CustomTheme {
  return {
    ...theme,
    ...updates,
    modified: new Date().toISOString(),
  };
}

export function applyColorOverrides(
  colors: ThemeColors,
  overrides?: ColorOverride,
): ThemeColors {
  if (!overrides) return colors;

  const result = { ...colors };

  for (const [componentName, componentOverrides] of Object.entries(overrides)) {
    if (componentName === "*" || componentName === "all") {
      // Apply to all components
      Object.assign(result, componentOverrides);
    } else if (componentName in result) {
      // Apply to specific component
      Object.assign(result, componentOverrides);
    }
  }

  return result;
}

export function mergeThemeWithOverrides(
  baseTheme: ThemeColors,
  customTheme: CustomTheme,
): ThemeColors {
  let merged = { ...baseTheme };

  // Apply custom theme colors
  merged = { ...merged, ...customTheme.colors };

  // Apply color overrides
  if (customTheme.overrides) {
    merged = applyColorOverrides(merged, customTheme.overrides);
  }

  return merged;
}

// Theme preview utilities
export function getThemePreviewColors(
  baseTheme: string,
  colorMode: ColorMode = "dark",
): ThemeColors {
  let colors: ThemeColors;

  if (baseTheme.startsWith("custom_")) {
    // Placeholder for custom theme - would be loaded from storage
    colors = getThemeColors("default");
  } else {
    colors = getThemeColors(baseTheme as TerminalName);
  }

  return applyColorMode(colors, colorMode);
}

// Color scheme import/export
export function exportThemeAsJson(theme: CustomTheme): string {
  return JSON.stringify(
    {
      name: theme.name,
      description: theme.description,
      baseTheme: theme.baseTheme,
      colorMode: theme.colorMode,
      colors: theme.colors,
      overrides: theme.overrides,
    },
    null,
    2,
  );
}

export function importThemeFromJson(json: string): CustomTheme | null {
  try {
    const data = JSON.parse(json);

    if (!data.name || !data.colors) {
      return null;
    }

    const customTheme: CustomTheme = {
      id: `imported_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: data.name,
      description: data.description || "",
      baseTheme: data.baseTheme || "default",
      colors: {
        primary: data.colors.primary || "#7aa2f7",
        secondary: data.colors.secondary || "#9ece6a",
        accent: data.colors.accent || "#e0af68",
        muted: data.colors.muted || "#565f89",
        border: data.colors.border || "#3b4261",
        card: data.colors.card || "#c0caf5",
        highlight: data.colors.highlight || "#7aa2f7",
        bg: data.colors.bg || "#1a1b26",
        headerBg: data.colors.headerBg || "#24283b",
        statusBg: data.colors.statusBg || "#1f2335",
      },
      colorMode: data.colorMode || "auto",
      overrides: data.overrides || {},
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    };

    return customTheme;
  } catch {
    return null;
  }
}

// Theme validation
export function validateThemeColors(colors: Partial<ThemeColors>): boolean {
  const hexRegex = /^#[0-9a-fA-F]{6}$/;
  const requiredFields = [
    "primary",
    "secondary",
    "accent",
    "muted",
    "border",
    "card",
    "highlight",
    "bg",
    "headerBg",
    "statusBg",
  ];

  for (const field of requiredFields) {
    if (field in colors) {
      const value = colors[field as keyof ThemeColors];
      if (!value || !hexRegex.test(value)) {
        return false;
      }
    }
  }

  return true;
}

// Clone theme with modifications
export function cloneTheme(
  source: ThemeColors,
  modifications?: Partial<ThemeColors>,
): ThemeColors {
  const cloned = { ...source };

  if (modifications) {
    Object.assign(cloned, modifications);
  }

  return cloned;
}
