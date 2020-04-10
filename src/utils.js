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

const getRandomArrayItems = (array) => {
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

export {getRandomNumber, getRandomIntegerNumber, getRandomArrayItem, getRandomArrayItems};
