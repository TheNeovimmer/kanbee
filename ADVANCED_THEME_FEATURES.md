# Advanced Theme Features

Kanbee provides sophisticated theme customization capabilities including dark/light mode support, custom theme creation, per-component color overrides, and color scheme import/export functionality.

## Table of Contents

- [Dark/Light Mode Support](#darklight-mode-support)
- [Custom Theme Creation](#custom-theme-creation)
- [Per-Component Color Overrides](#per-component-color-overrides)
- [Theme Preview](#theme-preview)
- [Color Scheme Import/Export](#color-scheme-importexport)
- [Programmatic Theme Management](#programmatic-theme-management)
- [Color Format Reference](#color-format-reference)

## Dark/Light Mode Support

### Overview

Kanbee automatically adjusts theme colors based on the selected color mode. This is essential for users who switch between light and dark terminals or prefer specific contrast levels.

### Color Modes

#### Auto Mode (Default)

The application automatically detects whether your terminal has a light or dark background and applies appropriate colors.

**Detection Logic:**
- Analyzes the background color brightness
- Brightness > 128: Light mode
- Brightness ≤ 128: Dark mode

#### Dark Mode

Forces a dark color palette with bright text colors for optimal visibility on dark backgrounds.

**Characteristics:**
- Dark background colors (#1a1b26 range)
- Bright accent and text colors
- High contrast for readability
- Suitable for evening/night use

#### Light Mode

Forces a light color palette with dark text colors for optimal visibility on light backgrounds.

**Characteristics:**
- Light background colors (#f5f5f5 range)
- Dark or muted accent colors
- Excellent readability in daylight
- Reduced eye strain in bright environments

### Using Color Modes

**Toggle color mode during theme preview:**

```
Press: t          Open theme selector
Press: p          Enter theme preview
Press: h/l        Cycle between modes (auto ↔ light ↔ dark)
Press: Return     Apply theme with selected mode
```

**Set color mode in configuration:**

Edit `~/.kanflow/data.json`:

```json
{
  "settings": {
    "theme": "alacritty",
    "colorMode": "dark",
    "showIcons": true
  }
}
```

## Custom Theme Creation

### Quick Start

Create a custom theme in three steps:

1. Open theme selector: Press `t`
2. Start creation: Press `c`
3. Enter theme name and customize colors

### Creating a Custom Theme

**Step 1: Open Theme Selector**

```
Press: t in normal mode
```

**Step 2: Choose Base Theme**

Navigate to a theme that's close to your desired colors:

```
Press: j/k to navigate
Press: c to create
```

**Step 3: Enter Theme Name**

When prompted:

```
Enter: My Custom Theme
Press: Return
```

**Step 4: Edit Colors**

In the theme editor:

```
Press: j/k to navigate color fields
Press: i or Return to edit a color
Enter: Hex color value (e.g., #FF5733)
Press: Return to save
Press: Escape to close editor
```

### Color Components

Ten customizable color components:

| Component | Purpose | Example |
|-----------|---------|---------|
| Primary | Main highlight and selection color | #7aa2f7 |
| Secondary | Supporting accent color | #9ece6a |
| Accent | Emphasis and special highlights | #e0af68 |
| Muted | Dim/disabled/secondary text | #565f89 |
| Border | UI borders and separators | #3b4261 |
| Card | Card text and content color | #c0caf5 |
| Highlight | Selection background color | #7aa2f7 |
| Background | Main interface background | #1a1b26 |
| Header BG | Header section background | #24283b |
| Status BG | Status bar background | #1f2335 |

### Editing Colors

Colors are specified in hexadecimal RGB format:

```
Format: #RRGGBB
Range: #000000 (black) to #FFFFFF (white)

Examples:
#FF0000 - Red
#00FF00 - Green
#0000FF - Blue
#7aa2f7 - Blue (Kanbee default primary)
```

### Live Validation

- Invalid hex values are rejected
- Format errors show error messages
- Valid colors update immediately
- Changes persist automatically

## Per-Component Color Overrides

### Understanding Overrides

Color overrides allow you to customize specific components while keeping base theme colors for everything else.

### Applying Overrides

**In the theme editor:**

1. Select a color component
2. Press `i` or `Return`
3. Enter a new hex color value
4. Changes save automatically

**In configuration file:**

```json
{
  "settings": {
    "theme": "alacritty",
    "themeOverrides": {
      "primary": "#FF5733",
      "accent": "#00FF00"
    }
  }
}
```

### Override Strategies

#### Single Component Override

Change only the primary color:

```json
{
  "themeOverrides": {
    "primary": "#FF5733"
  }
}
```

#### Multi-Component Override

Adjust multiple colors for a cohesive look:

```json
{
  "themeOverrides": {
    "primary": "#FF5733",
    "secondary": "#33FF57",
    "accent": "#3357FF",
    "highlight": "#FF5733"
  }
}
```

#### Category-based Override

Override all background colors:

```json
{
  "themeOverrides": {
    "*bg": "#0a0a0a"
  }
}
```

### Merge Behavior

Overrides are applied in this order:

1. Base theme loads
2. Custom theme colors apply
3. Color overrides apply
4. Color mode adjustments apply

Later steps override earlier steps.

## Theme Preview

### Purpose

Preview how themes look before applying them, including color mode variations.

### Entering Preview Mode

```
Press: t                Open theme selector
Press: p                Enter preview mode
```

### Preview Controls

```
j/k or ↑/↓             Navigate between themes
h/l or ←/→             Cycle color modes (auto → light → dark)
Return                 Apply previewed theme
Escape                 Cancel and return to theme selector
```

### What's Shown in Preview

- Current theme name
- Active color mode
- Color palette with 5 primary colors
- Color swatches showing actual colors
- Hex values for reference

### Preview Workflow

```
Press: t                Open selector
Press: p                Start preview
Press: j                View next theme
Press: l                Switch to light mode
Press: Return           Apply theme and mode
```

## Color Scheme Import/Export

### Overview

Share custom themes with others or backup your theme configurations using JSON files.

### Export Format

Custom themes are exported as JSON with this structure:

```json
{
  "name": "My Custom Theme",
  "description": "An optimized color scheme for productivity",
  "baseTheme": "alacritty",
  "colorMode": "dark",
  "colors": {
    "primary": "#7aa2f7",
    "secondary": "#9ece6a",
    "accent": "#e0af68",
    "muted": "#565f89",
    "border": "#3b4261",
    "card": "#c0caf5",
    "highlight": "#7aa2f7",
    "bg": "#1a1b26",
    "headerBg": "#24283b",
    "statusBg": "#1f2335"
  },
  "overrides": {
    "primary": "#FF5733"
  }
}
```

### Exporting a Theme

**From the theme editor:**

1. Navigate to your custom theme
2. Select export option (programmatic export via file)
3. JSON is written to file
4. Share or backup the JSON file

**Programmatically:**

```bash
# Access via ~/.kanflow/data.json
# Find your custom theme in settings.customThemes array
# Copy the theme object to share
```

### Importing a Theme

**Create a JSON file** (e.g., `my-theme.json`):

```json
{
  "name": "Ocean Blue",
  "description": "Cool ocean-inspired color scheme",
  "baseTheme": "default",
  "colorMode": "dark",
  "colors": {
    "primary": "#0066cc",
    "secondary": "#00cc99",
    "accent": "#ffaa00",
    "muted": "#666666",
    "border": "#cccccc",
    "card": "#e6f2ff",
    "highlight": "#0066cc",
    "bg": "#001a4d",
    "headerBg": "#003366",
    "statusBg": "#002244"
  }
}
```

**Import into Kanbee:**

```bash
# Edit ~/.kanflow/data.json
# Add the theme to settings.customThemes array
# Kanbee will automatically detect it
```

**Verify import:**

```
Press: t                Open theme selector
Navigate               Your new theme appears in the list
```

### Sharing Themes

**Create a theme package:**

1. Export your custom theme as JSON
2. Create a README explaining the theme
3. Share via GitHub gist or repository

**Contribute to Kanbee:**

1. Create an exceptional theme
2. Format as JSON
3. Submit as a pull request
4. Consider inclusion in built-in themes

## Programmatic Theme Management

### Storage Location

Custom themes are stored in `~/.kanflow/data.json`:

```json
{
  "version": "1.0.0",
  "boards": [...],
  "settings": {
    "user": "alice",
    "theme": "alacritty",
    "colorMode": "dark",
    "showIcons": true,
    "customThemes": [
      {
        "id": "custom_1234567890_abcde",
        "name": "My Theme",
        "description": "My custom theme",
        "baseTheme": "default",
        "colors": {...},
        "colorMode": "dark",
        "overrides": {...},
        "created": "2024-01-15T10:00:00Z",
        "modified": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### Theme Object Structure

```typescript
interface CustomTheme {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  description?: string;          // Optional description
  baseTheme: string;             // Base theme to inherit from
  colors: ThemeColors;           // Complete color palette
  colorMode: ColorMode;          // "auto" | "light" | "dark"
  overrides?: ColorOverride;     // Per-component overrides
  created: string;               // ISO timestamp
  modified: string;              // ISO timestamp
}
```

### Direct File Editing

**Add a theme manually:**

1. Open `~/.kanflow/data.json`
2. Locate `settings.customThemes` array
3. Add a new theme object
4. Ensure valid JSON syntax
5. Save file
6. Restart Kanbee

**Example addition:**

```json
{
  "id": "custom_manual_1",
  "name": "Minimalist",
  "baseTheme": "default",
  "colors": {
    "primary": "#333333",
    "secondary": "#666666",
    "accent": "#999999",
    "muted": "#cccccc",
    "border": "#e6e6e6",
    "card": "#f5f5f5",
    "highlight": "#333333",
    "bg": "#ffffff",
    "headerBg": "#f9f9f9",
    "statusBg": "#f0f0f0"
  },
  "colorMode": "light",
  "created": "2024-01-15T10:00:00Z",
  "modified": "2024-01-15T10:00:00Z"
}
```

## Color Format Reference

### Hex Color Format

All colors use hexadecimal RGB format: `#RRGGBB`

**Breakdown:**
- `#` — Hex indicator
- `RR` — Red component (00-FF)
- `GG` — Green component (00-FF)
- `BB` — Blue component (00-FF)

### Common Color Examples

```
#000000 - Black
#FFFFFF - White
#FF0000 - Red
#00FF00 - Green
#0000FF - Blue
#FFFF00 - Yellow
#FF00FF - Magenta
#00FFFF - Cyan
#808080 - Gray
```

### Color Picker Tools

**Web-based tools:**
- https://www.colorhexa.com/
- https://coolors.co/
- https://color.adobe.com/

**Terminal tools:**
```bash
# Linux/macOS - use your preferred color picker
# Common editors have color picker extensions
# VS Code: Native color picker with Ctrl+Shift+P
```

### Color Accessibility

When choosing colors, consider:

- **Contrast ratio** — Text should be readable (WCAG AA: 4.5:1)
- **Color blindness** — Avoid red-green only schemes
- **Eye strain** — Extreme brightness differences cause fatigue
- **Readability** — Sufficient contrast between text and background

**Contrast checkers:**
- https://webaim.org/resources/contrastchecker/
- https://www.tpgi.com/color-contrast-checker/

## Best Practices

### Theme Design

1. **Start with a base theme** — Don't create entirely from scratch
2. **Keep contrast in mind** — Ensure text is readable
3. **Test multiple modes** — Preview in light and dark
4. **Document your theme** — Include description and purpose
5. **Use consistent colors** — Related components should have similar colors

### Color Selection

1. **Limit the palette** — Use 3-5 main colors
2. **Use color psychology** — Blues are calming, reds are energetic
3. **Consider your use case** — Productivity requires different colors than creativity
4. **Test with real content** — Apply to actual cards and see how it looks
5. **Get feedback** — Ask others if the colors work well

### Sharing Themes

1. **Name meaningfully** — "Ocean Theme" is better than "Theme1"
2. **Provide description** — Explain the theme's inspiration
3. **Include metadata** — Base theme and color mode info
4. **Test compatibility** — Verify on different terminals
5. **Document special features** — If overrides are important, explain why

## Troubleshooting

### Colors Look Wrong

**Check color format:**
```
Must be: #RRGGBB (6 hex digits)
Example: #7aa2f7 ✓
         #7aa2 ✗ (too short)
         #7aa2f700 ✗ (too long)
```

**Verify JSON syntax:**
- All color values must be strings with quotes
- No trailing commas
- Proper nesting of objects

### Theme Not Appearing

**If a custom theme doesn't show:**

1. Check `~/.kanflow/data.json` exists
2. Verify JSON is valid (use jsonlint.com)
3. Restart Kanbee
4. Check console for error messages

### Color Mode Not Changing

**If color mode doesn't apply:**

1. Ensure you're using `auto`, `light`, or `dark`
2. Check `settings.colorMode` in JSON
3. Try toggling with `h`/`l` in preview mode
4. Verify theme supports the mode

### Import Failed

**If importing a theme fails:**

1. Validate JSON syntax
2. Ensure all required color fields exist
3. Check hex color format (#RRGGBB)
4. Look for error messages in the TUI

## Advanced Customization

### Batch Theme Updates

Update multiple custom themes at once:

```bash
# Edit ~/.kanflow/data.json directly
# Modify customThemes array
# Save and restart Kanbee
```

### Theme Inheritance

Create theme variants from a base:

1. Create original theme with good base colors
2. Export as JSON
3. Modify specific colors
4. Save with new name
5. Import back into Kanbee

### Synchronized Teams

Share themes across your team:

1. Create theme in JSON format
2. Commit to team repository
3. Document in team wiki
4. Team members import themes
5. Ensure consistency in UI appearance

## Future Enhancements

Planned improvements:

- **Theme Marketplace** — Community theme sharing
- **Theme Builder UI** — Visual theme editor
- **Color Palettes** — Pre-built color combinations
- **Animated Transitions** — Smooth color transitions
- **Per-Mode Overrides** — Different overrides per color mode