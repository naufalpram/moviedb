
import BasicInfo from './_components/BasicInfo';
import ActionSection from './_components/ActionSection';
import PeopleInfo from './_components/PeopleInfo';

const DetailData = ({ mediaType, result }) => {
  const Info = mediaType === 'person' ? PeopleInfo : BasicInfo;
  const { data } = result;
  return (
    <section id='detail-data' className='mt-12 w-full'>
        <div className='flex mobile:flex-col-reverse sm:flex-col-reverse md:flex-row justify-center mx-28'>
          <Info result={result} />
          <ActionSection poster={data?.poster_path || data?.profile_path} homepageUrl={data?.homepage} type={mediaType} />
        </div>
    </section>
  )
}

export default DetailData