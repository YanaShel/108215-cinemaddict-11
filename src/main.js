import UserProfile from "./components/profile/user-profile";
import FilterController from "./controllers/filter-controller";
import PageController from "./controllers/page-controller";
import MoviesModel from "./models/movies";
import {generateFilms} from "./mock/film";
import {render} from "./util/dom-util";
import {getRandomArrayItem} from "./util/util";

const USER_RATING_NAMES = [
  `Novice`,
  `Fun`,
  `Movie Buff`
];

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const films = generateFilms();
const moviesModel = new MoviesModel();
moviesModel.setFilms(films);

const userProfile = new UserProfile(getRandomArrayItem(USER_RATING_NAMES));
const filterController = new FilterController(mainElement, moviesModel);
const pageController = new PageController(mainElement, moviesModel);

render(headerElement, userProfile);
filterController.render();
// render(mainElement, filters);
pageController.render(films);

