import {getRandomArrayItem, getRandomIntegerNumber} from "../util/util";

const EMOTIONS = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
];

const AUTHORS = [
  `Tim Macoveev`,
  `John Doe`,
];

const MESSAGES = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const getRandomCommentDate = () => {
  const targetDate = new Date();
  const day = getRandomIntegerNumber(1, new Date().getDate() + 1);
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  targetDate.setFullYear(year, month, day);
  return targetDate;
};

const generateComment = (id) => {
  return {
    filmId: id,
    emotion: getRandomArrayItem(EMOTIONS),
    date: getRandomCommentDate(),
    author: getRandomArrayItem(AUTHORS),
    message: getRandomArrayItem(MESSAGES),
  };
};

export const generationComments = (filmId, count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(generateComment(filmId));
  }
  return comments;
};

