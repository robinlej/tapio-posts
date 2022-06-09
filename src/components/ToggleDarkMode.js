import { useEffect, useState } from 'react'
import { MdLightMode, MdModeNight } from 'react-icons/md'
import './stylesheets/ToggleDarkMode.css'

const ToggleDarkMode = () => {
  // first get the info from the local storage
  // if it's not set, get the prefered color scheme
  const [isDarkModeOn, setIsDarkModeOn] = useState(
    JSON.parse(localStorage.getItem('tapio-blog-darkmode')) ??
      window.matchMedia('(prefers-color-scheme: dark)').matches ??
      false
  )

  // Apply dark mode & save it in local storage
  useEffect(() => {
    if (isDarkModeOn) {
      localStorage.setItem('tapio-blog-darkmode', JSON.stringify(isDarkModeOn))
      document.querySelector('body').classList.add('darkmode')
      console.log(isDarkModeOn)
    } else {
        localStorage.setItem('tapio-blog-darkmode', false)
        document.querySelector('body').classList.remove('darkmode')
    }
  }, [isDarkModeOn])

  const toggle = (currentMode) => {
    setIsDarkModeOn(!currentMode)
  }

  return (
    <button
      onClick={() => toggle(isDarkModeOn)}
      aria-label='toggle dark mode'
      className='dark-mode-toggle'
    >
      {isDarkModeOn ? <MdLightMode /> : <MdModeNight />}
    </button>
  )
}

export default ToggleDarkMode