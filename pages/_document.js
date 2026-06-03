import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* ── CHARSET & VIEWPORT ── */}
        <meta charSet="UTF-8" />

        {/* ── SEO ── */}
        <meta name="description" content="FichesPro — La plateforme de fiches pédagogiques pour enseignants et apprenants au Bénin. Accédez à 156+ fiches en ligne ou commandez-les imprimées." />
        <meta name="keywords" content="fiches pédagogiques, Bénin, école primaire, CE1, CE2, CM1, CM2, enseignement, apprentissage, FichesPro" />
        <meta name="author" content="FichesPro Bénin" />
        <meta name="robots" content="index, follow" />

        {/* ── OPEN GRAPH (partage réseaux sociaux) ── */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fichespro.vercel.app" />
        <meta property="og:title" content="FichesPro — Fiches pédagogiques Bénin" />
        <meta property="og:description" content="156+ fiches pédagogiques pour le primaire au Bénin. Téléchargement PDF, abonnement annuel 3 000 FCFA." />
        <meta property="og:image" content="https://fichespro.vercel.app/og-image.png" />
        <meta property="og:locale" content="fr_BJ" />
        <meta property="og:site_name" content="FichesPro" />

        {/* ── TWITTER CARD ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FichesPro — Fiches pédagogiques Bénin" />
        <meta name="twitter:description" content="156+ fiches pédagogiques pour le primaire au Bénin." />
        <meta name="twitter:image" content="https://fichespro.vercel.app/og-image.png" />

        {/* ── PWA MANIFEST ── */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f7dff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FichesPro" />

        {/* ── ICÔNES ── */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* ── FONTS GOOGLE (optionnel, améliore le design) ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* ── COULEUR BARRE NAVIGATEUR ANDROID ── */}
        <meta name="msapplication-TileColor" content="#4f7dff" />
        <meta name="msapplication-TileImage" content="/icon-192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
