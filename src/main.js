import {createProfileUserTemplate} from "./components/profile-user.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingBlockTemplate} from "./components/sorting.js";
import {createFilmsBlockTemplate} from "./components/films-block.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/load-more-button.js";
import {createFilmDetailsPopupTemplate} from "./components/film-details-popup.js";
import {createFilmsListExtraTemplate} from "./components/film-list-extra";
import {generateFilms} from "./mock/film";
import {generationFilter} from "./mock/filter";

const FILM_COUNT = 18;
const FILM_LIST_EXTRA_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

const films = generateFilms(FILM_COUNT);
const filters = generationFilter();

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
render(siteMainElement, createSiteMenuTemplate(filters));
render(siteMainElement, createSortingBlockTemplate());
render(siteMainElement, createFilmsBlockTemplate());

const filmsBlock = siteMainElement.querySelector(`.films`);
const filmsList = filmsBlock.querySelector(`.films-list`);
const filmsContainer = filmsList.querySelector(`.films-list__container`);
const renderPartOfFilms = (begin, end) => {
  films.slice(begin, end).forEach((film) => {
    render(filmsContainer, createFilmCardTemplate(film));
  });
};

renderPartOfFilms(0, SHOWING_FILMS_COUNT_ON_START);
render(filmsList, createShowMoreButtonTemplate());
render(filmsBlock, createFilmsListExtraTemplate(), FILM_LIST_EXTRA_COUNT);

const buttonShowMore = filmsList.querySelector(`.films-list__show-more`);
buttonShowMore.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  renderPartOfFilms(prevFilmsCount, showingFilmsCount);

  if (showingFilmsCount >= films.length) {
    buttonShowMore.remove();
  }
});

const fillExtraListFilms = () => {
  const filmsListsExtra = filmsBlock.querySelectorAll(`.films-list--extra`);
  filmsListsExtra.forEach((list) => {
    const filmsExtraContainer = list.querySelector(`.films-list__container`);
    render(filmsExtraContainer, createFilmCardTemplate(films[Math.floor(Math.random() * FILM_COUNT)]));
    render(filmsExtraContainer, createFilmCardTemplate(films[Math.floor(Math.random() * FILM_COUNT)]));
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

