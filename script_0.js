
    import { supabase } from './supabase.js'

    window.__appSupabase = supabase

    await import('./app-access.js')

    // ── Controle de sessão única por dispositivo ──────────────────────────────
    // Cada aba/dispositivo registra um token único. Se outro dispositivo fizer
    // login, o token no banco muda e este é deslogado na próxima verificação.
    (async function setupSingleDeviceSession() {
      const SESSION_TOKEN_KEY = 'app_session_token';

      // ── Verifica se esta sessão ainda é a ativa no banco ──────────────────
      // O token foi gravado em localStorage pelo auth.js no momento do login.
      // Aqui APENAS lemos e verificamos — nunca regravamos — para que o
      // dispositivo antigo não consiga "roubar de volta" a sessão ao recarregar.
      async function checkSessionStillActive() {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session?.access_token) return;

          const myToken = localStorage.getItem(SESSION_TOKEN_KEY);
          if (!myToken) {
            await handleMissingSessionToken();
            return;
          }

          const resp = await fetch('/api/check-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + session.access_token
            },
            body: JSON.stringify({ sessionToken: myToken })
          });

          const result = await resp.json().catch(() => ({}));

          if (!resp.ok) {
            console.warn('[SkillHub] Falha ao validar sessão ativa:', result?.error || resp.statusText);
            return;
          }

          if (result.displaced === true) {
            console.warn('[SkillHub] Sessão encerrada em outro dispositivo.');
            try { await supabase.auth.signOut({ scope: 'local' }); } catch (_) {}
            localStorage.removeItem('access_profile');
            localStorage.removeItem('app_session_user_id');
            localStorage.removeItem(SESSION_TOKEN_KEY);
            window.location.replace('/auth.html');
          }
        } catch (_) {}
      }

      async function handleMissingSessionToken() {
        try {
          await supabase.auth.signOut({ scope: 'local' });
        } catch (_) {}
        localStorage.removeItem('access_profile');
        localStorage.removeItem('app_session_user_id');
        localStorage.removeItem(SESSION_TOKEN_KEY);
        window.location.replace('/auth.html?reason=session_refresh');
      }

      // Verificação imediata ao carregar + a cada 5s + ao ganhar foco/visibilidade
      const existingToken = localStorage.getItem(SESSION_TOKEN_KEY);
      if (!existingToken) {
        await handleMissingSessionToken();
        return;
      }

      checkSessionStillActive();
      setInterval(checkSessionStillActive, 5000);
      window.addEventListener('focus', () => {
        checkSessionStillActive();
      });
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          checkSessionStillActive();
        }
      });
    })();
  