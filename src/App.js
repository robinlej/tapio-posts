import { createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Article from './pages/Article';
import PostArticle from './pages/PostArticle';
import Header from './components/Header';
import DeleteModal from './components/DeleteModal'

import './App.css'

export const PostContext = createContext()

function App() {
  const [deletedItem, setDeletedItem] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(null)

  const [posts, setPosts] = useState(
    JSON.parse(window.localStorage.getItem('posts'))
  )

  // Get first posts if none in local storage
  useEffect(() => {
    if (posts === null) {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
          setPosts(json.slice(0, 10).reverse())
        })
    }
  }, [])

  // Update posts in local storage
  useEffect(() => {
    window.localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  // Delete post
  useEffect(() => {
    if (deletedItem) {
      // This fetch is useful in a real app environment, but actually useless here as it won't do anything.
      fetch(`https://jsonplaceholder.typicode.com/posts/${deletedItem}`, {
        method: 'DELETE',
      })

      const newPosts = posts.filter((post) => post.id !== deletedItem)
      setPosts(newPosts)
      
      setDeletedItem(null)
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

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev])
  }

  const deletePost = (articleId) => {
    setDeletedItem(articleId)
    closeModal()
  }
  
  const editPost = (post) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: post.title,
        body: post.body,
        userId: post.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const updatedPosts = posts.map(p => {
          if (p.id === parseInt(post.id)) {
            return json
          }
          return p
        })
        setPosts(updatedPosts)
      })
  }

  if (posts) {
    return (
      <div className='App'>
        <PostContext.Provider
          value={{
            openModal,
            closeModal,
            deletePost,
            addPost,
            editPost,
            deletedItem,
          }}
        >
          <Router>
            <Header />

            <Routes>
              <Route path='/' exact element={<Home posts={posts} />} />
              <Route path='/new' element={<PostArticle posts={posts} />} />
              <Route path='/post/:postId' element={<Article posts={posts} />} />
              <Route
                path='/edit/:postId'
                element={<PostArticle edit={true} posts={posts} />}
              />
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
}

export default App;
