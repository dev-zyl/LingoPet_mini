import { cors, json, requireAdmin, type Env, type LicenseRow } from "../../_shared";

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === "OPTIONS") return cors(json({ ok: true }));
  if (request.method !== "GET") return cors(json({ error: "仅支持 GET 请求" }, 405));
  const denied = requireAdmin(request, env);
  if (denied) return cors(denied);

  const result = await env.DB.prepare("SELECT id, product_id, status, expires_at, max_devices, note, created_at FROM licenses ORDER BY created_at DESC LIMIT 200")
    .all<LicenseRow>();
  return cors(json({ ok: true, licenses: result.results || [] }));
};
