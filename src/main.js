import ProfileUserComponent from "./components/profile-user";
import SiteMenuContainerComponent from "./components/site-menu-container";
import SiteMenuItemsComponent from "./components/site-menu-items";
import SiteMenuItemComponent from "./components/site-menu-item";
import SiteMenuFilterComponent from "./components/site-menu-filter";
import SortContainerComponent from "./components/sort-container";
import SortComponent from "./components/sort";
import FilmsBlockComponent from "./components/films-block";
import FilmsListComponent from "./components/films";
import FilmCardComponent from "./components/film-card";
import ShowMoreButtonComponent from "./components/load-more-button";
import FilmDetailsComponent from "./components/film-details-popup";
import FilmListExtraComponent from "./components/film-list-extra";
import CommentComponent from "./components/comment";
import {generateFilms, FILM_LIST_TITLE} from "./mock/film";
import {generationComments} from "./mock/comments";
import {render, RenderPosition} from "./dom-util";

const FILM_COUNT = 18;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const SITE_MENU_ITEMS = [
  {name: `All movies`, className: `item`, href: `all`},
  {name: `Stats`, className: `additional`, href: `stats`},
];
const FILTER_NAMES = [
  `Watchlist`,
  `History`,
  `Favorites`,
];
const SORT_ITEMS = [
  `Sort by default`,
  `Sort by date`,
  `Sort by rating`
];

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

const renderSiteMenu = () => {
  const allMoviesItem = SITE_MENU_ITEMS[0];
  const statsItem = SITE_MENU_ITEMS[1];

  const siteMenuContainerComponent = new SiteMenuContainerComponent();
  const siteMenuItemsComponent = new SiteMenuItemsComponent();

  render(siteMainElement, siteMenuContainerComponent.getElement(), RenderPosition.BEFOREEND);
  render(siteMenuContainerComponent.getElement(), siteMenuItemsComponent.getElement(), RenderPosition.BEFOREEND);
  render(siteMenuItemsComponent.getElement(), new SiteMenuItemComponent(allMoviesItem.name, allMoviesItem.className, allMoviesItem.href, true).getElement(), RenderPosition.BEFOREEND);
  FILTER_NAMES.forEach((name) => {
    const filterCount = Math.floor(Math.random() * 10);
    render(siteMenuItemsComponent.getElement(), new SiteMenuFilterComponent(name, filterCount).getElement(), RenderPosition.BEFOREEND);
  });
  render(siteMenuContainerComponent.getElement(), new SiteMenuItemComponent(statsItem.name, statsItem.className, statsItem.href, false).getElement(), RenderPosition.BEFOREEND);
};

const renderSort = () => {
  const sortContainerComponent = new SortContainerComponent();
  render(siteMainElement, sortContainerComponent.getElement(), RenderPosition.BEFOREEND);
  SORT_ITEMS.forEach((item, i) => {
    render(sortContainerComponent.getElement(), new SortComponent(item, i === 0).getElement(), RenderPosition.BEFOREEND);
  });
};

const renderFilm = (container, film) => {
  const filmCardComponent = new FilmCardComponent(film);

  render(container, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmsBlock = (filmsBlockComponent, films) => {
  const filmsListComponent = new FilmsListComponent();
  render(filmsBlockComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);
  const filmsContainer = filmsListComponent.getElement().querySelector(`.films-list__container`);

  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilmsCount)
    .forEach((film) => renderFilm(filmsContainer, film));

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

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
  render(filmsBlockComponent.getElement(), new FilmListExtraComponent(FILM_LIST_TITLE[0]).getElement(), RenderPosition.BEFOREEND);
  render(filmsBlockComponent.getElement(), new FilmListExtraComponent(FILM_LIST_TITLE[1]).getElement(), RenderPosition.BEFOREEND);

  const filmsListsExtra = filmsBlockComponent.getElement().querySelectorAll(`.films-list--extra`);
  filmsListsExtra.forEach((list) => {
    const filmsExtraContainer = list.querySelector(`.films-list__container`);
    render(filmsExtraContainer, new FilmCardComponent(films[Math.floor(Math.random() * FILM_COUNT)]).getElement(), RenderPosition.BEFOREEND);
    render(filmsExtraContainer, new FilmCardComponent(films[Math.floor(Math.random() * FILM_COUNT)]).getElement(), RenderPosition.BEFOREEND);
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
    if (film.poster === posterActiveFilm && film.name === nameActiveFilm && film.comments === parseInt(commentsCountActiveFilm.slice(0, 3), 10)) {
      const filmDetailsComponent = new FilmDetailsComponent(film);
      render(siteBodyElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);

      const buttonCloseFilmDetails = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
      const commentsList = filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`);
      const comments = generationComments(film.comments);

      comments.forEach((comment) => {
        render(commentsList, new CommentComponent(comment).getElement(), RenderPosition.BEFOREEND);
      });

      buttonCloseFilmDetails.addEventListener(`click`, function () {
        closePopup(filmDetailsComponent.getElement(), buttonCloseFilmDetails);
      });
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
const filmsBlockComponent = new FilmsBlockComponent();

render(siteHeaderElement, new ProfileUserComponent().getElement(), RenderPosition.BEFOREEND);
renderSiteMenu();
renderSort();
render(siteMainElement, filmsBlockComponent.getElement(), RenderPosition.BEFOREEND);
renderFilmsBlock(filmsBlockComponent, films);
addHandlerToFilmCards();
