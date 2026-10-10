/**
 * auth-guard.js — Valise Manager (Mobile / versao-mobile-turista)
 * -----------------------------------------------------------------
 * Protege esta página, mantendo a sessão viva no Supabase, mas SEM
 * depender de rede pra decidir se deixa o app aberto — o que permite
 * uso offline depois do primeiro login.
 *
 * Regras:
 * 1. Quem decide se o app abre é a presença de valise_uid/valise_session_id
 *    no localStorage (gravados pela landing page no momento do login).
 *    Esse gate e o window.valiseLogout rodam ANTES de carregar o Supabase,
 *    então funcionam mesmo se a biblioteca não estiver disponível (offline
 *    sem cache).
 * 2. O Supabase é carregado com import() dinâmico dentro de try/catch.
 *    Se falhar, o app continua abrindo; só não há heartbeat até a próxima vez.
 * 3. O heartbeat é best-effort: roda a cada 60s, ao voltar para o app
 *    (visibilitychange) e ao reconectar (online). Só força logout quando o
 *    Supabase responde de forma explícita que a sessão não é mais válida.
 *    Erros de rede/consulta são ignorados.
 * 4. Prazo de uso offline: se passar MAX_OFFLINE_DIAS sem nenhuma checagem
 *    bem-sucedida no servidor, o app exige uma nova checagem online.
 * 5. TRAVA_SESSAO_UNICA precisa ficar em sincronia com o mesmo valor
 *    usado no index.html da landing page (hoje: false).
 */

const SUPABASE_URL = "https://daodwyuzukbsxnpnuwlf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_YdsOGL2mFXGNOJwk69_uEg_89H1PG8A";
const SUPABASE_MODULE = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const CAMINHO_LOGIN = "../index.html"; // ajuste se a pasta real for outra
const TRAVA_SESSAO_UNICA = false; // manter igual ao da landing page
const MAX_OFFLINE_DIAS = 14;      // 0 = sem limite
const INTERVALO_MIN_MS = 15000;   // evita checagens em rajada (visibility + online + timer)

const localUid = localStorage.getItem('valise_uid');
const localSessionId = localStorage.getItem('valise_session_id');

/* ---------- Supabase carregado sob demanda ---------- */
let supabasePromise = null;
function getSupabase() {
    if (!supabasePromise) {
        supabasePromise = import(SUPABASE_MODULE)
            .then(({ createClient }) => createClient(SUPABASE_URL, SUPABASE_ANON_KEY))
            .catch((e) => {
                console.warn('Supabase indisponível (ignorado, app segue offline):', e);
                supabasePromise = null; // tenta de novo no próximo ciclo
                return null;
            });
    }
    return supabasePromise;
}

/* ---------- Logout (definido ANTES de qualquer await) ---------- */
let saindo = false;
async function forcarLogout(mensagem) {
    if (saindo) return;
    saindo = true;
    try {
        if (navigator.onLine && localUid) {
            const supabase = await getSupabase();
            if (supabase) {
                try { await supabase.from('sessions').update({ active: false }).eq('user_id', localUid); }
                catch (e) { console.warn('Falha ao marcar sessão como encerrada (ignorado):', e); }
                try { await supabase.auth.signOut(); } catch {}
            }
        }
    } finally {
        localStorage.removeItem('valise_session_id');
        localStorage.removeItem('valise_uid');
        localStorage.removeItem('valise_last_check');
        if (mensagem) alert(mensagem);
        window.location.href = CAMINHO_LOGIN;
    }
}

// Botão "Sair" manual — chamado pelo botão do menu Arquivo.
window.valiseLogout = function () {
    forcarLogout(null);
};

/* ---------- Prazo máximo sem checagem no servidor ---------- */
function marcarChecagemOk() {
    try { localStorage.setItem('valise_last_check', String(Date.now())); } catch {}
}
function offlineExpirado() {
    if (!MAX_OFFLINE_DIAS) return false;
    const last = Number(localStorage.getItem('valise_last_check'));
    if (!last) { marcarChecagemOk(); return false; } // 1ª vez com esta versão: começa a contar agora
    return (Date.now() - last) > MAX_OFFLINE_DIAS * 86400000;
}

/* ---------- Heartbeat ---------- */
let ultimaChecagem = 0;
async function checarSessaoNoServidor(forcar = false) {
    if (!navigator.onLine || saindo) return false;
    const agora = Date.now();
    if (!forcar && agora - ultimaChecagem < INTERVALO_MIN_MS) return false;
    ultimaChecagem = agora;
    try {
        const supabase = await getSupabase();
        if (!supabase) return false;

        const { data, error } = await supabase
            .from('sessions')
            .select('session_id, active')
            .eq('user_id', localUid)
            .maybeSingle();

        if (error) {
            console.warn('Heartbeat: falha ao consultar sessão (ignorado, não desloga):', error);
            return false;
        }
        if (!data) return false; // sem linha ainda -> não desloga, só não atualiza

        if (data.active === false) {
            forcarLogout('Sua sessão foi encerrada.');
            return false;
        }
        if (TRAVA_SESSAO_UNICA && data.session_id !== localSessionId) {
            forcarLogout('Sua conta foi acessada em outro dispositivo. Você foi desconectado por segurança.');
            return false;
        }

        marcarChecagemOk(); // servidor confirmou que a sessão é válida
        await supabase.from('sessions')
            .update({ updated_at: new Date().toISOString() })
            .eq('user_id', localUid);
        return true;
    } catch (e) {
        console.warn('Heartbeat: exceção (ignorada, provável rede):', e);
        return false;
    }
}

/* ---------- Gate de entrada: só olha o que já está salvo localmente ---------- */
if (!localUid || !localSessionId) {
    window.location.replace(CAMINHO_LOGIN);
} else {
    (async () => {
        if (offlineExpirado()) {
            // Passou do prazo: só segue se o servidor confirmar agora.
            const ok = navigator.onLine ? await checarSessaoNoServidor(true) : false;
            if (!ok && !saindo) {
                forcarLogout('Faz muito tempo desde a última verificação da sua conta. Conecte-se à internet e entre novamente.');
            }
            return;
        }
        checarSessaoNoServidor(true); // checagem inicial, sem travar a abertura do app
    })();

    setInterval(() => checarSessaoNoServidor(), 60000);
    window.addEventListener('online', () => checarSessaoNoServidor(true));
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') checarSessaoNoServidor();
    });
}
