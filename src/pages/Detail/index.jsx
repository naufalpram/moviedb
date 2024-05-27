import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IMAGE_FETCH_URL } from '../../config';
import DetailData from './DetailData';
import Review from './Review';
import { useQuery } from '../../hooks/useQuery';

const index = ({ title }) => {
  document.title = title;
  const { mediaType, idName } = useParams();
  const [backdropPath, setBackdropPath] = useState(null);
  const { handleQueryChange } = useQuery();

  useEffect(() => {
    handleQueryChange({query: null});
  }, []);

  

  return (
    <main className='w-[100vw]'>
        {mediaType !== 'person' && 
          <div className='w-full h-[480px] relative'>
              <div className='w-full h-full absolute z-10 bg-black/70'></div>
              <img src={`${IMAGE_FETCH_URL}${backdropPath}`} alt="Backrop Image" className='w-full h-full object-cover' />
          </div>
        }
        <DetailData id={idName.split('-')[0]} mediaType={mediaType} setBackdrop={setBackdropPath}  />
        {mediaType !== 'person' && <Review id={idName.split('-')[0]} mediaType={mediaType} />}
    </main>
  )
}

export default index