import React from 'react'
import { ButtonContainer, Button, Input as SearchInput } from '../../components';
import { MEDIA_MENU } from '../../config';
import { useQuery } from '../../hooks/useQuery';


const ListHead = ({ type = 'movies', onMenuSelect, currentSelected }) => {
  const variant = MEDIA_MENU[type];
  const placeholder = `Search a ${type === 'tv' ? 'tv series' : type}`;
  const { queryParams } = useQuery();

  function handleSearch(value) {
    onSearchSubmit(prevValue => ({...prevValue, ...value}));
  }

  return (
    <section className='mt-24 w-full'>
      <div className='mx-24 flex justify-between'>
        <div>
          <h1 className='text-[40px] font-semibold'>Find {variant.title}{queryParams?.query && `: ${queryParams.query}`}</h1>
          <ButtonContainer display='flex gap-4 mt-4'>
            {variant.menu.map(option => 
              <Button 
                key={option.name}
                onClick={() => onMenuSelect(option.path)}
                variant={!queryParams.query && currentSelected === option.path ? 'secondary' : 'unselect'}
              >
                {option.name}
              </Button>
            )}
          </ButtonContainer>
        </div>
        <div className='self-end w-1/2'>
          <SearchInput placeholder={placeholder} onSearch={handleSearch} />
        </div>
      </div>
    </section>
  )
}

export default ListHead