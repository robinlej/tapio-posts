import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../App'
import CardsGrid from '../components/CardsGrid'

const Home = () => {
  const { deletedItem } = useContext(PostContext)

  const [posts, setPosts] = useState(JSON.parse(window.localStorage.getItem('posts')))
  
  useEffect(() => {
    if (posts === null) {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
          setPosts(json.slice(0, 10))
        })
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  useEffect(() => {
    if (deletedItem) {
      const newPosts = posts
        .map((post) => {
          if (post.id === deletedItem) {
            return
          }
          return post
        })
        .filter((item) => item)
      setPosts(newPosts)
    }
  }, [deletedItem])

  if (posts) {
    return (
      <main>
        <h1>Articles</h1>

        <CardsGrid articles={posts} />


      </main>
    )
  }
}

export default Home