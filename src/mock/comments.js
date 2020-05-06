import {getRandomArrayItem, getRandomCommentDate} from "../util/util";

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

const generateComment = () => {
  return {
    emotion: getRandomArrayItem(EMOTIONS),
    date: getRandomCommentDate(),
    author: getRandomArrayItem(AUTHORS),
    message: getRandomArrayItem(MESSAGES),
  };
};

export const generationComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(generateComment());
  }
  return comments;
};

