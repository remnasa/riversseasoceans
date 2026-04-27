import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'

export default function PostDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null }
        return r.json()
      })
      .then((data) => { if (data) setPost(data) })
  }, [slug])

  if (notFound) {
    return (
      <main style={styles.main}>
        <div style={styles.container}>
          <nav style={styles.nav}>
            <Link to="/blog" style={styles.navLink}>← Blog</Link>
          </nav>
          <p style={styles.meta}>Post not found.</p>
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main style={styles.main}>
        <div style={styles.container}>
          <p style={styles.meta}>Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <Link to="/blog" style={styles.navLink}>← Blog</Link>
        </nav>
        <h1 style={styles.title}>{post.title}</h1>
        {post.published_at && (
          <p style={styles.date}>
            {new Date(post.published_at).toLocaleDateString()}
          </p>
        )}
        <div style={styles.body}>
          <Markdown>{post.body}</Markdown>
        </div>
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
    marginBottom: '0.5rem',
    letterSpacing: '0.05em',
  },
  date: {
    fontSize: '0.8rem',
    opacity: 0.5,
    marginBottom: '2rem',
  },
  body: {
    lineHeight: '1.8',
    fontSize: '1.05rem',
  },
  meta: {
    opacity: 0.6,
    fontSize: '0.9rem',
  },
}
