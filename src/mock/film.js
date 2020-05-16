// import {getRandomArrayItem, getRandomArrayItems, getRandomIntegerNumber, getRandomNumber} from "../util/util";
import {generateComments} from "./comments";
// import {GENRES} from "../const";

// const FILM_NAMES = [
//   `The Dance of Life`,
//   `Sagebrush Trail`,
//   `The Man with the Golden Arm`,
//   `Santa Claus Conquers the Martians`,
//   `Popeye the Sailor Meets Sindbad the Sailor`,
// ];

// const DIRECTORS = [
//   `Anthony Mann`,
//   `Martin Scorsese`,
//   `Quentin Jerome Tarantino`,
// ];
//
// const WRITERS = [
//   `Anne Wigton`,
//   `Heinz Herald`,
//   `Richard Weil`,
//   `William Shakespeare`,
//   `Ernest Hemingway`,
//   `F. Scott Fitzgerald`,
// ];

// const ACTORS = [
//   `Erich von Stroheim`,
//   `Mary Beth Hughes`,
//   `Dan Duryea`,
//   `Robert Pattinson`,
//   `Charles Chaplin`,
//   `Marlon Brando`,
//   `Jack Nicholson`,
//   `Meryl Streep`,
// ];

// const COUNTRIES = [
//   `USA`,
//   `Italy`,
//   `United KingDom`,
//   `New Zealand`,
//   `Brazil`,
// ];

// const AGE_RATINGS = [
//   `0+`,
//   `5+`,
//   `10+`,
//   `16+`,
//   `18+`,
// ];

// const POSTERS = [
//   `./images/posters/made-for-each-other.png`,
//   `./images/posters/popeye-meets-sinbad.png`,
//   `./images/posters/sagebrush-trail.jpg`,
//   `./images/posters/santa-claus-conquers-the-martians.jpg`,
//   `./images/posters/the-dance-of-life.jpg`,
//   `./images/posters/the-great-flamarion.jpg`,
//   `./images/posters/the-man-with-the-golden-arm.jpg`,
// ];

// const DESCRIPTIONS = [
//   `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
//   `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
//   `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
//   `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
//   `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
//   `Sed sed nisi sed augue convallis suscipit in sed felis.`,
//   `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
// ];

// const Duration = {
//   MIN: 20,
//   MAX: 150,
// };
//
// const Rating = {
//   MIN: 1,
//   MAX: 10,
// };

// const getRandomDate = () => {
//   const targetDate = new Date();
//   const day = getRandomIntegerNumber(1, 32);
//   const month = getRandomIntegerNumber(0, 12);
//   const year = getRandomIntegerNumber(1930, 2020);
//   targetDate.setFullYear(year, month, day);
//   return targetDate;
// };

// const getRandomWatchingDate = () => {
//   const targetDate = new Date();
//   const day = getRandomIntegerNumber(1, new Date().getDate() + 1);
//   const month = new Date().getMonth();
//   const year = new Date().getFullYear();
//   targetDate.setFullYear(year, month, day);
//   return targetDate;
// };

const generateFilmId = () => {
  return String(new Date() + Math.random());
};

// const generateFilm = (filmId, filmComments) => {
//   return {
//     id: filmId,
//     name: getRandomArrayItem(FILM_NAMES),
//     director: getRandomArrayItem(DIRECTORS),
//     poster: getRandomArrayItem(POSTERS),
//     description: getRandomArrayItems(DESCRIPTIONS),
//     writers: getRandomArrayItems(WRITERS),
//     actors: getRandomArrayItems(ACTORS),
//     country: getRandomArrayItem(COUNTRIES),
//     duration: getRandomIntegerNumber(Duration.MIN, Duration.MAX),
//     genres: getRandomArrayItems(GENRES),
//     rating: getRandomNumber(Rating.MIN, Rating.MAX),
//     age: getRandomArrayItem(AGE_RATINGS),
//     releaseDate: getRandomDate(),
//     comments: filmComments,
//     isWatchlist: Math.random() > 0.5,
//     isWatched: Math.random() > 0.5,
//     isFavorite: Math.random() > 0.5,
//     watchingDate: getRandomWatchingDate(),
//     emoji: null,
//   };
// };

export const generateFilmIds = (count = 18) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmId);
};

// export const generateFilms = (filmIds, comments) => {
//   const films = [];
//   filmIds.forEach((filmId) => {
//     const filmComments = comments.filter((comment) => comment.filmId === filmId);
//     films.push(generateFilm(filmId, filmComments));
//   });
//   return films;
// };

export const generateAllComments = (filmIds) => {
  const comments = [];
  filmIds.forEach((filmId) => comments.push(generateComments(filmId, Math.floor(Math.random() * 20))));
  return comments.flat();
};


