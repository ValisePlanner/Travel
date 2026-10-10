// sw.js — Valise Manager (Mobile)
// Network First (com timeout) para HTML e para o código local (CSS/JS) — garante que
// a página carregue com a versão mais recente publicada, mas sem travar em rede ruim:
// se a rede não responder em NETWORK_TIMEOUT_MS e houver cópia em cache, usa o cache.
// Stale-While-Revalidate só para o que raramente muda (fontes, ícones via CDN, logo).
//
// O Service Worker NÃO intercepta nada fora da própria origem e da lista de CDNs
// abaixo. Em especial, chamadas ao Supabase (supabase.co) passam direto pela rede:
// nunca ficam em cache (evita checar sessão com resposta velha e evita guardar
// respostas autenticadas no Cache Storage).
//
// IMPORTANTE: sempre que fizer deploy de alterações (mesmo que não toquem
// neste ficheiro), suba o número da versão abaixo. É essa mudança de byte
// no sw.js que faz o navegador detetar uma atualização, instalar o novo
// worker e limpar o cache antigo.
const CACHE_VERSION = 'v7';
const CACHE_NAME = `valise-mobile-${CACHE_VERSION}`;
const NETWORK_TIMEOUT_MS = 3500;

// Arquivos locais essenciais.
const CORE_ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js'
];

// Recursos extras — "best effort": falha aqui nunca impede a instalação.
const SUPABASE_MODULE = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const OPTIONAL_ASSETS = [
    './manifest.json',
    './auth-guard.js',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-512-maskable.png',
    './icons/apple-touch-icon.png',
    '../assets/Logo T01.png',
    SUPABASE_MODULE,
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap'
];

// Únicos hosts externos que o SW pode servir/cachear.
const CDN_HOSTS = [
    'cdnjs.cloudflare.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdn.jsdelivr.net'
];

const LOCAL_CODE_EXTENSIONS = ['.css', '.js'];

function isLocalCodeAsset(u){
    return u.origin === self.location.origin &&
        LOCAL_CODE_EXTENSIONS.some(ext => u.pathname.endsWith(ext));
}

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            await Promise.all(
                CORE_ASSETS.concat(OPTIONAL_ASSETS).map((url) => cache.add(url).catch(() => {}))
            );
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k.startsWith('valise-mobile-') && k !== CACHE_NAME).map((k) => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    let u;
    try { u = new URL(request.url); } catch { return; }

    // Fora da própria origem e da lista de CDNs (ex.: Supabase): não mexe.
    if (u.origin !== self.location.origin && !CDN_HOSTS.includes(u.hostname)) return;

    if (request.mode === 'navigate' || u.pathname.endsWith('.html') || isLocalCodeAsset(u)) {
        event.respondWith(networkFirst(event));
        return;
    }
    event.respondWith(staleWhileRevalidate(event));
});

async function networkFirst(event) {
    const request = event.request;
    const cache = await caches.open(CACHE_NAME);

    const fetchPromise = fetch(request).then((response) => {
        if (response && response.status === 200) {
            event.waitUntil(cache.put(request, response.clone()).catch(() => {}));
        }
        return response;
    });
    fetchPromise.catch(() => {}); // evita "unhandled rejection" se o timeout vencer antes

    const timeout = new Promise((resolve) => setTimeout(() => resolve(null), NETWORK_TIMEOUT_MS));

    try {
        const response = await Promise.race([fetchPromise, timeout]);
        if (response) return response;
        // Rede lenta: usa o cache se existir; senão espera a rede terminar.
        const cached = await cache.match(request, { ignoreSearch: true });
        return cached || await fetchPromise;
    } catch {
        const cached = await cache.match(request, { ignoreSearch: true });
        if (cached) return cached;
        if (request.mode === 'navigate') {
            const shell = await cache.match('./index.html');
            if (shell) return shell;
        }
        return Response.error();
    }
}

async function staleWhileRevalidate(event) {
    const request = event.request;
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    const networkFetch = fetch(request)
        .then((response) => {
            if (response && response.status === 200) {
                event.waitUntil(cache.put(request, response.clone()).catch(() => {}));
            }
            return response;
        })
        .catch(() => null);
    if (cached) {
        event.waitUntil(networkFetch); // deixa a atualização terminar em segundo plano
        return cached;
    }
    return (await networkFetch) || Response.error();
}
