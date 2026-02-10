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

## Figma Integration

Figma MCP is configured for design-to-code workflows:
- Remote MCP config in `.codex/config.toml`
- Implementation skill defined in `.agents/skills/figma-implement-design/SKILL.md`