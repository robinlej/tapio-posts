import { useContext, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { PostContext } from "../App"

import './stylesheets/PostArticle.css'

const PostArticle = ({ lastPostId }) => {
  const { addPost } = useContext(PostContext)

  const titleRef = useRef()
  const contentRef = useRef()
  const [postSubmitted, setPostSubmitted] = useState(false)

  const submitArticle = (e) => {
    e.preventDefault()

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: titleRef.current.value,
        body: contentRef.current.value,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // let's replace the id to have something robust and persistent in the local storage
        const newId = parseInt(lastPostId) + 1 
        addPost({...json, id: newId})
        setPostSubmitted(newId)

      })

  }

  return (
    <main>
      <h1>Post an article</h1>

      <form className='new-article'>
        <div className='new-article__element'>
          <label htmlFor='title'>Title</label>
          <input
            ref={titleRef}
            name='title'
            id='title'
            className='new-article__title'
          />
        </div>
        <div className='new-article__element'>
          <label htmlFor='content'>Content</label>
          <textarea
            ref={contentRef}
            name='content'
            id='content'
            rows='15'
            className='new-article__content'
            placeholder='What do you have on your mind?'
          ></textarea>
        </div>
        <button onClick={submitArticle} className='btn new-article__btn'>
          Submit
        </button>
      </form>
      {postSubmitted && <Navigate replace to={`/post/${postSubmitted}`} />}
    </main>
  )
}

export default PostArticle