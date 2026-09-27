// sw.js — Valise Manager (Mobile)
// Network First para HTML e para o código local (CSS/JS) — garante que a
// página sempre carregue com a versão mais recente publicada, evitando
// layout quebrado quando o HTML muda mas o CSS/JS ainda estaria em cache
// antigo. Stale-While-Revalidate só para o que raramente muda (fontes,
// ícones via CDN, logo).
//
// IMPORTANTE: sempre que fizer deploy de alterações (mesmo que não toquem
// neste ficheiro), suba o número da versão abaixo. É essa mudança de byte
// no sw.js que faz o navegador detetar uma atualização, instalar o novo
// worker e limpar o cache antigo. Sem isto, o navegador pode continuar a
// servir a versão anterior indefinidamente — especialmente sensível no
// mobile, onde o usuário raramente força um refresh manual.
const CACHE_VERSION = 'v2';
const CACHE_NAME = `valise-mobile-${CACHE_VERSION}`;

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
    '../assets/Logo T01.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap'
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

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    if (request.mode === 'navigate' || request.url.endsWith('.html') || isLocalCodeAsset(request.url)) {
        event.respondWith(networkFirst(request));
        return;
    }
    event.respondWith(staleWhileRevalidate(request));
});

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
