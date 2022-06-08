import { createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header';
import './App.css'
import Home from './pages/Home';
import Article from './pages/Article';
import DeleteModal from './components/DeleteModal'
import PostArticle from './pages/PostArticle';


export const PostContext = createContext()

function App() {
  const [deletedItem, setDeletedItem] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  useEffect(() => {
    if (deletedItem) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${deletedItem}`, {
        method: 'DELETE',
      })
    }
  }, [deletedItem])

  const openModal = (article, username) => {
    setDeleteModalOpen({ article, username })
    document.querySelector('body').style.overflow = 'hidden'
  }

  const closeModal = () => {
    setDeleteModalOpen(null)
    document.querySelector('body').style.overflow = 'unset'
  }

  const deletePost = (articleId) => {
    setDeletedItem(articleId)
    closeModal()
  }

  const editPost = () => {}
  
  return (
    <div className='App'>
      <PostContext.Provider value={{ openModal, closeModal, deletePost, deletedItem }}>
        <Router>
          <Header />

          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/new' element={<PostArticle />} />
            <Route path='/post/:postId' element={<Article />} />
            {/* <Route path='/edit/:postId' element={} /> */}
          </Routes>
        </Router>
      </PostContext.Provider>

      {deleteModalOpen && (
        <DeleteModal
          article={deleteModalOpen.article}
          user={deleteModalOpen.username}
          deletePost={deletePost}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}

export default App;
