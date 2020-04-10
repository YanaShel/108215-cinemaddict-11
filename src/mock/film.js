import {getRandomNumber, getRandomIntegerNumber, getRandomArrayItem, getRandomArrayItems} from "../utils";
import {generationComments} from "./comments";

const NameOfFilms = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

const Director = [
  `Anthony Mann`,
  `Martin Scorsese`,
  `Quentin Jerome Tarantino`,
];

const Writers = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `William Shakespeare`,
  `Ernest Hemingway`,
  `F. Scott Fitzgerald`,
];

const Actors = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Robert Pattinson`,
  `Charles Chaplin`,
  `Marlon Brando`,
  `Jack Nicholson`,
  `Meryl Streep`,
];

const Country = [
  `USA`,
  `Italy`,
  `United KingDom`,
  `New Zealand`,
  `Brazil`,
];

const Age = [
  `0+`,
  `5+`,
  `10+`,
  `16+`,
  `18+`,
];

const Poster = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const Description = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

const Year = {
  MIN: 1900,
  MAX: 1970,
};

const Duration = [
  `1h 55m`,
  `54m`,
  `1h 59m`,
  `1h 21m`,
  `16m`,
  `1h 18m`,
  `1h 32m`
];

const Genre = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
  `Film-Noir`
];

const Rating = {
  MIN: 1,
  MAX: 10,
};

const getRandomDate = () => {
  const targetDate = new Date();
  const day = getRandomIntegerNumber(1, 32);
  const month = getRandomIntegerNumber(0, 12);
  const year = getRandomIntegerNumber(1920, 1980);

  targetDate.setFullYear(year, month, day);
  const options = {day: `numeric`, month: `long`, year: `numeric`};

  return targetDate.toLocaleDateString(`en-GB`, options);
};

const generateFilm = () => {
  const comments = generationComments();
  return {
    name: getRandomArrayItem(NameOfFilms),
    director: getRandomArrayItem(Director),
    poster: getRandomArrayItem(Poster),
    description: getRandomArrayItems(Description),
    writers: getRandomArrayItems(Writers),
    actors: getRandomArrayItems(Actors),
    country: getRandomArrayItem(Country),
    comments: comments.length,
    year: getRandomIntegerNumber(Year.MIN, Year.MAX),
    duration: getRandomArrayItem(Duration),
    genres: getRandomArrayItems(Genre),
    rating: getRandomNumber(Rating.MIN, Rating.MAX),
    age: getRandomArrayItem(Age),
    releaseDate: getRandomDate(),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilms};

