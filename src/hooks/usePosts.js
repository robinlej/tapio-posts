import { useState } from "react"

const usePosts = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const openModal = (articleId) => {
    setDeleteModalOpen({id: articleId})
    console.log(articleId)
    console.log(deleteModalOpen)
    document.querySelector('body').style.overflow = 'hidden'
  }

  const closeModal = () => {
    setDeleteModalOpen({})
    document.querySelector('body').style.overflow = 'unset'
  }

  const deletePost = (articleId) => {
    setDeleted({ articleId: articleId })
    console.log(articleId)
    closeModal()
  }

  const editPost = () => {}

  return {
    deleteModalOpen,
    deleted,
    openModal,
    closeModal,
    deletePost,
  }
}

export default usePosts