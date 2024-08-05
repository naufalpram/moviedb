import { useEffect, useState } from 'react'
import ListHead from './ListHead'
import { useParams } from 'react-router-dom'
import { MEDIA_MENU } from '../../config/media';
import Result from './Result';
import SearchResult from './SearchResult';
import { useQuery } from '../../hooks/useQuery';

const List = ({ title }) => {
  document.title = title
  const { mediaType } = useParams();
  const [media, setMedia] = useState({
    mediaType,
    category: MEDIA_MENU[mediaType]?.menu[0].path
  })
  const [latestPage] = useState(1);
  const { queryParams, handleQueryChange } = useQuery();

  // for mediatype change in params
  useEffect(() => {
    setMedia({
      mediaType,
      category: MEDIA_MENU[mediaType].menu[0].path
    })
  }, [mediaType])
  
  function handleMenuSelect(value) {
    handleQueryChange({query: null});
    setMedia(prevMedia => ({
      ...prevMedia,
      category: value
    }));
  }

  return (
    <main className='w-[100vw]'>
      <ListHead type={media.mediaType} onMenuSelect={handleMenuSelect} currentSelected={media.category} />
      {(queryParams.query && queryParams.query !== '') || location.search ? 
        <SearchResult mediaType={media.mediaType} /> : 
        <Result {...media} latestPage={latestPage} />
      }
    </main>
  )
}

export default List