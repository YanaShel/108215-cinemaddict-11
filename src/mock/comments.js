import {getRandomArrayItem, getRandomIntegerNumber} from "../util";

export const COMMENTS_COUNT = 10;

const EMOTION = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
];

const getRandomDate = () => {
  const targetDate = new Date();
  const day = getRandomIntegerNumber(1, 32);
  const month = getRandomIntegerNumber(0, 12);
  const year = getRandomIntegerNumber(2000, 2020);

  targetDate.setFullYear(year, month, day);
  const options = {day: `numeric`, month: `long`, year: `numeric`};

  return targetDate.toLocaleDateString(`en-GB`, options);
};

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
  const DATE = getRandomDate();
  return {
    emotion: getRandomArrayItem(EMOTION),
    date: DATE,
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
