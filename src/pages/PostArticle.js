import { useContext, useEffect, useRef, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { PostContext } from "../App"

import './stylesheets/PostArticle.css'

const PostArticle = ({ posts, edit }) => {
  const { addPost, editPost } = useContext(PostContext)

  const params = useParams()

  const titleRef = useRef()
  const contentRef = useRef()

  const [formSubmitted, setFormSubmitted] = useState(null)
  const [error, setError] = useState(false)

  const currentPost = edit ? posts.find((post) => post.id === parseInt(params.postId)) : null

  useEffect(() => {
    titleRef.current.value = edit
      ? currentPost.title
      : ''
    titleRef.current.focus()
  }, [titleRef])

  useEffect(() => {
    contentRef.current.value = edit ? currentPost.body : ''
  }, [contentRef])

  const submitArticle = (e) => {
    e.preventDefault()

    if (titleRef.current.value && contentRef.current.value) {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: titleRef.current.value,
          body: contentRef.current.value,
          userId: 1, // as it's linked to JSONPlaceholder & there is no user system on the app, I faked the userId to 1 by default
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // due to JSONPlaceholder way of working, let's replace the id to have something robust and persistent in the local storage
          const newId = parseInt(posts[0].id) + 1
          addPost({ ...json, id: newId })
          setFormSubmitted(newId)
        })
    } else {
      setError(true)
    }
  }

  const handleEditClick = (e) => {
    e.preventDefault()

    if (titleRef.current.value && contentRef.current.value) {
      const post = {
        id: params.postId,
        userId: currentPost.userId,
        title: titleRef.current.value,
        body: contentRef.current.value,
      }

      editPost(post)
      setFormSubmitted(post.id)
    } else {
      setError(true)
    }
  }

  const pageTitle = edit ? <h1>Edit the article</h1> : <h1>Post an article</h1>
  const submitButton = edit ? (
    <button onClick={handleEditClick} className='btn new-article__btn'>
      Edit
    </button>
  ) : (
    <button onClick={submitArticle} className='btn new-article__btn'>
      Submit
    </button>
  )

  return (
    <main>
      {pageTitle}

      <form className={`new-article ${error ? 'form-error' : null}`}>
        {error && <p role="alert" className="error">Please complete both fields.</p>}
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
        {submitButton}
      </form>

      {formSubmitted && <Navigate replace to={`/post/${formSubmitted}`} />}
    </main>
  )
}

export default PostArticle