import UserProfile from "./components/profile/user-profile";
import Menu from "./components/menu/menu";
import Sort from "./components/sort/sort";
import FilmsBlock from "./components/film/films-block";
import FilmsBlockController from "./controllers/films-block";
import {generateFilms} from "./mock/film";
import {render} from "./util/dom-util";
import {getRandomArrayItem} from "./util/util";

const FILM_COUNT = 18;

const USER_NAMES = [
  `Movie Buff`,
  `Niki Bimbo`,
  `Mary Net`
];

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const films = generateFilms(FILM_COUNT);
const userProfile = new UserProfile(getRandomArrayItem(USER_NAMES));
const menu = new Menu();
const sort = new Sort();
const filmsBlock = new FilmsBlock();
const filmsBlockController = new FilmsBlockController(filmsBlock);

render(headerElement, userProfile);
render(mainElement, menu);
render(mainElement, sort);
render(mainElement, filmsBlock);
filmsBlockController.renderList(films);
filmsBlockController.renderMostCommentedFilms(films);
filmsBlockController.renderTopRatedFilms(films);
