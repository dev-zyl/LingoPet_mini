# LingoPet License Platform

Cloudflare Pages Functions + D1 based activation code platform for LingoPet Mini.

## Deploy

1. Create a D1 database and replace `database_id` in `wrangler.toml`.
2. Apply the schema:

   ```bash
   npx wrangler d1 execute lingopet-licenses --remote --file=schema.sql
   ```

3. Set a secret used by the admin page:

   ```bash
   npx wrangler pages secret put ADMIN_TOKEN --project-name lingopet-license-platform
   ```

4. Deploy the `license-platform` directory as a Cloudflare Pages project. Set the build output directory to `admin`; Functions must remain at the project root.

The admin page is available at `/`. It sends the admin token in `x-admin-token`. Generated plaintext keys are returned only by the batch generation response; the database stores SHA-256 hashes.

## API

- `GET /api/health`: public health check.
- `POST /api/activate`: client activation with `{ licenseKey, deviceHash }`.
- `POST /api/admin/generate`: admin-only batch generation, max 500 per request.
- `GET /api/admin/licenses`: admin-only metadata list; plaintext keys are never returned.

The current activation response is intentionally unsigned for the first server integration milestone. Before enforcing it in the Tauri client, add an Ed25519 signing key in Cloudflare Secrets and embed only the matching public key in the app.
