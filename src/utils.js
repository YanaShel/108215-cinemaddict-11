const getRandomNumber = (min, max) => {
  const randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(1);
};

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArrayItem = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export {getRandomNumber, getRandomIntegerNumber, getRandomArrayItem};
