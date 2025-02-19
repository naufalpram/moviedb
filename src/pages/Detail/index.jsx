import { useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DetailData from './DetailData';
import Review from './Review';
import { useQuery } from '../../hooks/useQuery';
import { useFetch } from '../../hooks/useFetch';
import MediaList from './MediaList';
import { IoMdArrowBack } from 'react-icons/io';
const { VITE_IMAGE_URL: IMAGE_FETCH_URL } = import.meta.env;

const Detail = ({ title }) => {
  document.title = title;
  const { handleQueryChange } = useQuery();
  const { mediaType, idName } = useParams();
  const id = idName.split('-')[0];
  const additionalResponse = mediaType  === 'person' ? 'combined_credits' : 'credits,reviews,recommendations';

  const {data, loading, error, status, fetchData} = useFetch(
    `/${mediaType}/${id}?append_to_response=${additionalResponse}`,
    {},
    useCallback((data) => ({
        data   
    }), [])
  );

  useEffect(() => {
    fetchData();
  }, [mediaType, idName, fetchData]);

  useEffect(() => {
    handleQueryChange({query: null});
  }, [handleQueryChange]);

  

  return (
    <main className='w-[100vw] relative'>
      <Link to={-1}>
        <IoMdArrowBack size={40} cursor='pointer' className='absolute top-4 left-28 z-20' />
      </Link>
        {mediaType !== 'person' && 
          <div className='w-full h-[480px] relative'>
              <div className='w-full h-full absolute z-10 bg-black/70'></div>
              <img src={`${IMAGE_FETCH_URL}${data?.backdrop_path}`} alt="Backdrop Image" className='w-full h-full object-cover' />
          </div>
        }
        <DetailData id={id} mediaType={mediaType} result={{
          data, loading, error, status
        }} />
        
        <MediaList parentType={mediaType} result={{
          data: mediaType === 'person' ? data?.combined_credits?.cast : data?.recommendations?.results,
          loading, error, status
        }} />
        {mediaType !== 'person' && 
            <Review result={{
              data: data?.reviews?.results,
              loading, error, status
            }}/>
        }
    </main>
  )
}

export default Detail