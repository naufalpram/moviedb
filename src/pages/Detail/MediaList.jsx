import React from 'react'
import { Card, CardContainer, ContainerSkeleton } from '../../components';

function sortByPopularity(media = []) {
  return media.sort((a, b) => b.popularity - a.popularity);
}

const CardList = ({title, children, ...otherResult}) => {

  return (
    <div className='mx-28 overflow-x-hidden'>
        <CardContainer wrap header={<h2 className='text-3xl font-semibold'>{title}</h2>}>
            {otherResult.loading && <ContainerSkeleton length={6} isWithTitle={true} />}
            {otherResult.error && <p className='font-medium text-lg'>Something wrong while getting trending movies and tv series {":("}</p>}

            {otherResult.status === 'resolved' && children?.map(media => {
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
  )
}

const MediaList = ({ parentType, result }) => {
  const { data, ...otherResult } = result;
  const recommendation = data?.slice(0, 5);

  const knownForMovie = sortByPopularity(data?.filter(media => media.media_type === 'movie')).slice(0, 5);
  const knownForSeries = sortByPopularity(data?.filter(media => media.media_type === 'tv')).slice(0, 5);

  return (
    <section id='detail-recommendation' className='mt-20 w-full flex justify-center'>
      {parentType !== 'person' && <CardList title='You Also Might Like These' {...otherResult}>
        {recommendation}
      </CardList>}
      {parentType === 'person' && (
        <div>
          <CardList title='Known For These Movies' {...otherResult}>
            {knownForMovie}
          </CardList>
          <CardList title='Known For These Series' {...otherResult}>
            {knownForSeries}
          </CardList>
        </div>
      )}
    </section>
  )
}

export default MediaList