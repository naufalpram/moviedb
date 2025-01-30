
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Footer = () => {
  return (
    <footer className='w-full h-52 mt-40 bg-primary-400 px-28 flex items-center justify-around'>
        <div className='w-fit -mt-8'>
            <Link to='/'>
                <img src={logo} alt="Movie DB Logo" className='h-20 h w-32 min-h-16 min-w-28 cursor-pointer'/>
            </Link>
            <p className='-mt-4 z-10 text-sm font-medium text-white/80'>Made by Naufal Pramudya Yusuf</p>
        </div>
        <div className='flex gap-36'>
            <ul>
                <li className='list-none'>      
                    <p className='font-bold text-lg'>Discover</p>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <Link className='cursor-pointer text-white/80' to='/movie'>Movies</Link>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <Link className='cursor-pointer text-white/80' to='/tv'>TV Series</Link>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <Link className='cursor-pointer text-white/80' to='/person'>People</Link>
                </li>
            </ul>
            <ul>
                <li className='list-none'>      
                    <p className='font-bold text-lg'>Sources</p>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <a className='cursor-pointer text-white/80' href='https://developer.themoviedb.org/reference/intro/getting-started' target='_blank' rel='noopener noreferrer'>
                        MovieDB API
                    </a>
                </li>
                <li className='cursor-pointer list-none mt-3'>      
                    <a className='cursor-pointer text-white/80' href='https://www.figma.com/design/9BIK7RJ3txx4iYniLumMUW/Movie-DB-Mockup?node-id=11%3A1470&t=L5b0NMwZfgTmf06s-1' target='_blank' rel='noopener noreferrer'>
                        Figma Design
                    </a>
                </li>
                <li className='cursor-pointer list-none mt-3'>
                    <a className='cursor-pointer text-white/80' href='https://github.com/naufalpram/moviedb' target='_blank' rel='noopener noreferrer'>
                        Github Repo
                    </a>    
                </li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer