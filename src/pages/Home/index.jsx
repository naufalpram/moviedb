import React from 'react'
import Search from './Search';
import Trending from './Trending';
import Recommendation from './Recommendation';
import HomeFavorite from './HomeFavorite';

const Home = () => {
  return (
    <div className='w-[100vw]'>
      <Search />
      <Trending />
      <Recommendation />
      <HomeFavorite />
    </div>
  )
}

export default Home