import {getRandomNumber, getRandomIntegerNumber, getRandomArrayItem} from "../utils";
import {generationComments} from "./comments";

const NameOfFilms = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
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

const FilmInfo = {
  year: {
    MIN: 1900,
    MAX: 1970,
  },
  duration: [`1h 55m`, `54m`, `1h 59m`, `1h 21m`, `16m`, `1h 18m`, `1h 32m`],
  genre: [`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`, `Mystery`]
};

const Rating = {
  MIN: 1,
  MAX: 10,
};


const generateFilm = () => {
  const comments = generationComments();
  return {
    name: getRandomArrayItem(NameOfFilms),
    poster: getRandomArrayItem(Poster),
    description: getRandomArrayItem(Description),
    comments: comments.length,
    year: getRandomIntegerNumber(FilmInfo.year.MIN, FilmInfo.year.MAX),
    duration: getRandomArrayItem(FilmInfo.duration),
    genre: getRandomArrayItem(FilmInfo.genre),
    rating: getRandomNumber(Rating.MIN, Rating.MAX),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilms};

