import { GoHome } from 'react-icons/go'
import { Link, NavLink } from 'react-router-dom'
import { ReactComponent as Pencil } from '../assets/edit-3.svg'
import './stylesheets/Header.css'
import ToggleDarkMode from './ToggleDarkMode'

const Header = () => {

  return (
    <header>
      <div className='container'>
        <p className='header__title'>
          <Link to='/' className='link-reset'>
            Blog
          </Link>
        </p>
        
        <ToggleDarkMode />
      </div>

      <nav className='nav'>
        <ul className='nav__list'>
          <li className='nav__item'>
            <NavLink to='/' className='link-reset nav__link' title='Home'>
              <GoHome className='nav__link--icon' alt='home' />
              <span className='nav__link--text'>Home</span>
            </NavLink>
          </li>
          <li className='nav__item'>
            <NavLink
              to='/new'
              className='link-reset nav__link'
              title='Post an article'
            >
              <Pencil className='nav__link--icon' />
              <span className='nav__link--text'>Post an article</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header