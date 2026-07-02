# Feature Log

## 2026-07-01

- Affected area: Config pet market and pet import pipeline.
- Completed behavior: Replaced the remote `codexpet.xyz` market API with a GitHub static index for `dev-zyl/LingoPet_mini_market`, including local search, sorting, pagination, and zip/raw asset download support.
- Completed behavior: Removed the community workshop page, workshop sharing UI, workshop action apply flow, and action-import deep link handling while keeping local sprite/action editing and saving.
- Verification: Ran `npm run build` and `cargo check` in `src-tauri/`.

## 2026-07-02

- Affected area: Mini market content repository.
- Completed behavior: Published 105 local pet packages, excluding the default Doro pet and the edit scratch directory, to `dev-zyl/LingoPet_mini_market` as `pet.json + spritesheet.webp` static assets with a generated market `index.json`.
- Verification: Validated that the market index contains 105 pets, all referenced manifest/preview/spritesheet files exist, all generated manifests parse as JSON, and `npm run build` passes against the updated market repository constant.

- Affected area: Config pet market preview.
- Completed behavior: Added click-to-preview behavior on market pet avatars, showing all manifest actions in an animated preview dialog for both downloaded and remote market pets.
- Verification: Ran `npm run build`.
