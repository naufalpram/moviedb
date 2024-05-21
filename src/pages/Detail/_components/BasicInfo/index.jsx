import React from 'react';
import { dateFormatter, episodeFormatter, runtimeFormatter } from '../../../../helper/dataFormatter';
import { FaStar } from 'react-icons/fa';
import CastCrew from './CastCrew';

const BasicInfo = ({ result }) => {
  const { data } = result;
  const formattedDate = dateFormatter(data?.release_date || data?.first_air_date);
  const formattedRuntime = data?.runtime ? runtimeFormatter(data.runtime) : episodeFormatter(data?.number_of_seasons, data?.number_of_episodes);
  return (
    <div className='w-3/5 pr-16'>
        {data?.tagline && data?.tagline.trim() !== '' && <p className='italic text-secondary-400 font-normal font- text-[28px]'>"{data?.tagline}"</p>}
        <h1 className='font-bold text-[40px] font-title uppercase text-white tracking-widest'>{data?.title || data?.name}</h1>
        <div className='flex gap-5'>
          <p className='text-unselect-gray text-xl font-semibold py-1'>{formattedDate}</p>
          <p className='border border-secondary-400 py-1 px-2 text-center font-semibold'>{formattedRuntime}</p>
          {data?.genres?.map(genre => <p key={genre.id} className='bg-primary-400 py-1 px-2 text-center font-semibold'>{genre.name}</p>)}
          <div className='flex gap-2 items-center'>
            <FaStar className='h-full w-8' style={{color: '#FFC300'}} />
            <p className='font-semibold text-lg'>{data?.vote_average}</p>
          </div>
        </div>
        <p className='mt-5 font-semibold text-2xl'>{data?.overview}</p>
        <CastCrew />
    </div>
  )
}

export default BasicInfo