import { GoHome } from 'react-icons/go'
import { ReactComponent as Pencil } from '../assets/edit-3.svg'
import './stylesheets/Header.css'

const Header = () => {

  return (
    <header>
      <p className='header__title'>Blog</p>
      <nav className='nav'>
        <ul className='nav--list'>
          <li className='nav--item'>
            <a href='#' className='nav--link'>
              <GoHome className='nav--icon' />
            </a>
          </li>
          <li className='nav--item'>
            <a href='#' className='nav--link'>
              <Pencil className='nav--icon' />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header