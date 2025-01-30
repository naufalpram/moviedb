
import navLogo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { Button, ButtonContainer } from '../components';
import { useAuth } from '../hooks/useAuth';
import { IoMdPerson } from 'react-icons/io';

const Header = ({ isLogoutCollapse, handleLogoutCollapse }) => {
  const { isLoggedIn, user, logout } = useAuth();

  function keyUpLogoutCollapse(e) {
    if (e.key === 'Enter' || e.key === 'Space') handleLogoutCollapse(prev => !prev);
  }
  return (
    <header className='w-full bg-none px-28 sticky top-0 z-30'>
        <div className='flex justify-between my-4 mx-auto backdrop-blur-sm'>
          <Link to='/'>
            <img tabIndex='0' src={navLogo} alt="Movie DB Logo" className='h-20 h w-32 min-h-16 min-w-28 cursor-pointer'/>
          </Link>
          <nav className='md:flex md:visible hidden items-center gap-20 font-medium pl-12'>
            <Link className='cursor-pointer' to='/movie'>Movies</Link>
            <Link className='cursor-pointer' to='/tv'>TV Series</Link>
            <Link className='cursor-pointer' to='/person'>People</Link>
          </nav>
          {!isLoggedIn ? (
            <ButtonContainer container='menu' display='flex items-center gap-2'>
              <Button variant='secondary' href='/register'>Register</Button>
              <Button variant='primary' href='/login'>Login</Button>
            </ButtonContainer>
          ) : (
            <div
              className='flex items-center gap-4 relative cursor-pointer'
              onClick={() => handleLogoutCollapse(prev => !prev)}
              onKeyUp={(e) => keyUpLogoutCollapse(e)}
            >
              <IoMdPerson className='w-8 h-8' />
              <p className='font-medium'>Hello, {user?.name ?? user?.username}</p>
              <div
                tabIndex='0'
                role='button'
                className={`w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent 
                  ${isLogoutCollapse ? 'border-b-8 border-b-secondary-200' : 'border-t-8 border-t-secondary-200'}`}
              ></div>
              <div className={`w-full h-auto px-4 py-2 absolute top-16 border border-gray-500 rounded ${isLogoutCollapse ? 'visible' : 'hidden'}`}>
                <button className='w-full text-start' onClick={logout}>Logout</button>
              </div>
            </div>
            )
          }
        </div>
    </header>
  )
}

export default Header