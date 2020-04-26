import UserProfile from "./components/profile/user-profile";
import Menu from "./components/menu/menu";
import Page from "./controllers/page";
import {generateFilms} from "./mock/film";
import {render} from "./util/dom-util";
import {getRandomArrayItem} from "./util/util";

const FILM_COUNT = 18;

const USER_RATING_NAMES = [
  `Novice`,
  `Fun`,
  `Movie Buff`
];

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const films = generateFilms(FILM_COUNT);
const userProfile = new UserProfile(getRandomArrayItem(USER_RATING_NAMES));
const menu = new Menu();
const pageController = new Page(mainElement);

render(headerElement, userProfile);
render(mainElement, menu);
pageController.render(films);
