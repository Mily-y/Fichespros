import dynamic from 'next/dynamic'
import Head from 'next/head'

// Chargement dynamique sans SSR (l'app utilise useState/browser APIs)
const App = dynamic(() => import('../components/App'), {
  ssr: false,
  loading: () => (
    <div style={{
      minHeight: '100vh',
      background: '#0f1117',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        background: 'linear-gradient(135deg,#4f7dff,#7c3aed)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        marginBottom: 8
      }}>📚</div>
      <div style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800 }}>FichesPro</div>
      <div style={{ color: '#64748b', fontSize: 14 }}>Chargement en cours...</div>
      <div style={{
        width: 40,
        height: 40,
        border: '3px solid rgba(79,125,255,.2)',
        borderTopColor: '#4f7dff',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        marginTop: 8
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
})

export default function Home() {
  return (
    <>
      <Head>
        <title>FichesPro — Fiches pédagogiques Bénin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <App />
    </>
  )
}
