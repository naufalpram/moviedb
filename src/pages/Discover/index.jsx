import React from 'react'
import { Input } from '../../components'

const Discover = () => {
  return (
    <main className='w-[100vw]'>
      <section id='discover-search' className='mt-12 flex justify-center'>
        <div className='w-full mx-28 flex flex-col gap-4 justify-center'>
            <h1 className='text-[40px] font-semibold'>Discover</h1>
            <Input placeholder='Search for movies or tv series' redirect />
        </div>
    </section>
    </main>
  )
}

export default Discover