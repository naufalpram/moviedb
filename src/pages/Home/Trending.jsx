import { useCallback, useEffect, useState } from 'react';
import { CardContainer, ContainerSkeleton, Card } from '../../components'
import TrendingHeader from './_components/TrendingHeader';
import { useFetch } from '../../hooks/useFetch';

const Trending = () => {
  const [timeWindow, setTimeWindow] = useState("day");
  const {data, loading, error, status, fetchData} = useFetch(
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
  }, [timeWindow, fetchData]);

  function handleSelectMenu(_timeWindow) {
    setTimeWindow(_timeWindow);
  }

  return (
    <section id='trending' className='mt-28 flex w-full'>
        <CardContainer header={<TrendingHeader onSelect={handleSelectMenu} timeWindow={timeWindow} />}>
            {loading && <ContainerSkeleton length={6} isWithTitle={true} />}
            {error && <p className='font-medium text-lg'>Something wrong while getting trending movies and tv series {":("}</p>}

            {status === 'resolved' && data?.map(media => {
                const title = media.title || media.name;
                const identifier = `${media.id}-${title.split(' ').join('-')}`;
                return <Card 
                            key={identifier}
                            path={`/${media.media_type}/${identifier}`}
                            imagePath={media.poster_path} 
                            title={title}
                        />
            })}
        </CardContainer>
    </section>
  )
}

export default Trending