import { useEffect, useRef } from "react"
import { IoWarningOutline } from "react-icons/io5"
import './stylesheets/DeleteModal.css'

const DeleteModal = ({ article, user, deletePost, closeModal }) => {
  const modalRef = useRef()

  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  useEffect(() => {
      const modal = modalRef.current

      const focusableElements = modal
        ? [
            ...modal.querySelectorAll(
              '[href], button, [tabindex], select, textarea, input'
            ),
          ]
        : []
      const firstFocusableElement = focusableElements[0]
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1]

      firstFocusableElement?.focus()

      const focusAfterLastElement = (e) => {
        if (
          e.key === 'Tab' &&
          !e.shiftKey &&
          document.activeElement === lastFocusableElement
        ) {
          e.preventDefault()
          firstFocusableElement.focus()
        }
      }

      const focusBeforeFirstElement = (e) => {
        if (
          e.key === 'Tab' &&
          e.shiftKey &&
          document.activeElement === firstFocusableElement
        ) {
          e.preventDefault()
          lastFocusableElement.focus()
        }
      }

      document.addEventListener('keydown', focusAfterLastElement)
      document.addEventListener('keydown', focusBeforeFirstElement)

      return () => {
        document.removeEventListener('keydown', focusAfterLastElement)
        document.removeEventListener('keydown', focusBeforeFirstElement)
      }
    }, [])

  useEffect(() => {
    window.addEventListener('keyup', closeOnEscape)

    return () => window.removeEventListener('keyup', closeOnEscape)
  }, [])

  return (
    <div ref={modalRef} className='delete-modal' role='dialog' aria-modal tabIndex={-1}>
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