import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IMAGE_FETCH_URL } from '../../config';
import DetailData from './DetailData';
import Review from './Review';
import { useQuery } from '../../hooks/useQuery';
import { useFetch } from '../../hooks/useFetch';
import DetailRecommendation from './DetailRecommendation';

const index = ({ title }) => {
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
  }, [mediaType, idName]);

  useEffect(() => {
    handleQueryChange({query: null});
  }, []);

  

  return (
    <main className='w-[100vw]'>
        {mediaType !== 'person' && 
          <div className='w-full h-[480px] relative'>
              <div className='w-full h-full absolute z-10 bg-black/70'></div>
              <img src={`${IMAGE_FETCH_URL}${data?.backdrop_path}`} alt="Backrop Image" className='w-full h-full object-cover' />
          </div>
        }
        <DetailData id={id} mediaType={mediaType} result={{
          data, loading, error, status
        }} />
        {mediaType !== 'person' && 
          <>
            <DetailRecommendation result={{
              data: data?.recommendations?.results?.slice(0, 5),
              loading, error, status
            }} />
            <Review result={{
              data: data?.reviews?.results,
              loading, error, status
            }}/>
          </>
        }
    </main>
  )
}

export default index