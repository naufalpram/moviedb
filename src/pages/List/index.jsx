import React, { useCallback, useEffect, useState } from 'react'
import ListHead from './ListHead'
import { useParams } from 'react-router-dom'
import { MEDIA_MENU } from '../../config';
import { useFetch } from '../../hooks/useFetch';

const List = () => {
  const { mediaType } = useParams();
  const [category, setCategory] = useState(MEDIA_MENU[mediaType].menu[0].path);
  const [latestPage, setLatestPage] = useState(1);
  const {data, loading, error, fetchData} = useFetch(
    `/${mediaType}/${category}`,
    {page: latestPage},
    useCallback(() => ({
      data: data?.results
    }), [])
  );

  useEffect(() => {
    setCategory(MEDIA_MENU[mediaType].menu[0].path)
  }, [mediaType])

  useEffect(() => {
    fetchData();
  }, [category])
  
  function handleMenuSelect(value) {
    setCategory(value);
  }

  return (
    <main className='w-[100vw]'>
      <ListHead type={mediaType} onMenuSelect={handleMenuSelect} currentSelected={category} />
    </main>
  )
}

export default List