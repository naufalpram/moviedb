import React, { useCallback, useEffect, useState } from 'react'
import ButtonContainer from '../../components/Buttons/ButtonContainer';
import Button from '../../components/Buttons/Button';
import SearchInput from '../../components/Input';
import { MEDIA_MENU } from '../../config';
import { useSearch } from '../../hooks/useSearch';


const ListHead = ({ type = 'movies', onMenuSelect, currentSelected }) => {
  const variant = MEDIA_MENU[type];
  const { searchQuery } = useSearch();

  return (
    <section className='mt-24 w-full'>
      <div className='mx-24 flex justify-between'>
        <div>
          <h1 className='text-[40px] font-semibold'>Find {variant.title}{searchQuery.keyword && `: ${searchQuery.keyword}`}</h1>
          <ButtonContainer display='flex gap-4 mt-4'>
            {variant.menu.map(option => 
              <Button 
                key={option.name}
                onClick={() => onMenuSelect(option.path)}
                variant={!searchQuery.keyword && currentSelected === option.path ? 'secondary' : 'unselect'}
              >
                {option.name}
              </Button>
            )}
          </ButtonContainer>
        </div>
        <div className='self-end w-1/2'>
          <SearchInput placeholder={`Search a ${type === 'tv' ? 'tv series' : type}`} />
        </div>
      </div>
    </section>
  )
}

export default ListHead