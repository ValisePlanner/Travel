// sw.js — Valise (Landing / Login)
// Permite abrir a landing page mesmo sem internet, pra quem já logou antes
// conseguir entrar direto no app sem depender de rede (a checagem de
// sessão salva fica no index.html — este arquivo só garante que o HTML/
// CSS/JS da própria página carreguem offline).
//
// Mesma regra das outras partes do ecossistema: HTML sempre network-first
// (garante a versão mais recente quando há internet); só os recursos
// externos que quase nunca mudam (fontes, ícones) usam stale-while-
// revalidate. Lembre de subir o CACHE_VERSION a cada deploy que mexer
// nesta página ou no redefinir-senha.html.
const CACHE_VERSION = 'v1';
const CACHE_NAME = `valise-landing-${CACHE_VERSION}`;

const CORE_ASSETS = [
    './',
    './index.html',
    './redefinir-senha.html'
];

const OPTIONAL_ASSETS = [
    'assets/Logo T01.png',
    'assets/Logo F.ico',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=DM+Sans:wght@400;500;700&display=swap'
];

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

    if (request.mode === 'navigate' || request.url.endsWith('.html')) {
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
