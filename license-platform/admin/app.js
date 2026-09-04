const $ = (id) => document.getElementById(id);
const token = () => $("admin-token").value.trim();
let latestKeys = [];
const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);

function headers() { return { "content-type": "application/json", "x-admin-token": token() }; }
function setMessage(message = "", error = true) { $("form-message").textContent = message; $("form-message").style.color = error ? "#a84c3e" : "#397250"; }
function renderKeys(licenses) {
  latestKeys = licenses.map((item) => item.key);
  $("result-meta").textContent = `${latestKeys.length} 个激活码已生成 · 请立即复制保存`;
  $("copy").disabled = latestKeys.length === 0;
  $("results").className = "results";
  $("results").innerHTML = latestKeys.map((key, index) => `<div class="key-row"><span class="key">${index + 1}. ${escapeHtml(key)}</span><button class="copy-one" data-key="${escapeHtml(key)}" type="button">复制</button></div>`).join("");
  document.querySelectorAll(".copy-one").forEach((button) => button.addEventListener("click", async () => { await navigator.clipboard.writeText(button.dataset.key); button.textContent = "已复制"; }));
}
async function generate() {
  setMessage(""); $("generate").disabled = true;
  try {
    const response = await fetch("/api/admin/generate", { method: "POST", headers: headers(), body: JSON.stringify({ count: $("count").value, maxDevices: $("devices").value, expiresAt: $("expires").value, note: $("note").value }) });
    const data = await response.json(); if (!response.ok) throw new Error(data.error || "生成失败");
    renderKeys(data.licenses); setMessage("生成成功。激活码不会再次从服务端返回。", false); await loadRecords();
  } catch (error) { setMessage(error.message || "请求失败，请检查令牌和网络"); } finally { $("generate").disabled = false; }
}
async function loadRecords() {
  if (!token()) return;
  try { const response = await fetch("/api/admin/licenses", { headers: { "x-admin-token": token() } }); const data = await response.json(); if (!response.ok) throw new Error(data.error); $("records").innerHTML = data.licenses.map((item) => `<tr><td class="key">${escapeHtml(item.id)}</td><td><span class="badge ${item.status === "active" ? "" : "revoked"}">${item.status === "active" ? "可用" : "已禁用"}</span></td><td>${Number(item.max_devices) || 1} 台</td><td>${escapeHtml(item.expires_at || "永久")}</td><td>${escapeHtml(item.note || "-")}</td><td>${escapeHtml(new Date(item.created_at).toLocaleString("zh-CN"))}</td></tr>`).join("") || `<tr><td colspan="6" class="table-empty">暂无记录</td></tr>`; $("health-text").textContent = "授权服务在线"; document.querySelector(".status-pill span:first-child").style.background = "#64b86b"; } catch (error) { $("health-text").textContent = "令牌待验证"; setMessage(error.message || "记录加载失败"); }
}
$("generate").addEventListener("click", generate); $("refresh").addEventListener("click", loadRecords); $("copy").addEventListener("click", async () => { await navigator.clipboard.writeText(latestKeys.join("\n")); $("copy").textContent = "已复制"; setTimeout(() => $("copy").textContent = "复制全部", 1600); }); $("admin-token").addEventListener("change", loadRecords);
