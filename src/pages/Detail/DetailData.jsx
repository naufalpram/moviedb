import React, { useCallback, useEffect } from 'react'
import BasicData from './_components/BasicData'
import { useFetch } from '../../hooks/useFetch';

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
  console.log(data);

  useEffect(() => {
    setBackdrop(data?.backdrop_path);
  }, [data]);

  return (
    <section id='detail-data' className='mt-12 w-full'>
        <div className='w-full mx-28 flex justify-between'>
            <BasicData result={{
                data, loading, error, status
            }} />
        </div>
    </section>
  )
}

export default DetailData