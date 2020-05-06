import {
  getRandomNumber,
  getRandomArrayItem,
  getRandomArrayItems,
  getRandomDate,
  getRandomIntegerNumber
} from "../util/util";
import {generationComments} from "./comments";

const FILM_NAMES = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
];

const DIRECTORS = [
  `Anthony Mann`,
  `Martin Scorsese`,
  `Quentin Jerome Tarantino`,
];

const WRITERS = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `William Shakespeare`,
  `Ernest Hemingway`,
  `F. Scott Fitzgerald`,
];

const ACTORS = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Robert Pattinson`,
  `Charles Chaplin`,
  `Marlon Brando`,
  `Jack Nicholson`,
  `Meryl Streep`,
];

const COUNTRIES = [
  `USA`,
  `Italy`,
  `United KingDom`,
  `New Zealand`,
  `Brazil`,
];

const AGE_RATINGS = [
  `0+`,
  `5+`,
  `10+`,
  `16+`,
  `18+`,
];

const POSTERS = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

const Duration = {
  MIN: 20,
  MAX: 150,
};

const GENRES = [
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


const generateFilm = () => {
  const COMMENTS_COUNT = Math.floor(Math.random() * 20);
  return {
    name: getRandomArrayItem(FILM_NAMES),
    director: getRandomArrayItem(DIRECTORS),
    poster: getRandomArrayItem(POSTERS),
    description: getRandomArrayItems(DESCRIPTIONS),
    writers: getRandomArrayItems(WRITERS),
    actors: getRandomArrayItems(ACTORS),
    country: getRandomArrayItem(COUNTRIES),
    comments: generationComments(COMMENTS_COUNT),
    duration: getRandomIntegerNumber(Duration.MIN, Duration.MAX),
    genres: getRandomArrayItems(GENRES),
    rating: getRandomNumber(Rating.MIN, Rating.MAX),
    age: getRandomArrayItem(AGE_RATINGS),
    releaseDate: getRandomDate(),
    isWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    emoji: null,
  };
};

export const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};
