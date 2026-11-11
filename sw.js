// Service worker mínimo: permite instalar o app. Não guarda dados em cache;
// tudo vem sempre do GitHub, para nunca mostrar saldo desatualizado.
const OFFLINE = `<!DOCTYPE html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Financeiro ENS</title><body style="font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:90vh;text-align:center;color:#444">
<div><h2>Sem conexão</h2><p>O Financeiro ENS precisa de internet.<br>Verifique a conexão e tente de novo.</p>
<button onclick="location.reload()" style="padding:12px 20px;border:0;border-radius:12px;background:#1f4e79;color:#fff;font-size:16px">Tentar de novo</button></div></body></html>`;
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  if (e.request.mode !== "navigate") return;
  e.respondWith(fetch(e.request).catch(() => new Response(OFFLINE, { headers: { "Content-Type": "text/html; charset=utf-8" } })));
});
