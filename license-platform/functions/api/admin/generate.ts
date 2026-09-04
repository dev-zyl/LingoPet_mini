import { createId, cors, hashValue, json, randomKey, requireAdmin, validExpiry, type Env } from "../../_shared";

interface GenerateBody {
  count?: unknown;
  expiresAt?: unknown;
  maxDevices?: unknown;
  note?: unknown;
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === "OPTIONS") return cors(json({ ok: true }));
  if (request.method !== "POST") return cors(json({ error: "仅支持 POST 请求" }, 405));
  const denied = requireAdmin(request, env);
  if (denied) return cors(denied);

  let body: GenerateBody;
  try {
    body = await request.json<GenerateBody>();
  } catch {
    return cors(json({ error: "请求格式无效" }, 400));
  }

  const count = Math.min(500, Math.max(1, Math.floor(Number(body.count) || 1)));
  const maxDevices = Math.min(10, Math.max(1, Math.floor(Number(body.maxDevices) || 1)));
  const expiresAt = validExpiry(body.expiresAt);
  if (body.expiresAt && !expiresAt) return cors(json({ error: "有效期格式应为 YYYY-MM-DD" }, 400));
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 200) : null;
  const productId = env.PRODUCT_ID || "LingoPet_mini";
  const createdAt = new Date().toISOString();
  const generated: Array<{ key: string; id: string; expiresAt: string | null }> = [];

  for (let index = 0; index < count; index += 1) {
    const key = randomKey();
    const id = createId("lic");
    const keyHash = await hashValue(key);
    await env.DB.prepare("INSERT INTO licenses (id, key_hash, product_id, status, expires_at, max_devices, note, created_at) VALUES (?1, ?2, ?3, 'active', ?4, ?5, ?6, ?7)")
      .bind(id, keyHash, productId, expiresAt, maxDevices, note, createdAt).run();
    generated.push({ key, id, expiresAt });
  }

  return cors(json({ ok: true, count: generated.length, licenses: generated }, 201));
};
