import React from 'react'
import { IMAGE_FETCH_URL } from '../../config';
import { MdErrorOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const EmptyImage = () => (
  <div className='flex flex-col justify-center items-center w-52 h-80 bg-gray-400 text-black font-medium rounded-md'>
    <MdErrorOutline className='w-12 h-12' />
    No Image
  </div>
)

const Card = ({ path, mediaType, imagePath, title, date}) => {
  const navigate = useNavigate(); 
  return (
    <div className={`flex flex-col gap-4 items-center min-w-52 ${title && date && 'justify-between'}`} onClick={() => navigate(`${mediaType}/${path}`)}>
        {imagePath ? 
          <img src={`${IMAGE_FETCH_URL}${imagePath}`} alt="Movie Poster" className='w-52 h-auto rounded-md cursor-pointer' /> : 
          <EmptyImage />
        }
        {title && <p className='m-0 font-semibold max-w-48 hover:text-secondary-200 cursor-pointer' onClick={() => navigate(`${mediaType}/${path}`)}>{title}</p>}
        {date && <p className='text-sm font-semibold max-w-48 text-unselecet-gray'>{date}</p>}
    </div>
  )
}

export default Card