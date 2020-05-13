import UserProfile from "./components/profile/user-profile";
import FilterController from "./controllers/filter-controller";
import PageController from "./controllers/page-controller";
import MoviesModel from "./models/movies";
import {generateFilmIds, generateFilms} from "./mock/film";
import {render} from "./util/dom-util";
import {getRandomArrayItem} from "./util/util";
import {generateComments} from "./mock/film";
import Comments from "./models/comments";

const USER_RATING_NAMES = [
  `Novice`,
  `Fun`,
  `Movie Buff`
];

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const filmIdList = generateFilmIds();

const comments = generateComments(filmIdList);
const commentsModel = new Comments();
commentsModel.setComments(comments);

const films = generateFilms(filmIdList, comments);
const moviesModel = new MoviesModel();
moviesModel.setFilms(films);

const userProfile = new UserProfile(getRandomArrayItem(USER_RATING_NAMES));
const filterController = new FilterController(mainElement, moviesModel);
const pageController = new PageController(mainElement, moviesModel);

render(headerElement, userProfile);
filterController.render();
pageController.render(films);

