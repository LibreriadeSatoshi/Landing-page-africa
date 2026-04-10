## Project

React + Vite + TypeScript + Tailwind landing page for the Africa Bitcoin Ambassador Program.
Trilingual: English (default), French, Swahili — translations in `src/locales/[en|fr|sw]/common.json`.

## AI-assisted development (Cursor / Claude Code)

- Prefer **small, scoped changes**. No drive-by refactors without explicit approval.
- **One branch per feature** (`feature/...` or `fix/...`). Never commit on `main`/`master`.
- Full rules: `.cursor/rules/project-guardrails.mdc`.

## Verification before "done"

| Command             | What it checks                                | Speed   |
| ------------------- | --------------------------------------------- | ------- |
| `npm run format`    | Auto-fixes formatting                         | instant |
| `npm run test:fast` | Translation completeness across all 3 locales | ~3s     |
| `npm run build`     | TypeScript + Vite build                       | ~15s    |
| `npm run test`      | All of the above + smoke build                | ~30s    |

Run in that order. The pre-push hook runs `tsc -b` automatically on every `git push`.

## Adding or editing translations

When adding a new key to `src/locales/en/common.json`, you MUST add the same key to:

- `src/locales/fr/common.json`
- `src/locales/sw/common.json`

The `translation-completeness` test will fail otherwise and block the PR.
EN is the source of truth — all keys in EN must exist in FR and SW.

## UI constraints

- No emoji in the UI
- Keep interactions lightweight — subtle hover states only
- Support light and dark mode if applicable
- Mobile first
