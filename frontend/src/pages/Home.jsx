export default function Home() {
  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.title}>Rivers · Seas · Oceans</h1>
        <p style={styles.subtitle}>
          A personal learning platform and portfolio.
        </p>
        <nav style={styles.nav}>
          <a href="/blog" style={styles.link}>Blog</a>
        </nav>
      </div>
    </main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a1628',
    color: '#d4b896',
    fontFamily: 'Georgia, serif',
  },
  card: {
    textAlign: 'center',
    padding: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
    color: '#c9a87c',
  },
  subtitle: {
    fontSize: '1.1rem',
    opacity: 0.8,
    marginBottom: '2rem',
  },
  nav: {
    marginTop: '2rem',
  },
  link: {
    color: '#6baed6',
    textDecoration: 'none',
    fontSize: '1rem',
    letterSpacing: '0.05em',
  },
}
