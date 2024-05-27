import React, { useCallback, useEffect } from 'react'
import BasicInfo from './_components/BasicInfo';
import { useFetch } from '../../hooks/useFetch';
import ActionSection from './_components/ActionSection';
import PeopleInfo from './_components/PeopleInfo';

const DetailData = ({ mediaType, id, setBackdrop }) => {
  const Info = mediaType === 'person' ? PeopleInfo : BasicInfo;
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
    <section id='detail-data' className='mt-12 w-full'>
        <div className='flex mobile:flex-col-reverse sm:flex-col-reverse md:flex-row justify-between mx-28'>
          <Info result={{
                data, loading, error, status
          }} />
          <ActionSection poster={data?.poster_path || data?.profile_path} homepageUrl={data?.homepage} type={mediaType} />
        </div>
    </section>
  )
}

export default DetailData