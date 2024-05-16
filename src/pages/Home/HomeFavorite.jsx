import React from 'react';
import FavoriteCarousel from '../../components/CardContainer';
import FavoriteHeader from './_components/FavoriteHeader';
import CarouselSkeleton from './_components/CarouselSkeleton';

const HomeFavorite = () => {
  const length = 0
  return (
    <section id='home_favorite' className='mt-10 w-full'>
        <FavoriteCarousel header={<FavoriteHeader />}>
            {length === 0 && <p>Add your favorite movies or tv series now!</p>}
            {length > 0 && <CarouselSkeleton length={length} isWithTitle={true} />}
        </FavoriteCarousel>
    </section>
  )
}

export default HomeFavorite