
import { useCallback, useEffect, useMemo } from 'react';
import { Card, CardContainer, ContainerSkeleton } from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks/useFetch';
import FavoriteHeader from './_components/FavoriteHeader';

const { VITE_API_KEY: API_KEY } = import.meta.env;

const HomeFavorite = () => {
  const length = 0
  const { user, session } = useAuth();
  const { data: favoriteMovies, loading: loadingMovies, fetchData: getMovies} = useFetch(
    `/account/${user?.id}/favorite/movies`,
    { page: 1, session_id: session?.sessionId, api_key: API_KEY },
    useCallback((data) => ({
      data: data?.results
    }), []),
    { onMount: false }
  );

  const { data: favoriteTv, loading: loadingTv, fetchData: getTv} = useFetch(
    `/account/${user?.id}/favorite/tv`,
    { page: 1, session_id: session?.sessionId, api_key: API_KEY },
    useCallback((data) => ({
      data: data?.results
    }), []),
    { onMount: false }
  );

  useEffect(() => {
    if (user?.id && session?.sessionId) {
      getMovies();
      getTv();
    }
  }, [user, session, getMovies, getTv]);

  const favoriteList = useMemo(() => {
    let list = [];
    if (favoriteMovies?.length > 0) {
      list = [...list, ...favoriteMovies.map(media => ({...media, media_type: 'movie'}))];
    }
    if (favoriteTv?.length > 0) {
      list = [...list, ...favoriteTv.map(media => ({...media, media_type: 'tv'}))];
    }
    return list
  }, [favoriteMovies, favoriteTv])

  return (
    <section id='home_favorite' className='mt-10 flex w-full'>
        <CardContainer header={<FavoriteHeader />}>
            {favoriteList?.length === 0 && <p>Add your favorite movies or tv series now!</p>}
            {(loadingMovies || loadingTv) && <ContainerSkeleton length={length} isWithTitle={true} />}
            {favoriteList?.length > 0 && favoriteList.slice(0, 8)?.map(media => {
                    const title = media.title || media.name;
                    const identifier = `${media.id}-${title.split(' ').join('-')}`;
                    return <Card 
                                key={identifier}
                                path={`/${media.media_type}/${identifier}`}
                                imagePath={media.poster_path} 
                                title={title}
                            />
            })}
        </CardContainer>
    </section>
  )
}

export default HomeFavorite