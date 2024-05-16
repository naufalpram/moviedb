import React from 'react';
import navLogo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import Button from '../Buttons/Button';
import ButtonContainer from '../Buttons/ButtonContainer';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='w-full bg-none px-28'>
        <div className='flex justify-between my-4 mx-auto'>
          <a onClick={() => navigate('/')} className='cursor-pointer'>
              <img src={navLogo} alt="Movie DB Logo" className='h-20 h w-32 min-h-16 min-w-28'/>
          </a>
          <nav className='md:flex md:visible hidden items-center gap-20 font-medium pl-12'>
                  <p className='cursor-pointer' onClick={() => navigate('list')}>Movies</p>
                  <p className='cursor-pointer' onClick={() => navigate('list')}>TV Series</p>
                  <p className='cursor-pointer' onClick={() => navigate('list')}>People</p>
              
          </nav>
          <ButtonContainer container='menu' display='flex items-center gap-2'>
            <Button variant='secondary' onClick={() => {}}>Register</Button>
            <Button variant='primary' onClick={() => {}}>Login</Button>
          </ButtonContainer>
        </div>
    </header>
  )
}

export default Header