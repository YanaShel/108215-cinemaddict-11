import moment from "moment";
import momentDurationFormat from "moment-duration-format";

momentDurationFormat(moment);

export const formatFilmDuration = (duration) => {
  return moment.duration(duration, `minutes`).format(`h[h] m[m]`);
};

