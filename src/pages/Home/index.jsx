import React, { useCallback, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import Search from './Search';

const Home = () => {

  const {data, loading, error, status, params, fetchData} = useFetch(
    "/trending/all/day",
    {page: 1},
    useCallback((data) => ({
        data: data?.results
    }), [])
  );

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='w-[100vw]'>
      <Search />
    </div>
  )
}

export default Home