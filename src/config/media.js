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

export { MEDIA_MENU };