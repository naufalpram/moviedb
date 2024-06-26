
import { dateFormatter, episodeFormatter, runtimeFormatter } from '../../../../helper/dataFormatter';
import { FaStar } from 'react-icons/fa';
import { CardContainer } from '../../../../components';
import Credit from '../Credit';
import InfoSkeleton from '../InfoSkeleton';

const GENDER = ['Not Specified', 'Female', 'Male', 'Non-binary'];

const InfoResult = ({ data }) => {
    const formattedBirthDate = data?.birthday ? dateFormatter(data?.birthday): null;
    const formattedDeathDate = data?.deathday ? dateFormatter(data?.deathday) : null;
    const aliases = data?.also_known_as?.reduce((acc, curr, idx) => {
        if (idx === data?.also_known_as.length - 1) acc += curr;
        else acc += curr + ", ";
        return acc;
    }, '')
    return (
        <>
        <h1 className='font-bold text-[40px] font-title uppercase text-white tracking-widest'>{data?.title || data?.name}</h1>
        <div className='flex gap-5'>
          <p className='text-unselect-gray text-xl font-semibold py-1'>{formattedBirthDate} {formattedDeathDate ? `- ${formattedDeathDate}` : null}</p>
          <p className='border border-secondary-400 py-1 px-2 text-center font-semibold'>{GENDER[data?.gender]}</p>
          <p className='border border-primary-200 py-1 px-2 text-center font-semibold'>{data?.place_of_birth}</p>
          <div className='flex gap-2 items-center'>
            <FaStar className='h-full w-8' style={{color: '#FFC300'}} />
            <p className='font-semibold text-lg'>{data?.popularity}</p>
          </div>
        </div>
        <p className='mt-5 font-semibold text-xl'>{data?.biography}</p>
        {data?.also_known_as?.length > 0 && <p className='mt-4 font-light'><span className='font-semibold'>Also Known As:</span> {aliases}</p>}
        </>
    )
}

const PeopleInfo = ({ result }) => {
  const { data, ...otherResult } = result;
  return (
    <div className='w-3/5 pr-16'>
        {otherResult.loading && <InfoSkeleton />}
        {otherResult.status === 'resolved' && <InfoResult data={data} />}
        <Credit />
    </div>
  )
}

export default PeopleInfo