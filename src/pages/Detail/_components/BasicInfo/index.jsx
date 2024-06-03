
import { dateFormatter, episodeFormatter, runtimeFormatter } from '../../../../helper/dataFormatter';
import { FaStar } from 'react-icons/fa';
import Credit from '../Credit';
import InfoSkeleton from '../InfoSkeleton';

function configureDate(data) {
  return data?.release_date || data?.first_air_date ? dateFormatter(data?.release_date || data?.first_air_date) : null
}

function configureRuntime(data) {
  if (data?.runtime) return runtimeFormatter(data.runtime);
  if (data?.number_of_seasons && data?.number_of_episodes) return episodeFormatter(data?.number_of_seasons, data?.number_of_episodes);
  return null;
}

const InfoResult = ({ data }) => {
  const formattedDate = configureDate(data);
  const formattedRuntime = configureRuntime(data);
  return (
    <>
      {data?.tagline && data?.tagline.trim() !== '' && <p className='italic text-secondary-400 font-normal text-[28px]'>"{data?.tagline}"</p>}
      <h1 className='font-bold text-[40px] font-title uppercase text-white tracking-widest'>{data?.title || data?.name}</h1>
      <div className='flex gap-5'>
        <p className='text-unselect-gray text-xl font-semibold py-1'>{formattedDate ?? 'No Date'}</p>
        <p className='border border-secondary-400 py-1 px-2 text-center font-semibold'>{formattedRuntime ?? 'No Runtime'}</p>
        {data?.genres?.map(genre => <p key={genre.id} className='bg-primary-400 py-1 px-2 text-center font-semibold'>{genre.name}</p>)}
        <div className='flex gap-2 items-center'>
          <FaStar className='h-full w-8' style={{color: '#FFC300'}} />
          <p className='font-semibold text-lg'>{data?.vote_average}</p>
        </div>
      </div>
      <p className='mt-5 font-semibold text-2xl'>{data?.overview}</p>
    </>
  )
}

const BasicInfo = ({ result }) => {
  const { data, ...otherResult } = result;
  return (
    <div className='w-3/5 pr-16'>
        {otherResult.loading && <InfoSkeleton />}
        {otherResult.status === 'resolved' && <InfoResult data={data} />}
        <Credit creditData={data?.credits} mediaType='movie' {...otherResult}  />
    </div>
  )
}

export default BasicInfo