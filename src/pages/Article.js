import { useContext, useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { PostContext } from "../App"
import CardActions from "../components/CardActions"

import './stylesheets/Article.css'

const Article = ({ posts }) => {
  let params = useParams()

  const { deletedItem } = useContext(PostContext)

  const [article, setArticle] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (posts === null) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
        .then((response) => response.json())
        .then((json) => {
          setArticle(json)
        })
    } else {
      const currentArticle = posts.find(post => post.id === parseInt(params.postId))
      setArticle(currentArticle)
    }
  }, [posts])

  useEffect(() => {
    if (article) {
      fetch(`https://jsonplaceholder.typicode.com/users/${article.userId}`)
        .then((response) => response.json())
        .then((json) => {
          setUser(json)
        })
    }
  }, [article])


  return article && user ? (
    <main>
      <div className="flex-space-btw">
        <h1 className="article__title">{article.title}</h1>
        <CardActions article={article} username={user.username} />
      </div>
      <p className="article__author">by {user.username}</p>

      <p className="article__body">{article.body}</p>

      {deletedItem === article.id && <Navigate replace to='/' />}
    </main>
  ) : (
    <div></div>
  )
}

export default Article