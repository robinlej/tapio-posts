import { IoWarningOutline } from "react-icons/io5"

const DeleteModal = ({ article, user, deletePost, closeModal }) => {
  return (
    <div className='delete-modal' role='dialog' aria-modal tabIndex={-1}>
      <div className='delete-modal__content'>
        <IoWarningOutline className='delete-modal__icon' />
        <div>
          <p>
            You are about to <strong>delete</strong> the article{' '}
            <em>{article.title}</em> by {user}.
          </p>

          <p className='p-warning'>Are you sure you want to procede?</p>

          <div className='delete-modal__actions flex-space-btw'>
            <button onClick={() => deletePost(article.id)} className='btn btn--delete'>
              Confirm
            </button>
            <button onClick={closeModal} className='btn btn--neutral'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal