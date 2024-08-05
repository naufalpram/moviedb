import { useEffect } from 'react'
import Search from './Search';
import Trending from './Trending';
import Recommendation from './Recommendation';
import HomeFavorite from './HomeFavorite';
import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '../../hooks/useQuery';

const Home = ({ title }) => {
  document.title = title;
  const { isLoggedIn } = useAuth();
  const { handleQueryChange } = useQuery();
  useEffect(() => {
    handleQueryChange({query: null});
  }, [handleQueryChange]);

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