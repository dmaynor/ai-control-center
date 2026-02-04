# AI Control Center VSCode Extension

A unified dashboard to view, configure, and manage all LLM, AI, and model integrations in your VSCode environment.

---

## Quick Start

1. **Install**: Clone this repo and run `npm install`.
2. **Build**: `npm run build`
3. **Test**: `npm test` (tests will fail until implementation is complete, TDD)
4. **Launch**: Press `F5` in VSCode to open a dev extension host.
5. **Open Panel**: Run the `AI Control Center: Open` command from the Command Palette.

---

## Features

- **Centralized Dashboard**: View all detected LLMs, models, and AI endpoints.
- **Auto-Discovery**: Scans workspace/global settings, `.env`, `.ai-config`, etc.
- **Config Editing**: Edit API keys, model names, and parameters in real time.
- **Profile Management**: Export/import named configuration profiles.
- **Validation**: Test connection for each integration, see live status.
- **Plugin Interop**: Manage configs for plugins that expose APIs.
- **Security**: API keys are masked and never logged.
- **Extensible**: Add new models/plugins easily.

---

## Example Workflow

1. **Detection**: The panel auto-discovers OpenAI and Ollama configs.
2. **Edit**: User edits API keys and model params inline.
3. **Test**: Clicks "Test Connection" to verify integration.
4. **Profile**: Saves current setup as a profile, switches between profiles.

---

## UI Schematic

```markdown
+------------------------------------------------------+
|                AI Control Center                     |
+------------------------------------------------------+
| [Profile Management]                                 |
|  [Export] [Import]                                   |
+------------------------------------------------------+
| Detected Integrations                                |
|  +-------------------+   +-----------------------+   |
|  | OpenAI            |   | Ollama                |   |
|  | [Edit] [Test]     |   | [Edit] [Test]         |   |
|  +-------------------+   +-----------------------+   |
+------------------------------------------------------+
| Plugins                                              |
|  +-------------------+                               |
|  | Copilot           |                               |
|  +-------------------+                               |
+------------------------------------------------------+
| [Status/Error Messages]                              |
+------------------------------------------------------+
```

---

## Extending the Extension

- Add new model/plugin support by updating `configScanner.ts` and `aiManager.ts`.
- Add new React UI components in `src/webview/components`.
- Follow the TDD workflow: write failing tests, then implement.

---

## Security

- API keys and secrets are always masked in the UI.
- Never logged or written to disk in plain text outside config files.
- Follow best practices for secret management.

---

## Test-Driven Development (TDD)

- All tests are written first and will fail until the implementation is complete.
- See `src/tests/aiManager.test.ts` and `src/tests/webview.test.tsx` for coverage.

---

## License

MIT
