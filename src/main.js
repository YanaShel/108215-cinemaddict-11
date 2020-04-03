import {createProfileUserTemplate} from "./components/profile-user.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingBlockTemplate} from "./components/sorting.js";
import {createFilmsBlockTemplate} from "./components/films-block.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/load-more-button.js";
import {createFilmDetailsPopupTemplate} from "./components/film-details-popup.js";
import {createFilmsListExtraTemplate} from "./components/film-list-extra.js";

const FILM_COUNT = 5;
const FILM_COUNT_EXTRA = 2;
const FILM_LIST_EXTRA_COUNT = 2;

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

const render = (container, template, count = 1, place = `beforeend`) => {
  for (let i = 0; i < count; i++) {
    container.insertAdjacentHTML(place, template);
  }
};

const closePopup = (popup, btnClose) => {
  popup.remove();
  btnClose.removeEventListener(`click`, closePopup);
};

render(siteHeaderElement, createProfileUserTemplate());
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createSortingBlockTemplate());
render(siteMainElement, createFilmsBlockTemplate());

const filmsBlock = siteMainElement.querySelector(`.films`);
const filmsList = filmsBlock.querySelector(`.films-list`);
const filmsContainer = filmsList.querySelector(`.films-list__container`);

render(filmsContainer, createFilmCardTemplate(), FILM_COUNT);
render(filmsList, createShowMoreButtonTemplate());
render(filmsBlock, createFilmsListExtraTemplate(), FILM_LIST_EXTRA_COUNT);

const fillExtraListFilms = () => {
  const filmsListsExtra = filmsBlock.querySelectorAll(`.films-list--extra`);
  filmsListsExtra.forEach((list) => {
    const filmsExtraContainer = list.querySelector(`.films-list__container`);
    render(filmsExtraContainer, createFilmCardTemplate(), FILM_COUNT_EXTRA);
  });
};
const onFilmCardClick = () => {
  render(siteBodyElement, createFilmDetailsPopupTemplate());
  const filmDetailsPopup = document.querySelector(`.film-details`);
  const buttonCloseFilmDetails = filmDetailsPopup.querySelector(`.film-details__close-btn`);
  buttonCloseFilmDetails.addEventListener(`click`, function () {
    closePopup(filmDetailsPopup, buttonCloseFilmDetails);
  });
};
const addHandlerToFilmCards = () => {
  const filmCards = filmsBlock.querySelectorAll(`.film-card`);
  filmCards.forEach((filmCard) => {
    filmCard.addEventListener(`click`, onFilmCardClick);
  });
};

fillExtraListFilms();
addHandlerToFilmCards();

