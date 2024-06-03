
import navLogo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonContainer } from '../components';
import { useAuth } from '../hooks/useAuth';
import { IoMdPerson } from 'react-icons/io';

function emailFormat(email) {
  return email?.split("@")[0];
}

const Header = ({ isLogoutCollapse, handleLogoutCollapse }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header className='w-full bg-none px-28'>
        <div className='flex justify-between my-4 mx-auto'>
          <img src={navLogo} alt="Movie DB Logo" className='h-20 h w-32 min-h-16 min-w-28 cursor-pointer' onClick={() => navigate('/')}/>
          <nav className='md:flex md:visible hidden items-center gap-20 font-medium pl-12'>
                  <p className='cursor-pointer' onClick={() => navigate('/movie')}>Movies</p>
                  <p className='cursor-pointer' onClick={() => navigate('/tv')}>TV Series</p>
                  <p className='cursor-pointer' onClick={() => navigate('/person')}>People</p>
          </nav>
          {!isLoggedIn ? (
              <ButtonContainer container='menu' display='flex items-center gap-2'>
                <Button variant='secondary' onClick={() => navigate('/register')}>Register</Button>
                <Button variant='primary' onClick={() => navigate('/login')}>Login</Button>
              </ButtonContainer>) : (
              <div className='flex items-center gap-4 relative'>
                <IoMdPerson className='w-8 h-8' />
                <p className='font-medium'>Hello, {emailFormat(user?.email)}</p>
                <div
                  className={`w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent 
                    ${isLogoutCollapse ? 'border-b-8 border-b-secondary-200' : 'border-t-8 border-t-secondary-200'} cursor-pointer`}
                  onClick={() => handleLogoutCollapse(prev => !prev)}
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