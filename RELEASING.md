# Release Procedure

## Release flow

Versioning follows [Semantic Versioning](https://semver.org) with pre-release channels.

### Preprod cycle
Every push to `preprod` automatically:
1. Bumps `package.json` to the next beta: `0.4.0-beta.1` → `0.4.0-beta.2`
2. Builds and tags the Docker image: `:preprod`, `:sha-{short}`, `:0.4.0-beta.N`
3. Deploys to `https://preprod.swisscontract.ai`

### Starting a new release cycle
After a production release, `preprod` is reset to `main` with a clean version (e.g. `0.4.0`).
Push any commit to `preprod` → automatically becomes `0.4.0-beta.1`.

To target a different version (e.g. minor bump to `0.5.0`): manually set `package.json` version to `0.5.0` in your first preprod commit. The workflow will produce `0.5.0-beta.1`.

### Promoting to production
When ready, open a PR `preprod → main` and merge (squash). The promote job:
1. Strips `-beta.N` suffix from current version → `0.4.0`
2. Promotes image: `:preprod` → `:production` + `:v0.4.0`
3. Deploys to `https://swisscontract.ai`
4. Commits `package.json` to `main`: `chore: release v0.4.0`
5. Creates GitHub release + git tag `v0.4.0`
6. Resets `preprod` to `main`

### PR title convention
Not used for version bump calculation (the target version is already encoded in the beta version).
Still use conventional commit prefixes for clarity in release notes:
- `feat: ...` — new feature
- `fix: ...` — bug fix
- `refactor: ...` — internal improvement
- `chore: ...` — maintenance

---

## How releases work

swisscontract.ai uses a **build-once, promote** model:

1. Code is built **once** on `preprod` — producing a Docker image tagged `:preprod`, `:sha-{short}`, and `:X.Y.Z-beta.N`
2. That exact image is **validated** on `preprod.swisscontract.ai`
3. On merge to `main`, the same image is **re-tagged** as `:production` and `:vX.Y.Z` — no rebuild
4. Production runs the identical bytes that were tested on preprod

This guarantees preprod and production are always the same build.

---

## Step-by-step release

### 1. Develop on `preprod`
```bash
git checkout preprod
# make changes
git push origin preprod
```

GitHub Actions automatically:
- Bumps `package.json` to next beta version (e.g. `0.4.0-beta.3`)
- Builds Docker image → tags `:preprod` + `:sha-{short}` + `:0.4.0-beta.3`
- Deploys to `preprod.swisscontract.ai`
- Runs health check

### 2. Validate on preprod

Before any merge to main, verify on `https://preprod.swisscontract.ai`:
- [ ] Contract analysis works (upload a PDF)
- [ ] All 4 languages render correctly (EN/DE/FR/IT)
- [ ] Section headers translated
- [ ] File upload errors show correctly
- [ ] `/api/health` returns `{"status":"ok","timestamp":"..."}`
- [ ] No console errors

### 3. Open a Pull Request

```bash
# Via GitHub UI or gh CLI
gh pr create --base main --head preprod --title "feat: <summary>"
```

PR description should include:
- What changed
- Preprod validation confirmation
- Any post-merge actions needed

### 4. Merge

After review/approval, merge via GitHub UI or:
```bash
gh pr merge --squash
```

GitHub Actions automatically:
- Strips `-beta.N` suffix → clean version (e.g. `0.4.0`)
- Re-tags `:preprod` image as `:production` + `:v0.4.0` (no rebuild)
- Deploys to `swisscontract.ai`
- Commits version to `main` + creates GitHub release + git tag
- Resets `preprod` to `main`

### 5. Verify production

```bash
curl https://swisscontract.ai/api/health
# Expected: {"status":"ok","timestamp":"..."}
```

---

## Feature flags

Environment behaviour is controlled by Traefik-injected request headers — no env vars, no build args.

| Header | preprod | production | Effect |
|--------|---------|------------|--------|
| `X-Show-Banner` | `true` | not set | Shows preprod banner; adds `noindex` meta tag |
| `X-Debug-Enabled` | `true` | not set | Enables verbose debug logging in API routes |

Adding a new environment or toggling a feature requires zero code changes — only Traefik label updates.

---

## Environment variables

| Variable | Where set | Purpose |
|----------|-----------|---------|
| `INFOMANIAK_AI_TOKEN` | GitHub environment secret | Infomaniak AI API key |
| `INFOMANIAK_AI_PRODUCT_ID` | GitHub environment secret | Infomaniak AI product ID |
| `NODE_ENV` | Docker `-e` at runtime | Always `production` for both envs |

The same Docker image runs as any environment. Behaviour differences come from Traefik-injected headers, not env vars.

---

## Docker image tags

| Tag | Meaning |
|-----|---------|
| `:preprod` | Latest build from `preprod` branch (mutable) |
| `:production` | Same as `:preprod` at time of last merge to `main` (mutable) |
| `:sha-abc1234` | Immutable — specific commit build |
| `:X.Y.Z-beta.N` | Immutable — specific pre-release build |
| `:vX.Y.Z` | Immutable — specific production release |

---

## GitHub environments

| Environment | Branch | Domain | Secrets |
|-------------|--------|--------|---------|
| `preprod` | `preprod` | `preprod.swisscontract.ai` | `INFOMANIAK_AI_TOKEN`, `INFOMANIAK_AI_PRODUCT_ID`, `VPS_SSH_KEY`, `VPS_HOST`, `VPS_USER` |
| `production` | `main` | `swisscontract.ai` | same |
