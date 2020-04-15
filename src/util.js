export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
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

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
