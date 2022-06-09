import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { PostContext } from '../App'
import { TbDots } from 'react-icons/tb'
import { GoTrashcan } from 'react-icons/go'
import { ReactComponent as EditIcon } from '../assets/edit-2.svg'

const CardActions = ({ article, username }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { openModal } = useContext(PostContext)

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
              <Link to={`/edit/${article.id}`}>
                <button
                  className='card__action card__action--edit'
                >
                  <EditIcon />
                </button>
              </Link>
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