import React from 'react';
import logo from '../assets/logo.svg';
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
                    <p className='cursor-pointer text-white/80' onClick={() => navigate('movie')}>Movies</p>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <p className='cursor-pointer text-white/80' onClick={() => navigate('tv')}>TV Series</p>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <p className='cursor-pointer text-white/80' onClick={() => navigate('person')}>People</p>
                </li>
            </ul>
            <ul>
                <li className='list-none'>      
                    <p className='font-bold text-lg'>Sources</p>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <a href='https://developer.themoviedb.org/reference/intro/getting-started' target='_blank' rel='noopener noreferrer'>
                        <p className='cursor-pointer text-white/80'>MovieDB API</p>
                    </a>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <a href='https://www.figma.com/design/9BIK7RJ3txx4iYniLumMUW/Movie-DB-Mockup?node-id=11%3A1470&t=L5b0NMwZfgTmf06s-1' target='_blank' rel='noopener noreferrer'>
                        <p className='cursor-pointer text-white/80'>Figma Design</p>
                    </a>
                </li>
                <li className='cursor-pointer list-none mt-3'>
                    <a href='https://github.com/naufalpram/moviedb' target='_blank' rel='noopener noreferrer'>
                        <p className='cursor-pointer text-white/80'>Github Repo</p>
                    </a>    
                </li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer