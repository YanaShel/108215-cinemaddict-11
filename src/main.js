import API from "./api";
import UserProfile from "./components/profile/user-profile";
import Statistics from "./components/statistics";
import FilmsStatistics from "./components/films-statistics";
import Loading from "./components/films/main-list/loading";
import FilterController from "./controllers/filter-controller";
import PageController from "./controllers/page-controller";
import MoviesModel from "./models/movies";
import {remove, render} from "./util/dom-util";

const AUTHORIZATION = `Basic ufbdyf7ujkgdtejlo=`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();
const loading = new Loading();
const filterController = new FilterController(mainElement, moviesModel);
const pageController = new PageController(mainElement, moviesModel, api);

filterController.render();
render(mainElement, loading);

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
    remove(loading);
    moviesModel.setFilms(films);
    render(headerElement, new UserProfile(films));
    pageController.render();
    render(footerStatisticsElement, new FilmsStatistics(films));
  });


