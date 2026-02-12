# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for Sofia Cavelius (designer/art director, Berlin). Built with plain HTML, Tailwind CSS v4, and vanilla JavaScript. Content is in German.

## Development Commands

```bash
yarn install        # Install dependencies
yarn dev            # Start Tailwind watch + live-server concurrently (http://localhost:8080)
yarn tailwind:build # Tailwind CSS watch mode only (compiles css/style.css → css/output.css)
yarn start          # Live-server only
```

There is no test suite or linter configured.

## Architecture

- **No framework** — static HTML pages (`index.html`, `imprint.html`) served directly
- **CSS**: Tailwind v4 with `@import "tailwindcss"` in `css/style.css`, compiled to `css/output.css` via `@tailwindcss/cli`. Custom CSS is minimal (fonts, fade-in animations, project placeholders)
- **JS**: `js/main.js` — IntersectionObserver-based scroll animations that add `is-visible` class to `.fade-in-section` and `.fade-in-stagger` elements
- **Fonts**: Adobe Fonts (neue-haas-grotesk-display, ivypresto-display) + Google Fonts (DM Sans, IBM Plex Sans)
- **Layout**: Mobile-first responsive design using Tailwind breakpoints (sm/md/lg/xl), max-width container of 104.5rem, CSS Grid for portfolio card layouts

## Important Rules

- **NEVER use static pixel values (px) for sizing** — always use dynamic `rem` values so everything scales proportionally with the fluid root font-size (`clamp(10px, 8.3px + 0.46vw, 16px)`). This applies to border-radius, padding, margins, font-sizes, widths, heights, etc.
- **Always recompile CSS** after changing HTML classes: `npx @tailwindcss/cli -i ./css/style.css -o ./css/output.css`

## Cross-Browser Compatibility

Always ensure the site renders consistently across Chrome, Safari, Firefox, and Edge. Key rules:

- **Tailwind v4 handles vendor prefixes** (e.g. `-webkit-backdrop-filter`) automatically — no manual prefixing needed for Tailwind classes
- **Container query units (`cqi`)**: used for testimonial card widths. A `@supports not (width: 1cqi)` fallback exists in `css/style.css` for older browsers
- **When adding new CSS features**, check if they need fallbacks for Safari/Firefox. Provide `@supports` fallbacks for newer CSS like container queries, subgrid, etc.
- **Scrollbar hiding** uses both `-webkit-scrollbar` (Chrome/Safari) and `scrollbar-width: none` (Firefox) — always include both methods
- **Test any visual changes** in Chrome AND Safari at minimum, as Safari often lags behind on CSS feature support

## Figma Integration

Figma MCP is configured for design-to-code workflows:
- Remote MCP config in `.codex/config.toml`
- Implementation skill defined in `.agents/skills/figma-implement-design/SKILL.md`