import { createContext, useEffect, useState } from 'react';
import Header from './components/Header';
import CardsGrid from './components/CardsGrid';
import './App.css'
import DeleteModal from './components/DeleteModal';

export const PostContext = createContext()

function App() {
  const [posts, setPosts] = useState(null)
  const [deletedItem, setDeletedItem] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        setPosts(json.slice(0, 10))
      })
  }, [])
  
  useEffect(() => {
    if (deletedItem) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${deletedItem}`, {
        method: 'DELETE',
      })

      const newPosts = posts.map(post => {
        if (post.id === deletedItem) {
          return
        }
        return post
      }).filter(item => item)
      setPosts(newPosts)
    }
  }, [deletedItem])


  const openModal = (article, username) => {
    setDeleteModalOpen({article, username})
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
      <Header />

      {posts && (
        <main>
          <h1>Articles</h1>

          <PostContext.Provider value={{ openModal, closeModal, deletePost }}>
            <CardsGrid articles={posts} />
          </PostContext.Provider>

          {deleteModalOpen && (
            <DeleteModal
              article={deleteModalOpen.article}
              user={deleteModalOpen.username}
              deletePost={deletePost}
              closeModal={closeModal}
            />
          )}
        </main>
      )}
    </div>
  )
}

export default App;
