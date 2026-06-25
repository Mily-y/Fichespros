import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";

const supa = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const G = {
  bg: "#0f1117",
  card: "#1a1f2e",
  border: "rgba(99,130,255,.18)",
  accent: "#4f7dff",
  accentLight: "#6b96ff",
  success: "#10b981",
  danger: "#ef4444",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
};

export default function ResetPassword() {
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState(false);
  const [sessionOk, setSessionOk] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(function() {
    // Supabase envoie le token dans le hash de l'URL
    // Il faut récupérer la session depuis ce token
    supa.auth.getSession().then(function({ data }) {
      if (data.session) {
        setSessionOk(true);
      } else {
        // Essayer de récupérer depuis le hash URL (token magique)
        var hash = window.location.hash;
        if (hash && hash.includes("access_token")) {
          supa.auth.getSession().then(function({ data: d2 }) {
            setSessionOk(!!(d2 && d2.session));
          });
        }
      }
      setCheckingSession(false);
    }).catch(function() {
      setCheckingSession(false);
    });
  }, []);

  async function handleReset() {
    setErreur("");
    if (!pwd || pwd.length < 8) {
      setErreur("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (pwd !== pwd2) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      var { error } = await supa.auth.updateUser({ password: pwd });
      if (error) throw new Error(error.message);
      setSucces(true);
      // Déconnecter après 3 secondes puis rediriger
      setTimeout(async function() {
        await supa.auth.signOut();
        window.location.href = "/";
      }, 3000);
    } catch(e) {
      setErreur(e.message || "Erreur lors de la mise à jour du mot de passe.");
    }
    setLoading(false);
  }

  const styles = {
    page: {
      minHeight: "100vh",
      background: G.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      fontFamily: "'Segoe UI', Arial, sans-serif",
      color: G.textPrimary,
    },
    card: {
      background: G.card,
      border: "1px solid " + G.border,
      borderRadius: 20,
      padding: 32,
      width: "100%",
      maxWidth: 420,
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 28,
      justifyContent: "center",
    },
    logoIcon: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: "linear-gradient(135deg,#4f7dff,#7c3aed)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
    },
    logoText: {
      fontSize: 20,
      fontWeight: 800,
      color: G.textPrimary,
    },
    label: {
      fontSize: 11,
      fontWeight: 700,
      color: G.textMuted,
      textTransform: "uppercase",
      display: "block",
      marginBottom: 5,
      letterSpacing: "0.5px",
    },
    input: {
      width: "100%",
      padding: "11px 15px",
      background: "#161b27",
      border: "1px solid " + G.border,
      borderRadius: 10,
      color: G.textPrimary,
      fontFamily: "inherit",
      fontSize: 14,
      outline: "none",
      boxSizing: "border-box",
      marginBottom: 14,
    },
    btn: {
      width: "100%",
      padding: "13px 20px",
      background: "linear-gradient(135deg,#4f7dff,#7c3aed)",
      border: "none",
      borderRadius: 12,
      color: "#fff",
      fontWeight: 700,
      fontSize: 15,
      cursor: "pointer",
      fontFamily: "inherit",
      marginTop: 6,
    },
    errBox: {
      background: "rgba(239,68,68,.08)",
      border: "1px solid rgba(239,68,68,.25)",
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13,
      color: G.danger,
      marginBottom: 14,
    },
    succBox: {
      background: "rgba(16,185,129,.08)",
      border: "1px solid rgba(16,185,129,.25)",
      borderRadius: 10,
      padding: "14px",
      fontSize: 13,
      color: G.success,
      textAlign: "center",
    },
  };

  return (
    <>
      <Head>
        <title>Réinitialisation mot de passe — FichesPro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          body { margin: 0; background: #0f1117; }
          input:focus { border-color: #4f7dff !important; }
        `}</style>
      </Head>

      <div style={styles.page}>
        <div style={styles.card}>
          {/* Logo */}
          <div style={styles.logo}>
            <div style={styles.logoIcon}>📚</div>
            <span style={styles.logoText}>FichesPro</span>
          </div>

          {checkingSession ? (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:36, marginBottom:12 }}>⏳</div>
              <p style={{ color:G.textSecondary }}>Vérification en cours...</p>
            </div>
          ) : succes ? (
            <div style={styles.succBox}>
              <div style={{ fontSize:42, marginBottom:12 }}>✅</div>
              <p style={{ fontWeight:700, fontSize:15, marginBottom:8 }}>
                Mot de passe mis à jour !
              </p>
              <p style={{ color:G.textSecondary, fontSize:13 }}>
                Vous allez être redirigé vers la page de connexion dans 3 secondes...
              </p>
            </div>
          ) : !sessionOk ? (
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:42, marginBottom:12 }}>❌</div>
              <h2 style={{ fontSize:18, fontWeight:700, marginBottom:10 }}>Lien invalide ou expiré</h2>
              <p style={{ color:G.textSecondary, fontSize:13, marginBottom:20 }}>
                Ce lien de réinitialisation n'est plus valide. Veuillez faire une nouvelle demande.
              </p>
              <button style={styles.btn} onClick={function(){ window.location.href = "/"; }}>
                Retour à l'accueil
              </button>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize:20, fontWeight:800, marginBottom:6, textAlign:"center" }}>
                🔐 Nouveau mot de passe
              </h2>
              <p style={{ color:G.textSecondary, fontSize:13, marginBottom:22, textAlign:"center" }}>
                Choisissez un mot de passe sécurisé pour votre compte FichesPro.
              </p>

              <div>
                <label style={styles.label}>Nouveau mot de passe *</label>
                <input
                  style={styles.input}
                  type="password"
                  placeholder="Minimum 8 caractères"
                  value={pwd}
                  onChange={function(e){ setPwd(e.target.value); setErreur(""); }}
                />
              </div>

              <div>
                <label style={styles.label}>Confirmer le mot de passe *</label>
                <input
                  style={styles.input}
                  type="password"
                  placeholder="Répétez le mot de passe"
                  value={pwd2}
                  onChange={function(e){ setPwd2(e.target.value); setErreur(""); }}
                  onKeyDown={function(e){ if(e.key==="Enter") handleReset(); }}
                />
              </div>

              {/* Indicateur de force */}
              {pwd.length > 0 && (
                <div style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", gap:4, marginBottom:4 }}>
                    {[1,2,3,4].map(function(i){
                      var force = pwd.length >= 8 ? (
                        pwd.length >= 12 ? 4 : pwd.length >= 10 ? 3 : 2
                      ) : 1;
                      return <div key={i} style={{
                        flex:1, height:4, borderRadius:2,
                        background: i <= force
                          ? (force >= 3 ? G.success : force >= 2 ? "#f59e0b" : G.danger)
                          : "rgba(255,255,255,.1)"
                      }} />;
                    })}
                  </div>
                  <div style={{ fontSize:11, color:G.textMuted }}>
                    {pwd.length < 8 ? "Trop court" : pwd.length < 10 ? "Acceptable" : pwd.length < 12 ? "Bon" : "Excellent"}
                  </div>
                </div>
              )}

              {erreur && <div style={styles.errBox}>❌ {erreur}</div>}

              <button
                style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
                onClick={handleReset}
                disabled={loading}
              >
                {loading ? "⏳ Mise à jour..." : "Enregistrer le nouveau mot de passe"}
              </button>

              <div style={{ marginTop:16, textAlign:"center" }}>
                <a href="/" style={{ color:G.accentLight, fontSize:13, textDecoration:"none" }}>
                  ← Retour à la connexion
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
