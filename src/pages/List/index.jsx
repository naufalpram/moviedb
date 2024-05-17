import React, { useCallback, useEffect, useState } from 'react'
import ListHead from './ListHead'
import { useParams } from 'react-router-dom'
import { MEDIA_MENU } from '../../config';
import Result from './Result';
import SearchResult from './SearchResult';
import { useSearch } from '../../hooks/useSearch';

const List = () => {
  const { mediaType } = useParams();
  const [media, setMedia] = useState({
    mediaType,
    category: MEDIA_MENU[mediaType].menu[0].path
  })
  const [latestPage, setLatestPage] = useState(1);
  const { searchQuery, handleQueryChange } = useSearch();

  // for mediatype change in params
  useEffect(() => {
    setMedia({
      mediaType,
      category: MEDIA_MENU[mediaType].menu[0].path
    })
    handleQueryChange({keyword: null})
  }, [mediaType])
  
  function handleMenuSelect(value) {
    handleQueryChange({keyword: null});
    setMedia(prevMedia => ({
      ...prevMedia,
      category: value
    }));
  }

  return (
    <main className='w-[100vw]'>
      <ListHead type={media.mediaType} onMenuSelect={handleMenuSelect} currentSelected={media.category} />
      {searchQuery && searchQuery.keyword && searchQuery.keyword !== '' ? 
        <SearchResult query={searchQuery} mediaType={media.mediaType} /> : 
        <Result {...media} latestPage={latestPage} />
      }
    </main>
  )
}

export default List