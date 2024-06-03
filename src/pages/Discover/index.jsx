
import { Input } from '../../components'
import Result from './Result'
import { useQuery } from '../../hooks/useQuery'

const Discover = () => {
  const { queryParams } = useQuery();
  return (
    <main className='w-[100vw]'>
      <section id='discover-search' className='mt-12 flex justify-center'>
        <div className='w-full mx-28 flex flex-col gap-4 justify-center'>
            <h1 className='text-[40px] font-semibold'>Discover{queryParams.query && queryParams.query.trim() !== '' ? `: ${queryParams.query}`: ''}</h1>
            <Input placeholder='Search for movies or tv series' />
        </div>
      </section>
      {queryParams.query && queryParams.query.trim() !== '' ? <Result /> : 
        <section id='empty-discover' className='mt-12 flex w-full justify-center min-h-svh'>
            <h2 className='font-semibold text-2xl text-center'>Start discovering your favorite movie, tv series, or people now!</h2>
        </section>
      }
    </main>
  )
}

export default Discover