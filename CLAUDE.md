## Project

React + Vite + TypeScript + Tailwind landing page for the Africa Bitcoin Ambassador Program.
Trilingual: English (default), French, Swahili — translations in `src/locales/[en|fr|sw]/common.json`.

## AI-assisted development (Cursor / Claude Code)

- Prefer **small, scoped changes**. No drive-by refactors without explicit approval.
- **One branch per feature** (`feature/...` or `fix/...`). Never commit on `main`/`master`.
- Full rules: `.cursor/rules/project-guardrails.mdc`.

### MANDATORY: start every session from main

Before making any change, **always** run:

```bash
git checkout main && git pull origin main
git checkout -b fix/short-description   # or feature/...
```

Never start work on whatever branch happens to be checked out — it may be a merged or stale branch. Always branch from an up-to-date `main`. If the current branch is already a fresh unmerged feature branch (i.e. `git log main..HEAD` shows commits not yet in main), continue on it; otherwise create a new one.

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
