import React from 'react';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className='w-full h-52 mt-40 bg-primary-400 px-28 flex items-center justify-around'>
        <div className='w-fit -mt-8'>
            <img src={logo} alt="Movie DB Logo" className='h-20 h w-32 min-h-16 min-w-28 cursor-pointer' onClick={() => navigate('/')}/>
            <p className='-mt-4 z-10 text-sm font-medium text-white/80'>Made by Naufal Pramudya Yusuf</p>
        </div>
        <div className='flex gap-36'>
            <ul>
                <li className='list-none'>      
                    <p className='font-bold text-lg'>Discover</p>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <p className='cursor-pointer text-white/80' onClick={() => navigate('list')}>Movies</p>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <p className='cursor-pointer text-white/80' onClick={() => navigate('list')}>TV Series</p>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <p className='cursor-pointer text-white/80' onClick={() => navigate('list')}>People</p>
                </li>
            </ul>
            <ul>
                <li className='list-none'>      
                    <p className='font-bold text-lg'>Sources</p>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <p className='cursor-pointer text-white/80' onClick={() => navigate('list')}>MovieDB API</p>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <p className='cursor-pointer text-white/80' onClick={() => navigate('list')}>Figma Design</p>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <p className='cursor-pointer text-white/80' onClick={() => navigate('list')}>Github Repo</p>
                </li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer