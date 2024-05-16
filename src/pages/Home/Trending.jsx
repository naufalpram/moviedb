import React, { useCallback, useEffect, useState } from 'react';
import TrendingCarousel from '../../components/Carousel'
import { useFetch } from '../../hooks/useFetch';
import CarouselCard from '../../components/Carousel/CarouselCard';
import TrendingHeader from './_components/TrendingHeader';
import TrendingSkeleton from './_components/CarouselSkeleton';

const Trending = () => {
  const [timeWindow, setTimeWindow] = useState("day");
  const {data, loading, error, fetchData} = useFetch(
    `/trending/all/${timeWindow}`,
    {page: 1},
    useCallback(
        (data) => ({
            data: data?.results
        })
        , []
    )
  );

  useEffect(() => {
    fetchData();
  }, [timeWindow]);

  function handleSelectMenu(_timeWindow) {
    setTimeWindow(_timeWindow);
  }

  return (
    <section id='trending' className='mt-28 flex w-full'>
        <TrendingCarousel header={<TrendingHeader onSelect={handleSelectMenu} timeWindow={timeWindow} />}>
            {loading && <TrendingSkeleton length={6} isWithTitle={true} />}
            {error && <p className='font-medium text-lg'>Something wrong while getting trending movies and tv series {":("}</p>}

            {(!loading && !error) && data?.map(media => {
                const title = media.title || media.name;
                console.log(title)
                return <CarouselCard 
                            key={`${media.id}-${title.split(' ').join('-')}`}
                            imagePath={media.poster_path} 
                            title={title}
                        />
            })}
        </TrendingCarousel>
    </section>
  )
}

export default Trending