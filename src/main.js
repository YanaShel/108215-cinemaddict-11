import API from "./api";
import UserProfile from "./components/profile/user-profile";
import FilterController from "./controllers/filter-controller";
import PageController from "./controllers/page-controller";
import MoviesModel from "./models/movies";
import {generateFilmIds} from "./mock/film";
import {remove, render} from "./util/dom-util";
import {getRandomArrayItem} from "./util/util";
import {generateAllComments} from "./mock/film";
import Comments from "./models/comments";
import Statistics from "./components/statistics";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`

const USER_RATING_NAMES = [
  `Novice`,
  `Fun`,
  `Movie Buff`
];

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const filmIdList = generateFilmIds();

const comments = generateAllComments(filmIdList);
const commentsModel = new Comments();
commentsModel.setComments(comments);

const api = new API(AUTHORIZATION);
const moviesModel = new MoviesModel();

const userProfile = new UserProfile(getRandomArrayItem(USER_RATING_NAMES));
const filterController = new FilterController(mainElement, moviesModel);
const pageController = new PageController(mainElement, moviesModel);

render(headerElement, userProfile);
filterController.render();

let statistic = null;
mainElement.addEventListener(`click`, (evt) => {
  const statsButton = evt.target.closest(`.main-navigation__additional`);
  const filterButton = evt.target.closest(`.main-navigation__item`);

  if (!statsButton && !filterButton) {
    return;
  }
  switch (evt.target) {
    case statsButton:
      if (statistic) {
        remove(statistic);
      }
      pageController.hide();
      statistic = new Statistics(moviesModel);
      render(mainElement, statistic);
      break;
    case filterButton:
      if (statistic) {
        remove(statistic);
      }
      pageController.show();
      break;
  }

});

api.getFilms()
  .then((films) => {
    moviesModel.setFilms(films);
    pageController.render();
  });
