import React, { useCallback, useEffect } from 'react';
import ResultContainer from '../../components/CardContainer';
import Card from '../../components/Card/Card';
import ContainerSkeleton from '../../components/CardContainer/ContainerSkeleton';
import { useFetch } from '../../hooks/useFetch';

const SearchResult = ({ mediaType, query }) => {
  const {data, loading, error, status, fetchData} = useFetch(
    `/search/${mediaType}`,
    {
      page: 1,
      query: query.keyword
    },
    useCallback((data) => ({
      data: data?.results
    }), [])
  );

  useEffect(() => {
    if (query.keyword && query.keyword.trim() !== '') {
        fetchData();
    }
  }, [query]);

  return (
    <section id='search-result' className='mt-12 flex w-full'>
        <ResultContainer wrap>
            {loading && <ContainerSkeleton length={12} isWithTitle={true} />}
            {error && <p className='font-medium text-lg'>Something wrong while getting trending movies and tv series {":("}</p>}

            {status === 'resolved' && data?.map(media => {
                const title = media.title || media.name;
                const identifier = `${media.id}-${title.split(' ').join('-')}`
                return <Card 
                            key={identifier}
                            path={identifier}
                            imagePath={media.poster_path || media.profile_path} 
                            title={title}
                            date={media.release_date || media.first_air_date}
                        />
            })}
        </ResultContainer>
    </section>
  )
}

export default SearchResult