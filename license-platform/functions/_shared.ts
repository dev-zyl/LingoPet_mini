export interface Env {
  DB: D1Database;
  ADMIN_TOKEN: string;
  PRODUCT_ID: string;
}

export interface LicenseRow {
  id: string;
  product_id: string;
  status: "active" | "revoked";
  expires_at: string | null;
  max_devices: number;
  note: string | null;
  created_at: string;
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*"
    }
  });
}

export function cors(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("access-control-allow-origin", "*");
  headers.set("access-control-allow-headers", "content-type, x-admin-token");
  headers.set("access-control-allow-methods", "GET, POST, OPTIONS");
  return new Response(response.body, { status: response.status, headers });
}

export function requireAdmin(request: Request, env: Env): Response | null {
  if (!env.ADMIN_TOKEN || request.headers.get("x-admin-token") !== env.ADMIN_TOKEN) {
    return json({ error: "管理员令牌无效" }, 401);
  }
  return null;
}

export async function hashValue(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function createId(prefix: string): string {
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  const suffix = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${prefix}_${suffix}`;
}

export function validExpiry(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T23:59:59.999Z`);
  return Number.isNaN(date.getTime()) ? null : value;
}

export function randomKey(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  let value = "";
  for (const byte of bytes) value += alphabet[byte % alphabet.length];
  return `LP-${value.slice(0, 5)}-${value.slice(5, 10)}-${value.slice(10, 15)}-${value.slice(15)}`;
}

export function licenseExpired(expiresAt: string | null): boolean {
  return Boolean(expiresAt && `${expiresAt}T23:59:59.999Z` < new Date().toISOString());
}
