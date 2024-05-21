import React from 'react';
import { CardContainer, ContainerSkeleton } from '../../components';
import FavoriteHeader from './_components/FavoriteHeader';

const HomeFavorite = () => {
  const length = 0
  return (
    <section id='home_favorite' className='mt-10 w-full'>
        <CardContainer header={<FavoriteHeader />}>
            {length === 0 && <p>Add your favorite movies or tv series now!</p>}
            {length > 0 && <ContainerSkeleton length={length} isWithTitle={true} />}
        </CardContainer>
    </section>
  )
}

export default HomeFavorite