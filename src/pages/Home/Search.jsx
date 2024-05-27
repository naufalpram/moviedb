import React, { useEffect } from 'react';
import { Input } from '../../components'
import { useQuery } from '../../hooks/useQuery';
import { createSearchParams, useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const { queryParams, handleQueryChange } = useQuery();
  useEffect(() => {
    handleQueryChange({query: null});
  }, []);

  useEffect(() => {
    if (!queryParams.query || queryParams.query.trim() === '') return;
    navigate({pathname: '/discover', search: createSearchParams(queryParams).toString() });
  }, [queryParams]);
  
  return (
    <section id='search' className='mt-[120px] flex justify-center'>
        <div className='container max-w-[604px] mx-28 flex flex-col gap-16 items-center'>
            <div className='text-[40px] w-full font-semibold text-center'>Discover Your Favorite Movies and TV Series with Ease</div>
            <Input placeholder='Search for movies or tv series' />
        </div>
    </section>
  )
}

export default Search