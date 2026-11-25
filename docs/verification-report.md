# Verification Report

Base commit: `b52b56d1a55a55c082cd1b910703718ec64fb54b`

## 1-node-farm/final

**Verdict: WORKING** (npm ci exit 0, npm test exit 0)

- `npm ci --ignore-scripts --no-audit --no-fund` exit status: 0
- `npm test` exit status: 0

Last lines of npm ci:

```
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated source-map-resolve@0.5.3: See https://github.com/lydell/source-map-resolve#deprecated

added 213 packages in 792ms
```

Full npm test output:

```

> node-farm@1.0.0 test
> node .skep-smoke.cjs

PASS GET /api 200
PASS GET /api valid JSON
PASS GET /api 5 products
PASS GET /overview 200
PASS GET /overview renders cards
PASS GET /product?id=0 200
PASS GET /product?id=0 has name
PASS GET /does-not-exist 404
PASS GET / returns overview
--- app output ---
[
  'fresh-avocados',
  'goat-and-sheep-cheese',
  'apollo-broccoli',
  'baby-carrots',
  'sweet-corncobs'
]
Listening to requests on port 8000
RESULT PASS
```

## 3-asynchronous-JS/final

**Verdict: WORKING** (npm ci exit 0, npm test exit 0)

- `npm ci --ignore-scripts --no-audit --no-fund` exit status: 0
- `npm test` exit status: 0

Last lines of npm ci:

```
npm WARN deprecated formidable@1.2.6: Please upgrade to latest, formidable@v2 or formidable@v3! Check these notes: https://bit.ly/2ZEqIau
npm WARN deprecated superagent@5.3.1: Please upgrade to superagent v10.2.2+, see release notes at https://github.com/forwardemail/superagent/releases/tag/v10.2.2 - maintenance is supported by Forward Email @ https://forwardemail.net

added 42 packages in 385ms
```

Full npm test output:

```

> 3-asynchronous-js@1.0.0 test
> node --check index.js && node -e "require('superagent')"

```

## Installed versions: target vs actual

| Section | Package | Target | Actual | Match |
|---|---|---|---|---|
| 1-node-farm/final | undefsafe | 2.0.5 | 2.0.5 | yes |
| 1-node-farm/final | minimatch | 3.1.2 | 3.1.2 | yes |
| 1-node-farm/final | decode-uri-component | 0.2.2 | 0.2.2 | yes |
| 3-asynchronous-JS/final | qs | 6.11.0 | 6.11.0 | yes |
| 3-asynchronous-JS/final | cookiejar | 2.1.4 | 2.1.4 | yes |
| 3-asynchronous-JS/final | superagent | resolved | 5.3.1 | n/a |

## What this does NOT prove

The 4-natours sections were not tested. No MongoDB-backed runtime test was run. The native module sharp was never compiled, since installs used --ignore-scripts. The 3-asynchronous-JS test is only a syntax check plus a require of superagent, not a behavioural test.
