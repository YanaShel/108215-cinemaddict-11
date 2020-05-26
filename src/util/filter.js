import {FilterType} from "./const";

export const getFilteredFilms = (films, filterType) => {
  switch (filterType) {
    case FilterType.FAVORITES:
      return films.filter((f) => f.isFavorite);
    case FilterType.HISTORY:
      return films.filter((f) => f.isWatched);
    case FilterType.WATCHLIST:
      return films.filter((f) => f.isWatchlist);
    case FilterType.ALL:
    default:
      return films;
  }
};
