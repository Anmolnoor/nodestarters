# Plan: one PR carrying all 62 Dependabot bumps

Base branch: `Starter`. Host: Node v18.19.1, npm 9.2.0 (read with `node -v` while planning). Everything below was derived from the `package.json` files cited per section; nothing here records a test result, because no code was run or changed while writing it.

## 1. Goal and non-goals

**Goal.** Land one pull request that (a) brings every dependency named in the 62 open Dependabot PRs to its target version, (b) adds a repeatable verification that the apps still load/run and "build", with its output pasted in the PR body, and (c) lets the 62 individual PRs be closed once it merges.

**Non-goals (explicit).**
- No behavioural change to application code. Source files (`index.js`, `app.js`, `server.js`, `controllers/`, `models/`, `routes/`, `utils/`, `views/`, `public/`) are not edited, except the minimum forced by a breaking API change (section 3); each such edit must be called out separately in the PR and kept minimal.
- No feature work, no refactors, no lint/format sweeps.
- No bumps beyond the 62 targets. Example: `validator ^10.11.0` also appears in `4-natours/after-section-08..13/package.json`, but only `after-section-14` has a validator PR (#1), so only `after-section-14` moves. Same for `axios` (as12/as13 declare `^0.18.0` but have no axios PR) and `sharp` (only as13 #27 and as14 #28).
- No changes to `.events/`, `.artifacts/`, `.toolchain/`.

## 2. Bump inventory

Abbreviations: `asNN` = `4-natours/after-section-NN`, `nf` = `1-node-farm/final`, `3js` = `3-asynchronous-JS/final`. D = DIRECT (listed in that section's `package.json`; edit it there). T = TRANSITIVE (not listed; resolves only through a parent dependency, then lockfile refresh). "Lock-only" means the existing direct range already admits the target, so only the lockfile needs to move. Every direct-vs-transitive call is read from the cited `package.json`; the *parent* named for a transitive package is the likely one, to be confirmed by `npm ls <pkg>` in the executor step (not verified here).

### nf (`1-node-farm/final/package.json`: deps `slugify ~1.3.4`; devDeps `nodemon ^1.18.11`)
| PR | Package | Change | Status |
|---|---|---|---|
| #8 | undefsafe | 2.0.2→2.0.5 | T (nodemon child); lock-only |
| #37 | minimatch | 3.0.4→3.1.2 | T; lock-only |
| #44 | decode-uri-component | 0.2.0→0.2.2 | T; lock-only |

### 3js (`3-asynchronous-JS/final/package.json`: deps `superagent ^5.0.2`)
| PR | Package | Change | Status |
|---|---|---|---|
| #48 | qs | 6.7.0→6.11.0 | T (superagent); lock-only |
| #71 | cookiejar | 2.1.2→2.1.4 | T (superagent); lock-only |

### as06 (`4-natours/after-section-06/package.json`: express `^4.16.4`, dotenv, morgan; eslint toolchain in devDeps; NO mongoose)
| PR | Package | Change | Status |
|---|---|---|---|
| #18 | ajv | 6.10.0→6.12.6 | T (eslint); lock-only |
| #41 | minimatch | 3.0.4→3.1.2 | T; lock-only |
| #57 | qs + express | express 4.16.4→4.17.3; qs →6.11.0 | express D (raise floor to `^4.17.3`); qs T. See qs caveat below |

### as08 (`.../after-section-08/package.json`: express, mongoose `^5.5.2`, validator `^10.11.0`, slugify, dotenv, morgan)
| PR | Package | Change | Status |
|---|---|---|---|
| #9 | bson | 1.1.1→1.1.6 | T (via mongoose→mongodb); lock-only |
| #16 | ajv | 6.10.0→6.12.6 | T (eslint); lock-only |
| #29 | mongoose | 5.5.2→5.7.5 | D (floor `^5.7.5`) |
| #61 | qs + express | as #57 | express D, qs T |

### as09 (same dependency set as as08)
| PR | Package | Change | Status |
|---|---|---|---|
| #10 | bson | 1.1.1→1.1.6 | T |
| #19 | ajv | 6.10.0→6.12.6 | T |
| #30 | mongoose | 5.5.2→5.7.5 | D |
| #38 | minimatch | 3.0.4→3.1.2 | T |
| #59 | qs + express | as #57 | express D, qs T |

### as10 (as09 plus jsonwebtoken `^8.5.1`, bcryptjs, helmet, etc.)
| PR | Package | Change | Status |
|---|---|---|---|
| #11 | bson | 1.1.1→1.1.6 | T |
| #20 | ajv | 6.10.0→6.12.6 | T |
| #31 | mongoose | 5.5.2→5.7.5 | D |
| #40 | minimatch | 3.0.4→3.1.2 | T |
| #60 | qs + express | as #57 | express D, qs T |
| #64 | jsonwebtoken | 8.5.1→9.0.0 | D (`^8.5.1` excludes 9, must edit) MAJOR |

### as11 (same set as as10)
| PR | Package | Change | Status |
|---|---|---|---|
| #12 | bson | 1.1.1→1.1.6 | T |
| #22 | ajv | 6.10.0→6.12.6 | T |
| #32 | mongoose | 5.5.2→5.7.5 | D |
| #36 | minimatch | 3.0.4→3.1.2 | T |
| #58 | qs + express | as #57 | express D, qs T |
| #63 | jsonwebtoken | 8.5.1→9.0.0 | D MAJOR |

### as12 (as11 plus axios `^0.18.0`, pug, cookie-parser, parcel-bundler devDep)
| PR | Package | Change | Status |
|---|---|---|---|
| #13 | bson | 1.1.1→1.1.6 | T |
| #17 | ajv | 6.10.0→6.12.6 | T |
| #24 | follow-redirects | 1.7.0→1.14.8 | T (axios dep); not listed in package.json |
| #33 | mongoose | 5.5.2→5.7.5 | D |
| #43 | minimatch | 3.0.4→3.1.2 | T |
| #45 | decode-uri-component | 0.2.0→0.2.2 | T |
| #62 | qs + express | as #57 | express D, qs T |
| #67 | jsonwebtoken | 8.5.1→9.0.0 | D MAJOR |
| #68 | json5 | 1.0.1→1.0.2 | T (babel/parcel toolchain) |

### as13 (as12 plus sharp `^0.22.1`, multer, stripe, html-to-text)
| PR | Package | Change | Status |
|---|---|---|---|
| #14 | bson | 1.1.1→1.1.6 | T |
| #23 | ajv | 6.10.0→6.12.6 | T |
| #25 | follow-redirects | 1.7.0→1.14.8 | T |
| #27 | sharp | 0.22.1→0.30.5 | D (`^0.22.1` excludes 0.30; must edit) MAJOR |
| #34 | mongoose | 5.5.2→5.7.5 | D |
| #39 | minimatch | 3.0.4→3.1.2 | T |
| #47 | decode-uri-component | 0.2.0→0.2.2 | T |
| #56 | express | 4.16.4→4.17.3 | D (floor `^4.17.3`) |
| #66 | jsonwebtoken | 8.5.1→9.0.0 | D MAJOR |
| #69 | json5 | 1.0.1→1.0.2 | T |

### as14 (as13 plus body-parser, compression, cors, ws via tooling)
| PR | Package | Change | Status |
|---|---|---|---|
| #1 | validator | 10.11.0→13.7.0 | D (`^10.11.0` excludes 13; must edit) MAJOR |
| #2 | axios | 0.18.0→0.21.2 | D (caret on 0.x pins the minor, must edit) |
| #3 | ws | 5.2.2→5.2.3 | T (parcel-bundler toolchain); lock-only |
| #4 | tar | 4.4.8→4.4.19 | T (sharp or parcel tooling); lock-only |
| #15 | bson | 1.1.1→1.1.6 | T |
| #21 | ajv | 6.10.0→6.12.6 | T |
| #26 | follow-redirects | 1.7.0→1.14.8 | T |
| #28 | sharp | 0.22.1→0.30.5 | D MAJOR |
| #35 | mongoose | 5.5.2→5.7.5 | D |
| #42 | minimatch | 3.0.4→3.1.2 | T |
| #46 | decode-uri-component | 0.2.0→0.2.2 | T |
| #52 | express | 4.16.4→4.17.3 | D |
| #65 | jsonwebtoken | 8.5.1→9.0.0 | D MAJOR |
| #70 | json5 | 1.0.1→1.0.2 | T |

Count note: the operator brief says as14 has 15 PRs; the list above gives 14 (#1,2,3,4,15,21,26,28,35,42,46,52,65,70). Totals still reconcile to 62: nf 3 + 3js 2 + as06 3 + as08 4 + as09 5 + as10 6 + as11 6 + as12 9 + as13 10 + as14 14 = 62.

**qs caveat (ambiguous, verify before editing).** PRs #57–#62 name qs 6.11.0. I believe express 4.17.3 pins an older qs (6.9.x) and only a later express 4.x pins 6.11.0, in which case raising express to 4.17.3 alone will NOT yield qs 6.11.0. Run `npm view express@4.17.3 dependencies.qs` and `npm view express versions --json` to confirm. If qs stays below 6.11.0, the conservative options are (1) take the lowest express 4.x that pins qs ≥6.11.0 (same major, still no app change), recording the deviation from the PR's 4.17.3 in the PR body; do not add npm `overrides` unless the executor documents why. Either way the executor reports the choice.

**bson caveat.** bson is not listed in any package.json; it comes through mongoose→mongodb. Whether mongoose 5.7.5's mongodb range resolves bson to 1.1.6 must be confirmed with `npm ls bson` after regeneration; if not, `npm update bson --package-lock-only` in that section.

## 3. Breaking-change flags

| Bump | Jump | Migration risk | Source change likely? |
|---|---|---|---|
| validator 10.11.0→13.7.0 (as14 #1) | MAJOR (3 majors) | `isURL`/`isEmail`/`isAlpha` option defaults and locale lists changed between majors; stricter inputs may reject strings v10 accepted. Used by the Mongoose user model validators. | Possibly; grep `validator.` in `4-natours/after-section-14/models` and `utils`. Unconfirmed until read. |
| sharp 0.22.1→0.30.5 (as13 #27, as14 #28) | MAJOR (pre-1.0 minors are breaking) | Native module; prebuilt binaries and Node engine floor changed; `toFile`/`resize` option behaviour and default (e.g. `withoutEnlargement`, `fit`) changes; 0.22 does not build on modern Node at all. | Probably small or none for plain `.resize().toFormat().jpeg().toFile()` chains; read `controllers/userController.js` (or wherever sharp is used) first. |
| jsonwebtoken 8.5.1→9.0.0 (as10 #64, as11 #63, as12 #67, as13 #66, as14 #65) | MAJOR | v9 drops Node <12, rejects weak RSA keys (<2048 bits), stricter `algorithms`/`secretOrPublicKey` handling (a missing/unsupported key type now throws), and changes `verify` option defaults for some claims. HS256 with a string secret (the usual Natours pattern) is unaffected. | Unlikely for HS256; confirm by grepping `jwt.sign|jwt.verify` in `controllers/authController.js`. |
| axios 0.18.0→0.21.2 (as14 #2) | Minor on 0.x (breaking-capable) | Error object shape and `withCredentials`/transformers tweaks; adds follow-redirects dep. Browser-side use in `public/js`. | Unlikely; used by `public/js/login.js`-style modules. Read to confirm. |
| express 4.16.4→4.17.3 (as06, 08–14) | Minor | Same major, drops some deprecated behaviours; qs/body-parser/send bumped. | Not expected. |
| mongoose 5.5.2→5.7.5 | Minor | Deprecation warnings (`useUnifiedTopology`, `useFindAndModify`); no API removal within v5. | Not expected; warnings may appear in logs. |

Likely to need source changes: validator and sharp (only if call options relied on old defaults). jsonwebtoken and axios: probably not. Express: no. The executor must read the call sites before deciding and must not edit unless a failing check proves it.

## 4. Lockfile strategy

Facts: every `package-lock.json` in the repo has `lockfileVersion: 1` (npm 6 shape; check with `grep -m1 lockfileVersion <dir>/package-lock.json`). The host npm is 9.2.0: `npm ci` refuses a v1 lockfile for being out of sync with the manifest tree format, and `npm install` rewrites it to `lockfileVersion: 3`.

Why merging the 62 Dependabot branches is unworkable: they are 62 branches against 10 lockfiles. Each as14 PR alone edits the same `4-natours/after-section-14/package-lock.json` (14 PRs there, per the table), so every merge after the first conflicts on the same JSON blocks, and each branch was generated against the v1 shape. Rebasing them one by one means 62 conflict resolutions in a generated file with no correct hand-merge.

Executable approach (per section, once):
1. Edit only the direct dependency ranges in that section's `package.json` to the target versions listed in section 2 (e.g. `"jsonwebtoken": "^9.0.0"`, `"sharp": "^0.30.5"`, `"validator": "^13.7.0"`, `"axios": "^0.21.2"`, `"express": "^4.17.3"`, `"mongoose": "^5.7.5"`).
2. Regenerate that section's lockfile once, inside the section directory:
   `npm install --package-lock-only --ignore-scripts --no-audit --no-fund`
3. Pull transitives that the existing lock keeps pinned up to target (npm retains locked versions when still in range):
   `npm update <pkg> --package-lock-only --ignore-scripts --no-audit --no-fund` for each T entry of that section (e.g. `ajv minimatch bson json5 follow-redirects decode-uri-component ws tar qs undefsafe cookiejar`).
4. Confirm with `npm ls <pkg>` (or `node -e` reading the lockfile `packages` map) that each target version, or higher in range, is what's installed.
5. Fallback only if a transitive refuses to move: delete that section's lockfile and rerun step 2. This causes far larger churn; record it.

The v1→v3 rewrite is expected. It will change nearly every line of each lockfile (new `packages` map, `requires`/`dependencies` layout, integrity data) and the diff will be large; this must be called out in the PR body and reviewed as: lockfileVersion changed, resolved version of each target package, no unrelated top-level dependency range changed in `package.json`. Do not hand-edit lockfiles. `--ignore-scripts` in the lock step avoids running sharp's native install script when only the lock is being built; the install-and-run check (section 5) is where native build happens.

## 5. "Runs fine" and "builds fine" defined

Current state: no `package.json` defines a `build` script. `1-node-farm/final` has only `start: nodemon index.js` (`1-node-farm/final/package.json`); `3-asynchronous-JS/final` has the placeholder `test` that exits 1; the natours sections have `start`/`start:prod`/`debug` etc. and as12–14 `build:js` (as14: `parcel build`; as12/13: `parcel watch`, which never exits). `.gitignore` has `node_modules/`, so installs don't pollute the diff.

Proposed script additions (the only `package.json` edits beyond version ranges; they change no app behaviour):

| Section | Add `test` | Add `build` | What the check does |
|---|---|---|---|
| nf | `node .skep-smoke.cjs` (the committed 9-check smoke at `1-node-farm/final/.skep-smoke.cjs`; present on this base) | none (nothing to build) | Real boot test: starts the server and requests pages. Needs no DB. |
| 3js | replace the placeholder with `node --check index.js && node -e "require('superagent')"` | none | Syntax check plus module load. `index.js` does network I/O (dog API), so it is not run in CI. |
| as06 | `node --check app.js server.js && node -e "require('./app')"` | none | `app.js` exports an Express app and does not connect to a DB, so loading it is a real module-graph test. |
| as08–as11 | `node --check` on entry points and each file in `models controllers routes utils`, plus a load test of `app.js` where it does not connect | none | Degraded check, see below. |
| as12–as14 | same as above | as14: reuse existing `build:js` (`parcel build ...`, it exits). as12/13: add `"build": "parcel build ./public/js/index.js --out-dir ./public/js --out-file bundle.js"` (same as as14's) | Bundle produced without error. Parcel 1 on Node 18 may fail independent of these bumps; the executor must compare against a pre-bump baseline run before blaming the bumps, and report honestly. The bundle output (`public/js/bundle.js`) must not be committed; verify with `git status`. |

**4-natours/* cannot be boot-tested without MongoDB.** `server.js` connects with Mongoose to a database URL from `config.env`, and the app depends on that connection to serve any model-backed route. No MongoDB is available in this sandbox. So for as06–as14 the check degrades to: `npm install` success (this exercises sharp's native build in as13/as14), `node --check` on entry points, a `require()` load test of the modules that do not connect, and for as12–as14 `build:js`. This proves syntax and module resolution, not runtime correctness. A real boot test requires a provisioned MongoDB (a service container, `mongodb-memory-server`, or a throwaway local `mongod`), a `DATABASE` value in a throwaway env, and then `node server.js` plus `curl` against `/api/v1/tours`. That is out of scope for this plan unless the operator provisions a database; the PR body must say so.

## 6. Test harness: `scripts/verify-all.cjs`

One Node script, no dependencies, run from repo root: `node scripts/verify-all.cjs [--only <dir>] [--json <file>] [--no-install]`.

Behaviour:
1. Section list is hardcoded: the 10 directories above.
2. For each: if `node_modules` is absent (or `--no-install` not given) run `npm install --no-audit --no-fund` (not `npm ci`, because of lockfile v1 on first run; after the bump the lockfiles are v3 so `npm ci` becomes valid and the harness should prefer `npm ci` when `lockfileVersion >= 2`). Record install exit status and wall time.
3. Run `npm test` (the scripts from section 5) and, where defined, `npm run build`. Record exit codes. Use a per-step timeout (e.g. 300 s for install, 120 s for others) and `child_process.spawnSync` with `cwd` set to the section directory.
4. Record the resolved version of every package in that section's bump list from `node_modules/<pkg>/package.json` and compare to the target (a `>=` check).
5. Print a table: `SECTION | INSTALL | TEST | BUILD | VERSIONS | RESULT`, each cell `PASS`, `FAIL`, or `n/a` (and `DEGRADED` for natours sections where the test is not a boot test).
6. Print, after the table, one JSON line prefixed `SUMMARY_JSON:` holding `{node, npm, sections:[{dir, install, test, build, versions, result}], passed, failed}`, and optionally write it to `--json`. The table plus the JSON line are what is pasted into the PR description.
7. Exit codes: `0` all sections PASS or DEGRADED-PASS; `1` at least one section FAIL; `2` harness error (cannot read a package.json, bad args). A degraded pass still exits 0 but is labelled in the table.

The harness is added to the repo as new files only; it must not modify any section file.

## 7. PR description content

The body contains, in order:
1. Summary: one paragraph, plus the explicit non-goals from section 1.
2. The bump table from section 2 (package, from→to, section, direct/transitive), with the qs/bson/express decisions noted.
3. The test matrix: the exact stdout table and `SUMMARY_JSON:` line from `node scripts/verify-all.cjs`, with Node and npm versions, and a sentence that the natours checks are DEGRADED (no MongoDB).
4. Lockfile note: all lockfiles moved from `lockfileVersion: 1` to 3; diff is large by design.
5. Breaking-change notes from section 3 and any source edits made.
6. Checklist of the 62 PRs: `- [ ] #1 validator`, …, covering `#1 #2 #3 #4 #8 … #48 #52 #56 … #71` (every number in the inventory, no others). Do not write `Closes #N`; see section 8.

## 8. Honest limits on "they all close automatically"

- GitHub does NOT close a pull request because another PR's body says `Closes #N`. That keyword syntax closes issues, not pull requests; referencing `#N` for a PR just creates a cross-link.
- Dependabot closes its own PR when, on its next run, it sees the base branch already satisfies the target version. That is not instant (it follows its schedule or a manual `@dependabot recalculate`) and is not guaranteed for transitive-only bumps, since Dependabot may judge the lockfile resolution differently, or may leave PRs open that it cannot rebase.
- Reliable fallback: after merge, close every one explicitly:
  `for n in <the 62 numbers>; do gh pr close $n --comment "Superseded by #<umbrella PR>"; done`
  Run `gh pr list --state open --search "author:app/dependabot"` first and close only entries that are in the list.
- Least likely to auto-retire: the 38 or so transitive-only PRs (e.g. #8, #37, #44, #48, #71, ajv, minimatch, bson, json5, follow-redirects, decode-uri-component, ws, tar), and any PR whose target is not reached because of the qs caveat (#57–#62) or because the executor chose a different version than Dependabot's. Direct bumps (mongoose, jsonwebtoken, sharp, validator, axios, express floor) are the most likely to be noticed. Plan on running `gh pr close` for all of them.

## 9. Execution steps (each a separate dispatch)

Each step ends with a verify command and must not touch lockfiles outside its scope.

1. **Harness and scripts, no bumps.** Create `scripts/verify-all.cjs`; add `test`/`build` scripts per section 5 to each `package.json`. Run a pre-bump baseline: `node scripts/verify-all.cjs --json /tmp/baseline.json` and record which sections already fail (e.g. sharp 0.22 or parcel on Node 18). Verify: `node --check scripts/verify-all.cjs && node scripts/verify-all.cjs --only 1-node-farm/final; echo $?`.
2. **nf and 3js bumps** (testable without a DB; 5 PRs). Edit nothing but the lockfiles (all T, lock-only), run the section 4 commands. Verify: `node scripts/verify-all.cjs --only 1-node-farm/final && node scripts/verify-all.cjs --only 3-asynchronous-JS/final`, plus `grep -m1 lockfileVersion` showing 3 and `npm ls undefsafe minimatch decode-uri-component` / `npm ls qs cookiejar` at targets.
3. **Pilot: as08** (mongoose, express, ajv, bson). Resolve the qs and bson caveats here first. Verify: `node scripts/verify-all.cjs --only 4-natours/after-section-08` and `npm ls qs bson ajv mongoose express` in that directory.
4. **as06 and as09** (same family, no jsonwebtoken). Verify: harness `--only` for each.
5. **as10 and as11** (adds jsonwebtoken 9). Read the `jwt.sign`/`jwt.verify` call sites before and after; verify: harness `--only` each plus a `node -e` that requires jsonwebtoken and signs/verifies an HS256 token.
6. **as12 and as13** (adds follow-redirects, json5, and in as13 sharp 0.30.5). Verify: harness `--only` each; confirm sharp loads with `node -e "require('sharp')"` after install.
7. **as14** (validator 13, axios, ws, tar, sharp, all the rest). Verify: harness `--only 4-natours/after-section-14` and `npm run build:js` exit 0.
8. **Full run and PR.** `node scripts/verify-all.cjs --json .verify.json`, then open the PR with the section 7 body. Verify: exit code 0, `git diff --stat` shows only the expected files, and `docs/plans` remains.
9. **Post-merge cleanup.** Close the 62 PRs (section 8), then `gh pr list --state open --author app/dependabot` returns none.

## 10. Risks

- **sharp 0.22→0.30.** Native module; 0.22 does not build on Node 18 (host is v18.19.1), 0.30.5 needs a Node >=12.13 engine and ships prebuilds for Node 18. An offline sandbox cannot download prebuilt binaries, so `npm install` may fail for as13/as14 for reasons unrelated to the code. Record this honestly; do not mark PASS on an install that did not run.
- **jsonwebtoken 8→9.** API-stricter behaviours (key size/type, algorithm handling). Check call sites; may need source edits (the non-goal is relaxed only if a check proves it).
- **validator 10→13.** Validator option defaults changed across three majors; model-level validation could reject previously accepted input. Not provable without running the model validators against fixture inputs.
- **v1→v3 lockfile rewrite size.** Diffs in each lockfile will be thousands of lines; reviewers need a scoped checklist (section 4). Re-resolution may also pull unrelated in-range transitive updates; record any.
- **No MongoDB.** No run in this environment can confirm 4-natours runtime correctness. Passing syntax, load and (if working) bundle checks says nothing about queries, auth flow or uploads.
- **Parcel 1 / old tool chains on Node 18** may fail at baseline, independent of the bumps; always compare to the step 1 baseline.
- **Auto-close** will not fully work (section 8); budget the manual `gh pr close` pass.
- **Dependabot count mismatch:** as14 is 14, not 15, in the supplied list; the executor should re-check with `gh pr list` before the final checklist.
