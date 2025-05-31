# Espirion Themes

The **`espirion-themes`** package provides centralized, reusable theme definitions for the Espirion design system.  
Themes are collections of design tokens exposed as CSS custom properties, enabling consistent branding and styling across all Espirion UI components and derivative libraries.

---

## Overview

- Scalable, extensible themes for multiple brand styles
- Runtime theme switching using CSS variables and `data-theme` attributes
- Supports popular UI themes like GitHub (Primer), Twilio Paste, and more
- Includes light and dark mode variants
- Separates design tokens from component logic for maintainability

---

## Design Tokens

Themes define the following core categories of design tokens:

| Category         | Description                          |
| ---------------- | ------------------------------------ |
| Colors           | Backgrounds, text, borders, states   |
| Typography       | Fonts, sizes, weights, line heights  |
| Spacing          | Margin and padding scales            |
| Borders          | Widths, styles, radii                |
| Shadows          | Elevation and focus shadows          |
| Component Tokens | Component-specific colors and sizing |

---

## Core Tokens (examples)

| Variable                   | Usage                   | Example Value               |
| -------------------------- | ----------------------- | --------------------------- |
| `--esp-color-background`   | Page background         | `#ffffff`                   |
| `--esp-color-text-primary` | Primary text color      | `#24292f`                   |
| `--esp-color-primary`      | Brand primary color     | `#1f6feb`                   |
| `--esp-font-family`        | Default font stack      | `"Inter", sans-serif`       |
| `--esp-spacing-md`         | Medium spacing unit     | `16px`                      |
| `--esp-border-radius-md`   | Medium border radius    | `6px`                       |
| `--esp-shadow-sm`          | Small shadow effect     | `0 1px 2px rgba(0,0,0,0.1)` |
| `--esp-button-bg`          | Button background color | `var(--esp-color-primary)`  |

---

## Available Themes

- **GitHub (Primer) Light & Dark**  
  Based on [Primer Primitives](https://primer.style/primitives) with accessible colors and GitHub branding.

- **Twilio Paste Light & Dark**  
  Based on [Twilio Paste](https://paste.twilio.design/) design tokens, optimized for clarity and accessibility.

---

## Usage

### Apply a Theme

Add the `data-theme` attribute to your root element:

### Using NPM

```bash
npm install @espirion/espirion-themes
```

### Using CDN

```html
<head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/@espirion/espirion-themes@latest/dist/espirion-themes.css"
  />
</head>
<body data-theme="github-light">
  <!-- Your app here -->
</body>
```
