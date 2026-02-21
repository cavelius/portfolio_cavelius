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

## Design System (index.html)

### Colors (via `@theme` in css/style.css)

| Token             | Tailwind class   | Usage                                        |
|-------------------|------------------|----------------------------------------------|
| `--color-dark`    | `text-dark`      | Primary text, headings                       |
| `--color-gray-01` | `text-gray-01`   | Secondary text, section labels               |
| `--color-gray-02` | `text-gray-02`   | Tertiary text (subtitles, meta)              |
| `--color-page-bg` | `bg-page-bg`     | Page background                              |
| `--color-gray-border` | `border-gray-border` / `divide-gray-border` | Borders, dividers |
| `--color-tag-purple` | `bg-tag-purple` | Skill tags (digital, illustration)          |
| `--color-tag-green`  | `bg-tag-green`  | Skill tags (print, systems)                 |
| Dark sections     | `text-neutral-400` | Section labels on black bg                 |
| Dark sections     | `text-neutral-300` | Body text on black bg                      |

### Typography

| Element             | Classes                                                                 |
|---------------------|-------------------------------------------------------------------------|
Base font on `<body>`: `font-['DM_Sans',sans-serif] text-[0.9375rem]`

| Element             | Classes                                                                 |
|---------------------|-------------------------------------------------------------------------|
| **Hero headline**   | `font-[neue-haas-grotesk-display,sans-serif] font-light [font-size:clamp(20px,4vw,60px)] leading-[1.1]` |
| **Section headline (h2)** | `font-[neue-haas-grotesk-display,sans-serif] font-light text-[3.375rem]` or `text-[4.875rem] leading-[1.2]` |
| **Headline serif** | `font-[ivypresto-display,serif] font-light italic`                     |
| **Headline Mono** | `font-['IBM_Plex_Sans',sans-serif] text-[1.365rem] min-[480px]:text-[0.875rem] uppercase tracking-[0.05em]` |
| **Subheadline Mono** | `font-['IBM_Plex_Sans',sans-serif] text-[0.875rem] tracking-[0.03em]` |
| **Fließtext Gross** | `text-[26px] min-[480px]:text-[1.625rem]`                              |
| **Fließtext medium** | `font-medium text-[1.56rem] min-[480px]:text-[1rem]` (section titles: Werdegang, Kompetenzen, Das sagen Kunden) |
| **Fließtext regular** | `text-[1.56rem] min-[480px]:text-[1rem]` + `leading-normal min-[480px]:leading-relaxed` for paragraphs |
| **Fließtext klein** | `teyarxt-[1.46rem] min-[480px]:text-[0.9375rem]` (header, nav, tags, buttons, footer meta) |

### Layout

- **Container**: `mx-auto max-w-[104.5rem] px-[16px] sm:px-16 md:px-9`
- **Section vertical padding**: `py-[32px] min-[480px]:py-12 lg:py-16`
- **Breakpoints**: default → `min-[480px]` → `sm` (640) → `md` (768) → `lg` (1024) → `xl` (1280)

### Components

**Border radius**
- Images / cards: `rounded-[0.375rem] sm:rounded-[0.1875rem]`
- Buttons / tags: `rounded-full`

**Pill button (dark bg)**
`rounded-full border border-white/30 px-5 min-[480px]:px-4 py-2.5 min-[480px]:py-2 text-[1.5rem] min-[480px]:text-[0.9375rem] text-white transition-colors hover:bg-white/10`

**Skill tag**
`rounded-full bg-tag-purple px-[12px] min-[480px]:px-4 py-[12px] min-[480px]:py-2 text-[1.46rem] min-[480px]:text-[0.9375rem]`
(swap `bg-tag-purple` ↔ `bg-tag-green` by category)

**Project card image hover**
`transform transition-transform duration-300 lg:group-hover:scale-[1.02]`

**Testimonial card shadow**
`shadow-[0px_0px_8px_0px_rgba(0,0,0,0.06)]` → hover: `shadow-[0px_0px_12px_0px_rgba(0,0,0,0.10)]`

### Hover patterns
- Text links: `transition-opacity hover:opacity-60` (nav) or `hover:opacity-70` (inline links)
- Buttons: `transition-colors hover:bg-white/10`
- Project images: `lg:group-hover:scale-[1.02]` (desktop only)

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