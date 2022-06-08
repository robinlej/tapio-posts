import { Link, Outlet } from "react-router-dom"

const Readmore = ({ articleURL }) => {
  return (
    <>
      <Link to={`/post/${articleURL}`} className='btn readmore'>
        Read more
      </Link>
      <Outlet />
    </>
  )
}

export default Readmore