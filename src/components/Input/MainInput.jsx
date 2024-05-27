import React, { useRef } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useQuery } from '../../hooks/useQuery';

const MainInput = ({ placeholder, onSearch }) => {
  const inputRef = useRef();
  const { handleQueryChange } = useQuery();

  function handleSearch(value) {
    if (onSearch) {
      onSearch(value);
      return
    }
    handleQueryChange({query: value})
  }

  function handleEnter(e) {
    if (e.key === 'Enter') handleSearch(inputRef.current.value);
  }

  return (
    <div className='w-full p-[0.8px] rounded-3xl bg-gradient-to-r from-secondary-400 to-primary-400 relative flex items-center'>
        <input 
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className='w-full h-12 py-4 pl-8 pr-20 rounded-3xl focus:outline-none'
          onKeyDown={handleEnter} 
        />
        <IoIosSearch className='absolute right-8 w-6 h-6 cursor-pointer' onClick={() => handleSearch(inputRef.current.value)} />
    </div>
  )
}

export default MainInput