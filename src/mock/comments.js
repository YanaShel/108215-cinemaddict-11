import {getRandomIntegerNumber, getRandomArrayItem} from "../utils";

const Emotion = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
];

const Data = [];

const Author = [
  `Tim Macoveev`,
  `John Doe`,
];

const Message = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const CommentLength = {
  MIN: 1,
  MAX: 25,
};

const generateComment = () => {
  return {
    emotion: getRandomArrayItem(Emotion),
    data: Data,
    author: getRandomArrayItem(Author),
    message: getRandomArrayItem(Message),
  };
};

const generationComments = () => {
  const randomNumberCommentsLength = getRandomIntegerNumber(CommentLength.MIN, CommentLength.MAX);
  const comments = [];
  for (let i = 0; i < randomNumberCommentsLength; i++) {
    comments.push(generateComment());
  }
  return comments;
};

export {generationComments};
