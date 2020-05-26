import moment from "moment";
import momentDurationFormat from "moment-duration-format";
import {Rank} from "./const";

momentDurationFormat(moment);

export const formatFilmDuration = (duration) => {
  return moment.duration(duration, `minutes`).format(`h[h] m[m]`);
};

export const getRank = (films) => {
  const watchedFilmsCount = films.filter((film) => film.isWatched).length;
  if (watchedFilmsCount >= Rank.NOVICE.min && watchedFilmsCount <= Rank.NOVICE.max) {
    return Rank.NOVICE.name;
  } else if (watchedFilmsCount >= Rank.FAN.min && watchedFilmsCount <= Rank.FAN.max) {
    return Rank.FAN.name;
  } else if (watchedFilmsCount >= Rank.BUFF.min) {
    return Rank.BUFF.name;
  }

  return ``;
};
