# Feature Log

## 2026-09-04

- Affected area: Real-time salary desktop display.
- Completed behavior: Simplified the pet-head salary ticker to show only today's amount and removed the trailing per-second amount.
- Verification: `npm run build`.

## 2026-07-01

- Affected area: Config pet market and pet import pipeline.
- Completed behavior: Replaced the remote `codexpet.xyz` market API with a GitHub static index for `dev-zyl/LingoPet_mini_market`, including local search, sorting, pagination, and zip/raw asset download support.
- Completed behavior: Removed the community workshop page, workshop sharing UI, workshop action apply flow, and action-import deep link handling while keeping local sprite/action editing and saving.
- Verification: Ran `npm run build` and `cargo check` in `src-tauri/`.

## 2026-07-02

- Affected area: Mini market content repository.
- Completed behavior: Published 105 local pet packages, excluding the default Doro pet and the edit scratch directory, to `dev-zyl/LingoPet_mini_market` as `pet.json + spritesheet.webp` static assets with a generated market `index.json`.
- Verification: Validated that the market index contains 105 pets, all referenced manifest/preview/spritesheet files exist, all generated manifests parse as JSON, and `npm run build` passes against the updated market repository constant.

## 2026-09-04

- Affected area: Cloudflare license distribution platform.
- Completed behavior: Added a Cloudflare Pages Functions + D1 scaffold with admin-token protected batch activation-code generation, device limits, expiry dates, activation validation, and a responsive management page.
- Verification: Ran `npm run typecheck` in `license-platform`.

- Affected area: Config pet market preview.
- Completed behavior: Added click-to-preview behavior on market pet avatars, showing all manifest actions in an animated preview dialog for both downloaded and remote market pets.
- Verification: Ran `npm run build`.

- Affected area: Config pet market preview.
- Completed behavior: Updated the market action preview to always include the standard Codex 8x9 atlas actions and append manifest-defined extension actions, so pets with only custom modes in `pet.json` still show their full base action set.
- Verification: Ran `npm run build`.

- Affected area: Config pet action preview and local pet list.
- Completed behavior: Renamed preview labels from failure/running to crying/working, changed the action preview dialog to a fixed four-column grid, and reused the action preview on the local pets list so clicking a local pet avatar can select which action is used as that pet's cover animation.
- Verification: Ran `npm run build`.

- Affected area: Config pet market refresh.
- Completed behavior: Made the refresh button available on the market page and force it to reload the GitHub market index and preview manifest cache, so newly added market pets can appear without restarting the app.
- Verification: Confirmed the local market index contains `yuexinmiao` and ran `npm run build`.

- Affected area: Config local pets and market layout.
- Completed behavior: Kept pagination fixed at the bottom of the local pets and market views while limiting vertical scrolling to the middle pet list area.
- Verification: Ran `npm run build`.

- Affected area: Config local pets and market list layout.
- Completed behavior: Prevented filtered single-row pet lists from stretching to fill the entire scroll area after pagination was fixed.
- Verification: Ran `npm run build`.

- Date: 2026-08-07
- Affected area: Taisho desktop-pet artwork.
- Completed behavior: Added the selected front-facing chibi Taisho base artwork with a transparent background for future spritesheet work.
- Verification: Validated the PNG alpha output and inspected the rendered cutout.

- Date: 2026-08-07
- Affected area: Taisho desktop-pet animation assets.
- Completed behavior: Added a project-compatible 8x12 Taisho action atlas and manifest covering idle, Leo flight left/right, waving, jumping, crying, waiting, working, observing, merit, focus, and dance rows.
- Verification: Validated the 1536x2496 RGBA atlas, confirmed all 54 used cells are non-empty, and ran `npm run build`.

- Date: 2026-08-07
- Affected area: Taisho desktop-pet animation assets.
- Completed behavior: Regenerated all Taisho action strips to match the Teto atlas contract exactly: 6/8/8/4/5/8/6/6/6 standard frames plus 4/8/4 focus/music/merit frames.
- Verification: Confirmed every source strip is an exact multiple of 192x208, rebuilt the 1536x2496 atlas, inspected the contact sheet, and ran `npm run build`.

