import { cors, json, type Env } from "../_shared";

export const onRequest: PagesFunction<Env> = ({ request, env }) => {
  if (request.method === "OPTIONS") return cors(json({ ok: true }));
  return cors(json({ ok: true, product: env.PRODUCT_ID || "LingoPet_mini" }));
};
