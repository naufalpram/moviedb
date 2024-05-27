import React from 'react'
import { Card, CardContainer, ContainerSkeleton } from '../../components';

const DetailRecommendation = ({ result }) => {
  const { data, loading, error, status } = result;
  return (
    <section id='detail-recommendation' className='mt-20 w-full flex justify-center'>
      <div className='mx-28 overflow-x-hidden'>
        <CardContainer wrap header={<h2 className='text-3xl font-semibold'>You Also Might Like These</h2>}>
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
      </div>
    </section>
  )
}

export default DetailRecommendation