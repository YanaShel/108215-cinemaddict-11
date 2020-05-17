import {Rang, NoviceCount, FanCount, MovieBuffCount} from "./const";
import moment from "moment";
import momentDurationFormat from "moment-duration-format";

momentDurationFormat(moment);

export const formatFilmDuration = (duration) => {
  return moment.duration(duration, `minutes`).format(`h[h] m[m]`);
};

export const getRang = (films) => {
  const watchedFilms = films.filter((film) => film.isWatched);
  const countWatchedFilms = watchedFilms.length;
  if (countWatchedFilms >= NoviceCount.MIN && countWatchedFilms <= NoviceCount.MAX) {
    return Rang.NOVICE;
  } else if (countWatchedFilms >= FanCount.MIN && countWatchedFilms <= FanCount.MAX) {
    return Rang.FAN;
  } else if (countWatchedFilms >= MovieBuffCount.MIN) {
    return Rang.BUFF;
  }

  return ``;
};
