import { useCallback, useEffect } from 'react';
import { CardContainer, ContainerSkeleton, Card } from '../../components';
import { useFetch } from '../../hooks/useFetch';

const Recommendation = () => {
  const { data, loading, error, status, fetchData } = useFetch(
    `/movie/653346/recommendations`,
    {page: 1},
    useCallback((data) => ({
        data: data?.results.slice(0, 4)
    }), [])
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id='recommendation' className='mt-10 w-full'>
        <div className='flex items-center justify-between mx-28 px-10 gap-10 bg-primary-400 rounded-xl'>
            <h2 className='text-secondary-400 text-[40px] font-semibold max-w-72'>You Might Like These Movies or Series</h2>
            <CardContainer wrap>
                {loading && <ContainerSkeleton length={4} isWithTitle={false} />}
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
        </div>
    </section>
  )
}

export default Recommendation