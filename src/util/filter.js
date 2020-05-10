import {FilterType} from "../const";

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.favorites:
      return films.filter((f) => f.isFavorite);
    case FilterType.history:
      return films.filter((f) => f.isWatched);
    case FilterType.watchlist:
      return films.filter((f) => f.isWatchlist);
    default:
      return films;
  }
};
