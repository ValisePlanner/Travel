// sw.js — Valise Manager (Desktop)
// Network First para HTML e para o código local (CSS/JS) — garante que
// você sempre veja a versão mais recente publicada no GitHub, evitando
// layout quebrado quando o HTML muda mas o CSS/JS ainda estaria em cache
// antigo. Stale-While-Revalidate só para o que raramente muda (fontes,
// ícones via CDN, logo, Chart.js).
//
// IMPORTANTE: sempre que fizer deploy de alterações (mesmo que não toquem
// neste ficheiro), suba o número da versão abaixo. É essa mudança de byte
// no sw.js que faz o navegador detetar uma atualização, instalar o novo
// worker e limpar o cache antigo. Sem isto, o navegador pode continuar a
// servir a versão anterior indefinidamente.
const CACHE_VERSION = 'v6';
const CACHE_NAME = `valise-manager-${CACHE_VERSION}`;

// Arquivos locais essenciais — se algum não puder ser cacheado, a instalação falha,
// então mantemos essa lista restrita ao que sabemos que sempre existe.
const CORE_ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js'
];

// Recursos extras (logo local + bibliotecas via CDN). São "best effort":
// se algum não existir ou a rede falhar no momento da instalação, isso
// NÃO deve impedir o cache dos arquivos essenciais acima.
const OPTIONAL_ASSETS = [
    './assets/Logo M01.png',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Extensões dos arquivos locais que mudam com frequência (o próprio código
// do app). Esses NUNCA devem usar stale-while-revalidate: se o HTML for
// atualizado mas o CSS/JS ficar servindo uma versão em cache desatualizada,
// a página renderiza com layout quebrado até o próximo reload. Por isso
// tratamos local .css/.js igual ao HTML (network-first).
const LOCAL_CODE_EXTENSIONS = ['.css', '.js'];

function isLocalCodeAsset(url){
    try {
        const u = new URL(url, self.location.href);
        if (u.origin !== self.location.origin) return false;
        return LOCAL_CODE_EXTENSIONS.some(ext => u.pathname.endsWith(ext));
    } catch {
        return false;
    }
}

// ── INSTALL: pré-cacheamento dos assets locais ──────────────────────────────
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            await cache.addAll(CORE_ASSETS);
            await Promise.all(
                OPTIONAL_ASSETS.map((url) => cache.add(url).catch(() => {}))
            );
        }).then(() => self.skipWaiting())
    );
});

// ── ACTIVATE: limpeza de caches antigos ─────────────────────────────────────
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// ── FETCH: estratégia por tipo de recurso ───────────────────────────────────
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Só tratamos requisições GET; o resto (ex.: POST) segue direto pela rede.
    if (request.method !== 'GET') return;

    // HTML principal e código local (CSS/JS): Network First (garante versão
    // fresca; cai para cache se offline)
    if (request.mode === 'navigate' || request.url.endsWith('.html') || isLocalCodeAsset(request.url)) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Demais recursos (fontes, ícones, libs externas): Stale-While-Revalidate
    event.respondWith(staleWhileRevalidate(request));
});

// ── Helpers de estratégia ───────────────────────────────────────────────────

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response && response.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        const cached = await caches.match(request);
        return cached || caches.match('./index.html');
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    const networkFetch = fetch(request)
        .then((response) => {
            if (response && response.status === 200) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => null);

    if (cached) return cached;
    return (await networkFetch) || undefined;
}
