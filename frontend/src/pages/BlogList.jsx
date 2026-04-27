import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>← Home</Link>
        </nav>
        <h1 style={styles.title}>Blog</h1>
        {loading && <p style={styles.meta}>Loading...</p>}
        {!loading && posts.length === 0 && (
          <p style={styles.meta}>No posts yet.</p>
        )}
        <ul style={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} style={styles.item}>
              <Link to={`/blog/${post.slug}`} style={styles.postLink}>
                {post.title}
              </Link>
              {post.published_at && (
                <span style={styles.date}>
                  {new Date(post.published_at).toLocaleDateString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    background: '#0a1628',
    color: '#d4b896',
    fontFamily: 'Georgia, serif',
    padding: '3rem 1.5rem',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
  },
  nav: {
    marginBottom: '2rem',
  },
  navLink: {
    color: '#6baed6',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
  title: {
    fontSize: '2rem',
    color: '#c9a87c',
    marginBottom: '2rem',
    letterSpacing: '0.05em',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '1rem 0',
    borderBottom: '1px solid rgba(212, 184, 150, 0.15)',
  },
  postLink: {
    color: '#d4b896',
    textDecoration: 'none',
    fontSize: '1.1rem',
  },
  date: {
    fontSize: '0.8rem',
    opacity: 0.5,
  },
  meta: {
    opacity: 0.6,
    fontSize: '0.9rem',
  },
}
