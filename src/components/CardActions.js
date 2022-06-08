import { useContext, useState } from 'react'
import { PostContext } from '../App'
import { TbDots } from 'react-icons/tb'
import { GoTrashcan } from 'react-icons/go'
import { ReactComponent as Edit } from '../assets/edit-2.svg'

const CardActions = ({ article, username }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { openModal, editPost } = useContext(PostContext)

  const showActions = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className='card__actions'>
        <button className='card__actions__btn'>
          <TbDots onClick={showActions} />
        </button>
        {isOpen && (
          <>
            <div className='card__actions--displayed'>
              <button
                onClick={editPost}
                className='card__action card__action--edit'
              >
                <Edit />
              </button>
              <button
                onClick={() => openModal(article, username)}
                className='card__action card__action--delete'
              >
                <GoTrashcan />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CardActions