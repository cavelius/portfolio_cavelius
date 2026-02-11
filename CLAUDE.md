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
- **Fonts**: Cormorant Garamond (headings) and Work Sans (body) via Google Fonts
- **Layout**: Mobile-first responsive design using Tailwind breakpoints (sm/md/lg/xl), max-width container of 1200px, CSS Grid for portfolio card layouts

## Important Rules

- **NEVER use static pixel values (px) for sizing** — always use dynamic `rem` values so everything scales proportionally with the fluid root font-size (`clamp(10px, 8.3px + 0.46vw, 16px)`). This applies to border-radius, padding, margins, font-sizes, widths, heights, etc.
- **Always recompile CSS** after changing HTML classes: `npx @tailwindcss/cli -i ./css/style.css -o ./css/output.css`

## Figma Integration

Figma MCP is configured for design-to-code workflows:
- Remote MCP config in `.codex/config.toml`
- Implementation skill defined in `.agents/skills/figma-implement-design/SKILL.md`