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
 *    Nunca chama o Supabase só pra "deixar entrar" — isso funciona offline.
 * 2. O heartbeat (a cada 60s) é best-effort: só roda quando há rede
 *    (navigator.onLine) e só força logout quando o Supabase responde
 *    de forma explícita que a sessão não é mais válida. Qualquer erro
 *    de rede/consulta é ignorado — tenta de novo no próximo ciclo.
 * 3. TRAVA_SESSAO_UNICA precisa ficar em sincronia com o mesmo valor
 *    usado no index.html da landing page (hoje: false).
 */

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://daodwyuzukbsxnpnuwlf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_YdsOGL2mFXGNOJwk69_uEg_89H1PG8A";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const CAMINHO_LOGIN = "../index.html"; // ajuste se a pasta real for outra
const TRAVA_SESSAO_UNICA = false; // manter igual ao da landing page

const localUid = localStorage.getItem('valise_uid');
const localSessionId = localStorage.getItem('valise_session_id');

function forcarLogout(mensagem) {
    (async () => {
        try {
            if (navigator.onLine && localUid) {
                await supabase.from('sessions').update({ active: false }).eq('user_id', localUid);
            }
        } catch (e) {
            console.warn('Falha ao marcar sessão como encerrada (ignorado):', e);
        } finally {
            try { await supabase.auth.signOut(); } catch {}
            localStorage.removeItem('valise_session_id');
            localStorage.removeItem('valise_uid');
            if (mensagem) alert(mensagem);
            window.location.href = CAMINHO_LOGIN;
        }
    })();
}

// Botão "Sair" manual — chamado pelo botão adicionado no menu Arquivo.
window.valiseLogout = function() {
    forcarLogout(null);
};

async function checarSessaoNoServidor() {
    if (!navigator.onLine) return; // sem rede: não mexe em nada, tenta depois
    try {
        const { data, error } = await supabase
            .from('sessions')
            .select('session_id, active')
            .eq('user_id', localUid)
            .maybeSingle();

        if (error) {
            console.warn('Heartbeat: falha ao consultar sessão (ignorado, não desloga):', error);
            return;
        }
        if (!data) return; // sem linha ainda -> não desloga, só não atualiza

        if (data.active === false) {
            forcarLogout('Sua sessão foi encerrada.');
            return;
        }
        if (TRAVA_SESSAO_UNICA && data.session_id !== localSessionId) {
            forcarLogout('Sua conta foi acessada em outro dispositivo. Você foi desconectado por segurança.');
            return;
        }

        // Sessão OK -> renova o carimbo de "ainda em uso"
        await supabase.from('sessions')
            .update({ updated_at: new Date().toISOString() })
            .eq('user_id', localUid);
    } catch (e) {
        console.warn('Heartbeat: exceção (ignorada, provável rede):', e);
    }
}

// Gate de entrada: só olha o que já está salvo localmente — funciona offline.
if (!localUid || !localSessionId) {
    window.location.href = CAMINHO_LOGIN;
} else {
    if (navigator.onLine) checarSessaoNoServidor(); // checagem inicial, sem travar a abertura do app
    setInterval(checarSessaoNoServidor, 60000);
}
