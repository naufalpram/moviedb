import React from 'react'
import { IoMdOpen } from 'react-icons/io';
import { ButtonContainer, Button } from '../../../components';
const { VITE_IMAGE_URL: IMAGE_FETCH_URL } = import.meta.env;

function onClickUrl(url) {
    if (url && url.trim() !== '') {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    }
}

const ActionSection = ({ poster, homepageUrl, type }) => {
  return (
    <div className='flex flex-col items-center'>
        <img src={`${IMAGE_FETCH_URL}${poster}`} alt="Poster Image" className='w-40 md:w-60 lg:w-80 h-auto' />
        {type !== 'person' && 
          <ButtonContainer display='flex flex-col gap-3 mt-6'>
              <Button variant='secondary' onClick={() => onClickUrl(homepageUrl)} icon={<IoMdOpen style={{width: '20px', height: '20px'}} />}>
              Visit Page
              </Button>
              <Button variant='primary'>
              Add to Favorite
              </Button>
          </ButtonContainer>
        }
    </div>
  )
}

export default ActionSection