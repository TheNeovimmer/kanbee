# Theme Selection Feature

## Overview

The theme selection feature allows users to interactively choose between available color themes in Kanbee. The feature includes:

- **Interactive Theme Menu** — Visual selection interface with live preview hints
- **Six Built-in Themes** — Optimized for different terminal emulators
- **Terminal Auto-detection** — Automatically applies the best theme for your terminal
- **Persistent Storage** — Selected theme is saved to your configuration
- **Vim-style Navigation** — Use j/k or arrow keys to navigate themes

## How to Use

### Access the Theme Menu

In normal mode, press **`t`** to open the theme selection menu.

### Navigate Themes

- **`j` or `Down Arrow`** — Move to the next theme
- **`k` or `Up Arrow`** — Move to the previous theme

### Select a Theme

- **`Return` or `Space`** — Apply the selected theme immediately
- **`Escape` or `q`** — Cancel without changing the theme

### Visual Feedback

The theme menu displays:
- Currently selected theme with a `>` marker (highlighted)
- Active theme with a `✓` checkmark
- Theme names with clear labels

## Available Themes

| Theme | Display Name | Best For |
|-------|--------------|----------|
| `default` | Default | Tokyonight-inspired, works on most terminals |
| `ghostty` | Ghostty | Ghostty terminal |
| `iterm2` | iTerm2 | iTerm2 (macOS) |
| `kitty` | Kitty | Kitty terminal |
| `wezterm` | WezTerm | WezTerm |
| `alacritty` | Alacritty | Alacritty (Catppuccin-inspired) |

## Terminal Auto-detection

Kanbee automatically detects your terminal environment and applies the best-matching theme:

- Ghostty: `GHOSTTY_RESOURCES_DIR` or `GHOSTTY_BIN_DIR` environment variables
- iTerm2: `TERM_PROGRAM === "iTerm.app"`
- Kitty: `TERM === "xterm-kitty"` or `KITTY_WINDOW_ID`
- WezTerm: `TERM_PROGRAM === "WezTerm"` or `WEZTERM_PANE`
- Alacritty: `TERM === "alacritty"` or `ALACRITTY_*` environment variables
- Default: Fallback theme for other terminals

## Programmatic Configuration

You can also configure the theme directly in your `~/.kanflow/data.json` file:

```json
{
  "settings": {
    "user": "alice",
    "theme": "alacritty",
    "showIcons": true
  }
}
```

## Implementation Details

### Type System

Added a new app mode to the state machine:
- `AppMode` type now includes `THEME_SELECT`
- `AppState` includes `themeSelectIndex` for tracking menu position

### Theme Exports

Enhanced `theme.ts` with:
- `getAvailableThemes()` — Returns array of all theme keys
- `getThemeLabel(theme)` — Returns display name for a theme
- Exported `TerminalName` type for use across the application

### Input Handling

New key handler `handleThemeSelectKey()` in `tui.ts`:
- Navigation: j/k and up/down arrows
- Selection: return/space keys
- Cancellation: escape/q keys

### Rendering

New overlay function in `renderer.ts`:
- `renderThemeSelectOverlay()` — Displays centered theme selection menu
- Shows selected theme with highlight color
- Shows active theme with checkmark
- Integrates with main render pipeline

### Status Bar Updates

Updated status hints to include theme selection:
- Normal mode shows `t: theme` in help text
- THEME_SELECT mode shows navigation and selection hints

## Files Modified

1. **src/types.ts**
   - Added `THEME_SELECT` to `AppMode` type
   - Added `themeSelectIndex` to `AppState` interface

2. **src/theme.ts**
   - Exported `TerminalName` type
   - Added `getAvailableThemes()` function
   - Added `getThemeLabel()` function

3. **src/tui.ts**
   - Added `handleThemeSelectKey()` function
   - Added theme selection trigger on `t` key
   - Added `THEME_SELECT` case to input handler

4. **src/renderer.ts**
   - Added `renderThemeSelectOverlay()` function
   - Updated status bar with theme hint
   - Added theme overlay to main render pipeline

5. **src/index.ts**
   - Updated help text with theme selection instructions

6. **README.md**
   - Added theme selection keyboard reference
   - Added theme customization documentation
   - Updated available themes list

## Color Palette

Each theme includes these colors:
- **primary** — Main accent color for highlights
- **secondary** — Supporting accent color
- **accent** — Highlight and emphasis color
- **muted** — Dim/disabled text color
- **border** — UI border and separator color
- **card** — Card text color
- **highlight** — Selection background color
- **bg** — Main background color
- **headerBg** — Header background color
- **statusBg** — Status bar background color

## Future Enhancements

Possible improvements for future versions:
- Custom theme creation and saving
- Per-component color overrides
- Theme preview on selection
- Dark/light mode toggle
- Color scheme import from external sources

