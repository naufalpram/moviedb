import React, { useEffect } from 'react'
import Search from './Search';
import Trending from './Trending';
import Recommendation from './Recommendation';
import HomeFavorite from './HomeFavorite';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
  const { isLoggedIn } = useAuth();

  return (
    <main className='w-[100vw]'>
      <Search />
      <Trending />
      <Recommendation />
      {isLoggedIn && <HomeFavorite />}
    </main>
  )
}

export default Home