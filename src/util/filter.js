import {FilterType} from "./const";

export const getFilteredFilms = (films, filterType) => {
  switch (filterType) {
    case FilterType.FAVORITES:
      return films.filter((film) => film.isFavorite);
    case FilterType.HISTORY:
      return films.filter((film) => film.isWatched);
    case FilterType.WATCHLIST:
      return films.filter((film) => film.isWatchlist);
    case FilterType.ALL:
    default:
      return films;
  }
};
