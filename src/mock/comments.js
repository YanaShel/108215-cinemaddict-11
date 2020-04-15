import {getRandomArrayItem} from "../utils";

export const COMMENTS_COUNT = 10;

const EMOTION = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
];

const DATA = [];

const AUTHOR = [
  `Tim Macoveev`,
  `John Doe`,
];

const MESSAGE = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];


const generateComment = () => {
  return {
    emotion: getRandomArrayItem(EMOTION),
    data: DATA,
    author: getRandomArrayItem(AUTHOR),
    message: getRandomArrayItem(MESSAGE),
  };
};

const generationComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(generateComment());
  }
  return comments;
};

export {generationComments};
