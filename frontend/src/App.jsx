import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import PostDetail from './pages/PostDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
