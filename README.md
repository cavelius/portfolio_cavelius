# Sofia Cavelius Portfolio

Statische Portfolio Website mit HTML, Tailwind CSS und leichtem JavaScript.

## Lokale Entwicklung
- `yarn install`
- `yarn dev`
- Seite laeuft auf `http://localhost:8080`

## Codex MCP Konfiguration
Projektweite Konfiguration liegt in:

- `./.codex/config.toml`

Enthalten:
- `figma_remote` (aktiv)
- `figma_local` (deaktiviert)

### Erster Login fur Remote MCP
Im Projektordner ausfuehren:

```bash
codex mcp list
codex mcp login figma_remote
```

Danach Codex neu starten und mit `/mcp` pruefen.

## Skill fuer Figma-Implementierung
Ein repo-lokaler Codex Skill ist enthalten:

- `.agents/skills/figma-implement-design/SKILL.md`

Verwendung in Codex:
- `/skills` und `figma-implement-design` waehlen
- oder im Prompt explizit nennen
