import { GoHome } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { ReactComponent as Pencil } from '../assets/edit-3.svg'
import './stylesheets/Header.css'

const Header = () => {

  return (
    <header>
      <p className='header__title'>Blog</p>
      <nav className='nav'>
        <ul className='nav--list'>
          <li className='nav--item'>
            <Link to='/' className='nav--link'>
              <GoHome className='nav--icon' />
            </Link>
          </li>
          <li className='nav--item'>
            <Link to='/new' className='nav--link'>
              <Pencil className='nav--icon' />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header