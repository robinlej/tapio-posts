import { useEffect, useState } from "react"
import CardActions from "./CardActions"
import Readmore from "./Readmore"
import './stylesheets/Card.css'

const Card = ({ article }) => {
  
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${article.userId}`)
      .then((response) => response.json())
      .then((json) => {
        setUser(json)
      })
  }, [])

  if (user) {
    return (
      <article className='card'>
        <div className='card__header'>
          <div className='flex-space-btw'>
            <h2 className='card__title'>{article.title}</h2>
            <CardActions article={article} username={user.username} />
          </div>

          <p className='card__author article-author'>by {user.username}</p>
        </div>

        <p className='card__body'>
          {article.body.length > 100
            ? article.body.slice(0, 100) + '...'
            : article.body}
        </p>

        <Readmore articleURL={article.id} />
      </article>
    )
  }
}

export default Card
