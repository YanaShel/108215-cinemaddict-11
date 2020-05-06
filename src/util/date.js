import moment from "moment";
import momentDurationFormat from "moment-duration-format";
momentDurationFormat(moment);

export const formatFilmDuration = (duration) => {
  return moment.duration(duration, `minutes`).format(`h[h] m[m]`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatYear = (date) => {
  return moment(date).get(`year`);
};

export const formatCommentsDate = (date) => {
  const now = moment();
  const past = moment(date);
  const diff = now.diff(past, `days`);

  if (diff >= 3) {
    return past.format(`YYYY/MM/DD hh:mm`);
  } else if (diff === 0) {
    return moment(past).calendar({sameDay: `[Today]`});
  } else {
    return moment(past).fromNow();
  }
};
