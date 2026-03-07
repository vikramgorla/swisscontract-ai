# Release Procedure

## How releases work

swisscontract.ai uses a **build-once, promote** model:

1. Code is built **once** on `preprod` — producing a Docker image tagged `:preprod` and `:sha-{short}`
2. That exact image is **validated** on `preprod.swisscontract.ai`
3. On merge to `main`, the same image is **re-tagged** as `:production` — no rebuild
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
- Builds Docker image → tags `:preprod` + `:sha-{short}`
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
gh pr create --base main --head preprod --title "Release vX.Y.Z — <summary>"
```

PR description should include:
- What changed
- Preprod validation confirmation
- Any post-merge actions needed

### 4. Merge

After review/approval, merge via GitHub UI or:
```bash
gh pr merge --merge
```

GitHub Actions automatically:
- Re-tags `:preprod` image as `:production` (no rebuild)
- Deploys to `swisscontract.ai`
- Runs health check

### 5. Tag the release

After successful deploy:
```bash
# Get the new main HEAD SHA
git fetch origin main
git checkout main && git pull

# Tag
git tag -a vX.Y.Z -m "vX.Y.Z — <summary>"
git push origin vX.Y.Z
```

Or create via GitHub Releases UI — include what shipped and the Docker image digest.

### 6. Verify production

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
| `:vX.Y.Z` | Immutable — specific release (added manually or via workflow) |

---

## GitHub environments

| Environment | Branch | Domain | Secrets |
|-------------|--------|--------|---------|
| `preprod` | `preprod` | `preprod.swisscontract.ai` | `INFOMANIAK_AI_TOKEN`, `INFOMANIAK_AI_PRODUCT_ID`, `VPS_SSH_KEY`, `VPS_HOST`, `VPS_USER` |
| `production` | `main` | `swisscontract.ai` | same |

---

## Adding a new environment

1. Create a new GitHub environment with `DOMAIN` variable + secrets
2. Push code to a branch with the same name as the environment
3. GitHub Actions deploys automatically — no workflow changes needed

> Note: New environments won't have the `:sha-{short}` image available unless they build their own. For staging/QA, push to `preprod` first, validate, then promote.
