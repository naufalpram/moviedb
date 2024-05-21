import React, { useCallback, useEffect } from 'react'
import BasicInfo from './_components/BasicInfo';
import { useFetch } from '../../hooks/useFetch';
import { IMAGE_FETCH_URL } from '../../config';
import { IoMdOpen } from 'react-icons/io';
import { Button, ButtonContainer } from '../../components';

const DetailData = ({ mediaType, id, setBackdrop }) => {
  const {data, loading, error, status, fetchData} = useFetch(
    `/${mediaType}/${id}`,
    {},
    useCallback((data) => ({
        data   
    }), [])
  );

  useEffect(() => {
    fetchData();
  }, [mediaType, id]);

  useEffect(() => {
    setBackdrop(data?.backdrop_path);
  }, [data]);

  return (
    <section id='detail-data' className='mt-12 w-full mx-28'>
        <div className='w-full flex gap-40'>
          <BasicInfo result={{
                data, loading, error, status
          }} />
          <div className='flex flex-col items-center'>
            <img src={`${IMAGE_FETCH_URL}${data?.poster_path}`} alt="Poster Image" className='w-80 h-auto' />
            <ButtonContainer display='flex flex-col gap-2'>
              <Button variant='secondary' icon={<IoMdOpen style={{width: '24px', height: '24px'}} />}>
                Visit Page
              </Button>
              <Button variant='primary'>
                Add to Favorite
              </Button>
            </ButtonContainer>
          </div>
        </div>
    </section>
  )
}

export default DetailData