# research-browser

Browser-driven deep-research dispatch runner. Drives the **consumer web UIs** of
Gemini Deep Research and Grok DeepSearch to produce the same cited
`research-reports/<slug>/{google,x}.md` dispatches that `scripts/deep-research.mjs`
produces via the paid APIs — but for free, from a logged-in browser session.

It is the **default** research backend in `scripts/research-pipeline.mjs`
(`npm run research:all`); the paid APIs are the fallback.

## Why two different auth models

The two engines cannot both run fully headless:

- **Gemini (`google`)** runs **fully headless** from a dedicated, logged-in
  Chrome profile. Google's OAuth blocks automated browsers ("this browser may
  not be secure"), but that check keys on `navigator.webdriver` /
  `--enable-automation`, which this tool disables — so a one-time login sticks
  and every later run is headless and hands-off.
- **Grok (`x`)** **cannot** run headless. `accounts.x.ai` sits behind a
  Cloudflare block that hard-refuses any Playwright-launched Chrome regardless
  of de-automation (it fingerprints deeper than `navigator.webdriver`). The
  workaround is to attach over CDP to a **normally-launched** Chrome that is
  already logged into Grok — Cloudflare sees a real browser and lets it through.

## One-time setup

```sh
# deps (system Google Chrome is used via channel:'chrome' — no browser download)
cd scripts/research-browser && npm install && cd ../..
```

### Gemini profile (for `google`, headless)

```sh
node scripts/research-browser/index.mjs --login
```

Sign into Gemini in the window that opens. The session persists at
`~/.research-browser/chrome-profile` and is reused headless forever. Verify:

```sh
node scripts/research-browser/index.mjs --slug <slug> --model "<Name>" --source google --dry-run
```

### Grok debug Chrome (for `x`, CDP-attach)

Launch a dedicated debug Chrome (coexists with your everyday Chrome — separate
`--user-data-dir`, so nothing of yours is touched) and sign into Grok once:

```sh
"C:/Program Files/Google/Chrome/Application/chrome.exe" \
  --remote-debugging-port=9223 \
  --user-data-dir="C:/Users/<you>/.research-browser/cdp-profile" \
  https://grok.com
```

Its login persists in that profile; on later runs just relaunch the same command
(it comes up logged in). The tool attaches with `--cdp http://localhost:9223`.

## Direct usage

```sh
# google — headless, uses the logged-in profile
node scripts/research-browser/index.mjs \
  --slug glm-5-2 --model "GLM 5.2" --source google \
  --org "Z.ai" --released 2026 --release-url https://z.ai/blog/glm-5.2

# x — attaches to the debug Chrome over CDP
node scripts/research-browser/index.mjs \
  --slug glm-5-2 --model "GLM 5.2" --source x --cdp http://localhost:9223
```

Key flags: `--headful` (watch the run), `--dry-run` (compose prompt only),
`--force` (overwrite output), `--profile <dir>`, `--out <path>`,
`--timeout <min>` (default 25), `--no-prepare` (skip tier/mode setting).
The prompt is composed by `scripts/generate-research-brief.ts` — never
reimplemented here — so `--org` / `--released` / `--release-url` pass straight
through to it.

## Via the pipeline

```sh
# browser is the default; x needs the CDP endpoint
npm run research:all -- --slug glm-5-2 --model "GLM 5.2" \
  --org "Z.ai" --released 2026 --release-url https://z.ai/blog/glm-5.2 \
  --cdp http://localhost:9223

npm run research:all -- ... --api    # force the paid deep-research.mjs backend
```

Without `--cdp`, the `x` step falls back to the paid xAI API when `XAI_API_KEY`
is set, otherwise it is reported blocked with guidance.

## Selectors & timings (validated 2026-07-22)

- Gemini: Deep Research is a toggle inside the **"Upload & tools"** menu
  (labelled "Deep research"); Pro tier is remembered by the profile. After
  submit, the run gates behind a **"Start research"** button whose appearance
  scales with prompt size (polled up to 4 min). Completion = the
  `[aria-label="Stop response"]` control disappearing. Report is read from
  `immersive-panel .markdown-main-panel` after clicking **"Open"**.
- Grok: Expert tier via `[aria-label="Model select"]` → "Expert"; DeepSearch is
  triggered by the `Use DeepSearch:` prefix carried in the `x` persona prompt.
  Report is read from the largest `.response-content-markdown` that has headings.

## Known limitations

- Gemini's complex tables (e.g. pricing with URLs inside cells) render
  imperfectly in the extracted markdown — data and links survive, tabular
  structure may not. Fine for raw dispatch material; the author phase rewrites.
- If a UI selector drifts, rerun with `--headful` to inspect, then update the
  engine config in `index.mjs`.
