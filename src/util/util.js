export const Key = {
  ESCAPE: `Escape`,
};

export const getRandomNumber = (min, max) => {
  const randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(1);
};

export const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const getRandomArrayItems = (array) => {
  let tempArray = array.slice();
  const randomCount = Math.floor(Math.random() * array.length) + 1;
  const newArr = [];
  for (let i = 0; i < randomCount; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    const element = tempArray[randomIndex];
    newArr.push(element);
    tempArray.splice(randomIndex, 1);
  }
  return newArr;
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const day = getRandomIntegerNumber(1, 32);
  const month = getRandomIntegerNumber(0, 12);
  const year = getRandomIntegerNumber(2000, 2020);

  targetDate.setFullYear(year, month, day);
  const options = {day: `numeric`, month: `long`, year: `numeric`};

  return targetDate.toLocaleDateString(`en-GB`, options);
};
