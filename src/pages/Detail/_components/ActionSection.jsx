import { IoMdOpen } from 'react-icons/io';
import { ButtonContainer, Button } from '../../../components';
import service from '../../../service';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
const { VITE_IMAGE_URL: IMAGE_FETCH_URL, VITE_API_KEY: API_KEY } = import.meta.env;

function onClickUrl(url) {
    if (url && url.trim() !== '') {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    }
}

const ActionSection = ({ mediaId, poster, homepageUrl, type }) => {
  const { session, user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      service.get(`/account/${user?.id}/favorite/${type === 'movie' ? 'movies' : type}`, {
        params: {
          page: 1,
          session_id: session?.sessionId,
          api_key: API_KEY
        }
      }).then(({ data }) => {
        const isFavorite = data?.results?.some(media => media.id === mediaId);
        setIsFavorite(isFavorite);
      }).catch(e => {
        console.log(e);
      }).finally(() => {
        setIsLoading(false)
      })
    }
    if (user && user.id) {
      fetchData();
    }
  }, [user, mediaId, session.sessionId, type]);

  const addToFavorite = () => {
    if (!user || !user.id || session.type !== 'user') {
      alert('You must be logged in as Movie DB user!');
      return;
    }

    if (type === 'movie' || type === 'tv') {
      service.post(`/account/${user.id}/favorite`, {
        headers: {
          accept: "application/json",
        },
        data: {
          media_type: type,
          media_id: mediaId,
          favorite: !isFavorite
        },
        params: {
          api_key: API_KEY,
          session_id: session.sessionId
        }
      }).then(() => {
        setIsFavorite(prev => !prev);
        alert('Added to favorite!');
      }).catch(e => {
        console.log(e);
      })
    }
  }

  return (
    <div className='flex flex-col items-center'>
        <img src={`${IMAGE_FETCH_URL}${poster}`} alt="Poster Image" className='w-40 md:w-60 lg:w-80 h-auto' />
        {type !== 'person' && 
          <ButtonContainer display='flex flex-col gap-3 mt-6'>
              <Button variant={isFavorite ? 'secondary' : 'ternaryYellow'} onClick={addToFavorite}>
                {!isLoading ? isFavorite ? 'Remove from Favorite' : 'Add to Favorite' : 'Loading...'}
              </Button>
              <Button variant='primary' onClick={() => onClickUrl(homepageUrl)} icon={<IoMdOpen style={{width: '20px', height: '20px'}} />}>
              Visit Page
              </Button>
              
          </ButtonContainer>
        }
    </div>
  )
}

export default ActionSection