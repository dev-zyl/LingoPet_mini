import { cors, hashValue, json, licenseExpired, type Env, type LicenseRow } from "../_shared";

interface ActivateBody {
  licenseKey?: unknown;
  deviceHash?: unknown;
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === "OPTIONS") return cors(json({ ok: true }));
  if (request.method !== "POST") return cors(json({ error: "仅支持 POST 请求" }, 405));

  let body: ActivateBody;
  try {
    body = await request.json<ActivateBody>();
  } catch {
    return cors(json({ error: "请求格式无效" }, 400));
  }

  const licenseKey = typeof body.licenseKey === "string" ? body.licenseKey.trim().toUpperCase() : "";
  const deviceHash = typeof body.deviceHash === "string" ? body.deviceHash.trim().toLowerCase() : "";
  if (!licenseKey || !/^[a-f0-9]{32,128}$/.test(deviceHash)) {
    return cors(json({ error: "激活码或设备指纹无效" }, 400));
  }

  const keyHash = await hashValue(licenseKey);
  const license = await env.DB.prepare("SELECT id, product_id, status, expires_at, max_devices, note, created_at FROM licenses WHERE key_hash = ?1")
    .bind(keyHash).first<LicenseRow>();
  if (!license || license.product_id !== (env.PRODUCT_ID || "LingoPet_mini")) return cors(json({ error: "激活码不存在" }, 404));
  if (license.status !== "active") return cors(json({ error: "激活码已被禁用" }, 403));
  if (licenseExpired(license.expires_at)) return cors(json({ error: "激活码已过期" }, 403));

  const existing = await env.DB.prepare("SELECT id FROM activations WHERE license_id = ?1 AND device_hash = ?2")
    .bind(license.id, deviceHash).first<{ id: number }>();
  if (!existing) {
    const count = await env.DB.prepare("SELECT COUNT(*) AS count FROM activations WHERE license_id = ?1")
      .bind(license.id).first<{ count: number }>();
    if ((count?.count || 0) >= license.max_devices) return cors(json({ error: "激活码已达到设备数量上限" }, 403));
    const now = new Date().toISOString();
    await env.DB.prepare("INSERT INTO activations (license_id, device_hash, activated_at, last_check_at) VALUES (?1, ?2, ?3, ?3)")
      .bind(license.id, deviceHash, now).run();
  } else {
    await env.DB.prepare("UPDATE activations SET last_check_at = ?1 WHERE id = ?2")
      .bind(new Date().toISOString(), existing.id).run();
  }

  return cors(json({
    ok: true,
    product: license.product_id,
    licenseId: license.id,
    deviceHash,
    expiresAt: license.expires_at,
    features: ["market", "salary"]
  }));
};
