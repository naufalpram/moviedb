import React, { useCallback, useEffect } from 'react';
import { CardContainer, ContainerSkeleton, Card } from '../../components';
import { useFetch } from '../../hooks/useFetch';
import { useQuery } from '../../hooks/useQuery';

const Result = () => {
  const { queryParams } = useQuery();
  const {data, loading, error, status, setParams} = useFetch(
    `/search/multi`,
    {
      page: 1,
      query: queryParams
    },
    useCallback((data) => ({
      data: data?.results
    }), []),
    {withQueryParams: true}
  );

  useEffect(() => {
    setParams(prevParams => ({...prevParams, ...queryParams}));
  }, [queryParams]);

  return (
    <section id='search-result' className='mt-12 flex w-full'>
        <CardContainer wrap>
            {loading && <ContainerSkeleton length={12} isWithTitle={true} />}
            {error && <p className='font-medium text-lg'>Something wrong while getting your search {":("}</p>}

            {status === 'resolved' && data?.map(media => {
                const title = media.title || media.name;
                const identifier = `${media.id}-${title.split(' ').join('-')}`
                return <Card 
                            key={identifier}
                            path={`/${media.media_type}/${identifier}`}
                            imagePath={media.poster_path || media.profile_path} 
                            title={title}
                            date={media.release_date || media.first_air_date}
                        />
            })}
        </CardContainer>
    </section>
  )
}

export default Result