import React from 'react'

const FavoriteHeader = () => {
  return (
    <div className='flex gap-4'>
        <h2 className='text-3xl font-semibold'>Your Favorite</h2>
        <button className='text-lg font-normal self-end'>See More</button>
    </div>
  )
}

export default FavoriteHeader