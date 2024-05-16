import React from 'react';
import Input from '../../components/Input'

const Search = () => {
  return (
    <section className='mt-[120px] flex justify-center'>
        <div className='container max-w-[604px] mx-28 flex flex-col gap-16 items-center'>
            <div className='text-[40px] w-full font-semibold text-center'>Discover Your Favorite Movies and TV Series with Ease</div>
            <Input />
        </div>
    </section>
  )
}

export default Search