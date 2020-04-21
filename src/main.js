import UserProfile from "./components/profile/user-profile";
import Menu from "./components/menu/menu";
import Sort from "./components/sort/sort";
import FilmsContainer from "./components/film/films-container";
import FilmsList from "./components/film/films-list";
import NoFilm from "./components/film/no-film";
import FilmCard from "./components/film/film-card";
import ShowMoreButton from "./components/film/show-more-button";
import FilmDetails from "./components/film-popup/film-details";
import ExtraListsContainer from "./components/film/extra-lists-container";
import {generateFilms} from "./mock/film";
import {render} from "./util/dom-util";
import {getRandomArrayItem, Key} from "./util/util";

const FILM_COUNT = 18;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const EXTRA_LISTS = [
  `Top rated`,
  `Most commented`,
];

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

const renderSiteMenu = () => {
  const siteMenuComponent = new Menu();
  render(siteMainElement, siteMenuComponent.getElement());
};

const renderSort = () => {
  const sortComponent = new Sort();
  render(siteMainElement, sortComponent.getElement());
};

const renderFilm = (container, film) => {
  const filmCardComponent = new FilmCard(film);

  render(container, filmCardComponent.getElement());
};

const renderFilmsBlock = (filmsBlockComponent, films) => {
  const filmsListComponent = new FilmsList();
  render(filmsBlockComponent.getElement(), filmsListComponent.getElement());

  const isFilmsInDataBase = films.length === 0;
  if (isFilmsInDataBase) {
    render(filmsListComponent.getElement(), new NoFilm().getElement());
    return;
  }

  const filmsContainer = filmsListComponent.getElement().querySelector(`.films-list__container`);
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilmsCount)
    .forEach((film) => renderFilm(filmsContainer, film));

  const showMoreButtonComponent = new ShowMoreButton();
  render(filmsListComponent.getElement(), showMoreButtonComponent.getElement());

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => renderFilm(filmsContainer, film));

    if (showingFilmsCount >= FILM_COUNT) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });

  renderFilmsExtraBlock();
};

const renderFilmsExtraBlock = () => {
  EXTRA_LISTS.map((listName) => new ExtraListsContainer(listName).getElement())
    .forEach((list) => render(filmsBlockComponent.getElement(), list));

  const filmsListsExtra = filmsBlockComponent.getElement().querySelectorAll(`.films-list--extra`);
  filmsListsExtra.forEach((list) => {
    const filmsExtraContainer = list.querySelector(`.films-list__container`);
    render(filmsExtraContainer, new FilmCard(getRandomArrayItem(films)).getElement());
    render(filmsExtraContainer, new FilmCard(getRandomArrayItem(films)).getElement());
  });
};

const closeFilmDetailsPopup = (popup, btnClose) => {
  popup.remove();
  btnClose.removeEventListener(`click`, closeFilmDetailsPopup);
};

const onFilmCardClick = (evt) => {
  const filmId = evt.currentTarget.dataset.filmId;

  const filmDetailsComponent = new FilmDetails(films[filmId]);
  render(siteBodyElement, filmDetailsComponent.getElement());

  const buttonCloseFilmDetails = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  buttonCloseFilmDetails.addEventListener(`click`, function () {
    closeFilmDetailsPopup(filmDetailsComponent.getElement(), buttonCloseFilmDetails);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  const onEscKeyDown = (evtKey) => {
    const isEscKey = evtKey.key === Key.ESCAPE;

    if (isEscKey) {
      filmDetailsComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  document.addEventListener(`keydown`, onEscKeyDown);
};

const addHandlerToFilmCards = () => {
  const filmCards = filmsBlockComponent.getElement().querySelectorAll(`.film-card`);
  filmCards.forEach((filmCard) => {
    filmCard.addEventListener(`click`, onFilmCardClick);
  });
};

const films = generateFilms(FILM_COUNT);
const filmsBlockComponent = new FilmsContainer();

render(siteHeaderElement, new UserProfile(`Movie Buff`).getElement());
renderSiteMenu();
renderSort();
render(siteMainElement, filmsBlockComponent.getElement());
renderFilmsBlock(filmsBlockComponent, films);
addHandlerToFilmCards();
