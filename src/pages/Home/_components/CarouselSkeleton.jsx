import React from 'react'
import CardSkeleton from '../../../components/Carousel/CardSkeleton'

const CarouselSkeleton = ({ length, isWithTitle }) => {
  return (
    <>
        {Array.from({ length: length }, (_, i) => <CardSkeleton key={i} isWithTitle={isWithTitle} />)}
    </>
  )
}

export default CarouselSkeleton