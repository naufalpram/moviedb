const API_KEY = "ef8f5857885fc76dcc1bb4f8ec8e0626";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_FETCH_URL = "https://image.tmdb.org/t/p/w500";
const APP_NAME = "Movie DB"

const MEDIA_MENU = {
    movie: {
      title: 'Movies',
      menu: [
        {name: 'Popular', path: 'popular'},
        {name: 'Now Playing', path: 'now_playing'},
        {name: 'Upcoming', path: 'upcoming'},
        {name: 'Top Rated', path: 'top_rated'}
      ]
    },
    tv: {
      title: 'TV Series',
      menu: [
        {name: 'Airing Today', path: 'airing_today'},
        {name: 'On The Air', path: 'on_the_air'},
        {name: 'Popular', path: 'popular'},
        {name: 'Top Rated', path: 'top_rated'}
      ]
    },
    person: {
      title: 'People',
      menu: [{name: 'Popular', path: 'popular'}]
    }
  }

export { API_KEY, BASE_URL, IMAGE_FETCH_URL, APP_NAME, MEDIA_MENU };