- Date: 2026-08-07
- Affected area: Taisho idle animation draft.
- Completed behavior: Added a six-frame 1152x208 horizontal idle strip with subtle breathing and one clear blink on a solid #00ff00 chroma-key background.
- Verification: Confirmed exact 1152x208 dimensions and visually inspected all six separated frames.

- Date: 2026-08-07
- Affected area: Taisho waving animation draft.
- Completed behavior: Added a four-frame 768x208 waving strip with lift, wave, pause, and return poses on a #00ff00 chroma-key background.
- Verification: Confirmed RGBA output, transparent corners, exact 192x208 frame slots, and visually inspected all four poses.

- Date: 2026-08-07
- Affected area: Taisho running-left animation draft.
- Completed behavior: Added an eight-frame 1536x208 horizontal Leo-carrying-Taisho left-flight strip on a solid #00ff00 chroma-key background.
- Verification: Confirmed exact 1536x208 dimensions, eight separated 192x208 frame slots, continuous non-repeating flight poses, and visual identity consistency.

- Date: 2026-08-07
- Affected area: Taisho running-right animation draft.
- Completed behavior: Added an eight-frame 1536x208 horizontal Leo-carrying-Taisho right-flight strip on a solid #00ff00 chroma-key background.
- Verification: Confirmed exact 1536x208 dimensions, pure-green corners, eight separated 192x208 frame slots, continuous flight poses, and visual identity consistency.

- Date: 2026-08-07
- Affected area: Taisho merit animation draft.
- Completed behavior: Added a four-frame 768x208 seated mokugyo-striking strip with raised, descending, contact, and recovery poses on a solid #00ff00 chroma-key background.
- Verification: Confirmed exact 768x208 dimensions, pure-green background pixels at frame boundaries, four separated 192x208 frame slots, and visual identity/prop continuity.

- Date: 2026-08-31
- Affected area: Merit mode hit feedback.
- Completed behavior: Restyled the merit hit message as a compact editing-page-like plaque that floats upward and fades out over 1.5 seconds.
- Verification: `npm run build`.

- Date: 2026-09-01
- Affected area: Focus mode duration input.
- Completed behavior: Replaced the single total-minutes input with separate hours and minutes fields, and renamed the timer caption to the clearer “剩余时间”.
- Verification: `npm run build`.

- Date: 2026-09-01
- Affected area: Focus mode duration display.
- Completed behavior: Removed the redundant zero-minute suffix from exact-hour focus durations, such as displaying “2小时” instead of “2小时0分钟”.
- Verification: `npm run build`.

- Date: 2026-08-31
- Affected area: Focus mode duration display.
- Completed behavior: Kept minute-second countdowns up to 60 minutes and switched longer focus durations to an explicit “x hours y minutes” format in the timer, preparation state, and start notice.
- Verification: `npm run build`.

- Date: 2026-08-31
- Affected area: Real-time salary visibility.
- Completed behavior: Kept the desktop salary indicator visible outside active work time and added clear states for before work, lunch, after work, and weekends instead of hiding it without explanation.
- Verification: `npm run build`.

- Date: 2026-08-31
- Affected area: Real-time salary.
- Completed behavior: Added salary configuration for monthly salary, workdays, work hours, lunch break, weekday-only schedule, and desktop display. The primary desk pet now updates today's earnings and second-rate once per second during valid work time, and the context menu opens the matching settings section.
- Verification: `npm run build`.

- Date: 2026-08-31
- Affected area: Merit mode hit feedback.
- Completed behavior: Simplified merit feedback to text only, with no dialog, panel, sparkle, or decorative shadow treatment.
- Verification: `npm run build`.

- Date: 2026-08-31
- Affected area: Merit mode hit feedback polish.
- Completed behavior: Refined the floating merit text into a restrained calligraphic gold treatment, removing the overly bright glow and decorative sparkle.
- Verification: `npm run build`.

- Date: 2026-08-31
- Affected area: Merit mode hit feedback.
- Completed behavior: Removed the merit hit dialog treatment and changed the feedback to stylized golden text with a small sparkle, upward motion, and gradual fade-out.
- Verification: `npm run build`.
