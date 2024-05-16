import React from 'react'
import ButtonContainer from '../../components/Buttons/ButtonContainer';
import Button from '../../components/Buttons/Button';
import { MEDIA_MENU } from '../../config';


const ListHead = ({ type = 'movies', onMenuSelect, currentSelected }) => {
  const variant = MEDIA_MENU[type];
  return (
    <section className='mt-24 w-full'>
      <div className='mx-24'>
        <h1 className='text-[40px] font-semibold'>Find {variant.title}</h1>
        <ButtonContainer display='flex gap-4 mt-4'>
          {variant.menu.map((option, index) => 
            <Button key={option.name} onClick={() => onMenuSelect(option.path)} variant={currentSelected === option.path ? 'secondary' : 'unselect'}>{option.name}</Button>
          )}
        </ButtonContainer>
      </div>
    </section>
  )
}

export default ListHead