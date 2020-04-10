import {getRandomIntegerNumber} from "../utils";

const Emotion = [];
const Data = [];
const Author = [];
const Message = [];


const CommentLength = {
  MIN: 1,
  MAX: 500,
};

const generateComment = () => {
  return {
    emotion: Emotion,
    data: Data,
    author: Author,
    message: Message,
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
