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
import {Key} from "./util/util";

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
  render(filmsBlockComponent.getElement(), new ExtraListsContainer(EXTRA_LISTS[0]).getElement());
  render(filmsBlockComponent.getElement(), new ExtraListsContainer(EXTRA_LISTS[1]).getElement());

  const filmsListsExtra = filmsBlockComponent.getElement().querySelectorAll(`.films-list--extra`);
  filmsListsExtra.forEach((list) => {
    const filmsExtraContainer = list.querySelector(`.films-list__container`);
    render(filmsExtraContainer, new FilmCard(films[Math.floor(Math.random() * FILM_COUNT)]).getElement());
    render(filmsExtraContainer, new FilmCard(films[Math.floor(Math.random() * FILM_COUNT)]).getElement());
  });
};

const closePopup = (popup, btnClose) => {
  popup.remove();
  btnClose.removeEventListener(`click`, closePopup);
};

const onFilmCardClick = (evt) => {

  const posterActiveFilm = evt.target.attributes.src.value;
  const nameActiveFilm = evt.target.parentElement.children[0].innerHTML;
  const commentsCountActiveFilm = evt.target.parentElement.children[5].innerHTML;

  films.forEach((film) => {
    if (film.poster === posterActiveFilm && film.name === nameActiveFilm && film.comments.length === parseInt(commentsCountActiveFilm.slice(0, 3), 10)) {
      const filmDetailsComponent = new FilmDetails(film);
      render(siteBodyElement, filmDetailsComponent.getElement());

      const buttonCloseFilmDetails = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

      buttonCloseFilmDetails.addEventListener(`click`, function () {
        closePopup(filmDetailsComponent.getElement(), buttonCloseFilmDetails);
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

    }
  });
};

const addHandlerToFilmCards = () => {
  const filmCards = filmsBlockComponent.getElement().querySelectorAll(`.film-card`);
  filmCards.forEach((filmCard) => {
    filmCard.addEventListener(`click`, onFilmCardClick);
  });
};

const films = generateFilms(FILM_COUNT);
const filmsBlockComponent = new FilmsContainer();

render(siteHeaderElement, new UserProfile().getElement());
renderSiteMenu();
renderSort();
render(siteMainElement, filmsBlockComponent.getElement());
renderFilmsBlock(filmsBlockComponent, films);
addHandlerToFilmCards();
