import ProfileUserComponent from "./components/profile/profile-user";
import SiteMenuContainerComponent from "./components/site-menu/site-menu-container";
import SiteMenuItemsComponent from "./components/site-menu/site-menu-items";
import SiteMenuItemComponent from "./components/site-menu/site-menu-item";
import SiteMenuFilterComponent from "./components/site-menu/site-menu-filter";
import SortContainerComponent from "./components/sort/sort-container";
import SortComponent from "./components/sort/sort";
import FilmsBlockComponent from "./components/film/films-block";
import FilmsListComponent from "./components/film/films";
import NoFilmComponent from "./components/film/no-film";
import FilmCardComponent from "./components/film/film-card";
import FilmCardButtonContainerComponent from "./components/film/buttons/button-container";
import FilmCardButtonComponent from "./components/film/buttons/button";
import ShowMoreButtonComponent from "./components/film/load-more-button";
import FilmDetailsComponent from "./components/film-popup/film-details-popup";
import FilmDetailsInfoComponent from "./components/film-popup/info/main-info";
import FilmDetailsGenreComponent from "./components/film-popup/info/genre-info";
import FilmDetailsButtonComponent from "./components/film-popup/button";
import EmojiComponent from "./components/film-popup/emoji";
import FilmListExtraComponent from "./components/film/film-list-extra";
import CommentComponent from "./components/film-popup/comment";
import {generateFilms, FILM_LIST_TITLE} from "./mock/film";
import {generationComments} from "./mock/comments";
import {render} from "./util/dom-util";

const FILM_COUNT = 18;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const Key = {
  ESCAPE: `Escape`,
};

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

const FILM_CARD_BUTTONS = [
  {name: `Add to watchlist`, className: `add-to-watchlist`},
  {name: `Mark as watched`, className: `mark-as-watched`},
  {name: `Mark as favorite`, className: `favorite`},
];

const FILM_CARD_DETAILS_BUTTONS = [
  {name: `Add to watchlist`, className: `watchlist`},
  {name: `Already watched`, className: `watched`},
  {name: `Add to favorites`, className: `favorite`},
];

const FilmInfo = {
  DIRECTOR: `Director`,
  WRITERS: `Writers`,
  ACTORS: `Actors`,
  RELEASE_DATE: `Release Date`,
  DURATION: `Runtime`,
  COUNTRY: `Country`,
};

const EMOJI_NAMES = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

const renderSiteMenu = () => {
  const allMoviesItem = SITE_MENU_ITEMS[0];
  const statsItem = SITE_MENU_ITEMS[1];

  const siteMenuContainerComponent = new SiteMenuContainerComponent();
  const siteMenuItemsComponent = new SiteMenuItemsComponent();

  render(siteMainElement, siteMenuContainerComponent.getElement());
  render(siteMenuContainerComponent.getElement(), siteMenuItemsComponent.getElement());
  render(siteMenuItemsComponent.getElement(), new SiteMenuItemComponent(allMoviesItem.name, allMoviesItem.className, allMoviesItem.href, true).getElement());
  FILTER_NAMES.forEach((name) => {
    const filterCount = Math.floor(Math.random() * 10);
    render(siteMenuItemsComponent.getElement(), new SiteMenuFilterComponent(name, filterCount).getElement());
  });
  render(siteMenuContainerComponent.getElement(), new SiteMenuItemComponent(statsItem.name, statsItem.className, statsItem.href, false).getElement());
};

const renderSort = () => {
  const sortContainerComponent = new SortContainerComponent();
  render(siteMainElement, sortContainerComponent.getElement());
  SORT_ITEMS.forEach((item, i) => {
    render(sortContainerComponent.getElement(), new SortComponent(item, i === 0).getElement());
  });
};

const renderFilm = (container, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const buttonContainerComponent = new FilmCardButtonContainerComponent();

  render(container, filmCardComponent.getElement());
  render(filmCardComponent.getElement(), buttonContainerComponent.getElement());

  FILM_CARD_BUTTONS.forEach((button) => {
    render(buttonContainerComponent.getElement(), new FilmCardButtonComponent(button).getElement());
  });
};

const renderFilmsBlock = (filmsBlockComponent, films) => {
  const filmsListComponent = new FilmsListComponent();
  render(filmsBlockComponent.getElement(), filmsListComponent.getElement());

  const isFilmsInDataBase = films.length === 0;
  if (isFilmsInDataBase) {
    render(filmsListComponent.getElement(), new NoFilmComponent().getElement());
    return;
  }

  const filmsContainer = filmsListComponent.getElement().querySelector(`.films-list__container`);
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  films.slice(0, showingFilmsCount)
    .forEach((film) => renderFilm(filmsContainer, film));

  const showMoreButtonComponent = new ShowMoreButtonComponent();
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
  render(filmsBlockComponent.getElement(), new FilmListExtraComponent(FILM_LIST_TITLE[0]).getElement());
  render(filmsBlockComponent.getElement(), new FilmListExtraComponent(FILM_LIST_TITLE[1]).getElement());

  const filmsListsExtra = filmsBlockComponent.getElement().querySelectorAll(`.films-list--extra`);
  filmsListsExtra.forEach((list) => {
    const filmsExtraContainer = list.querySelector(`.films-list__container`);
    render(filmsExtraContainer, new FilmCardComponent(films[Math.floor(Math.random() * FILM_COUNT)]).getElement());
    render(filmsExtraContainer, new FilmCardComponent(films[Math.floor(Math.random() * FILM_COUNT)]).getElement());
  });
};

const renderFilmInfo = (filmDetailsPopup, film) => {
  const filmInfoTable = filmDetailsPopup.getElement().querySelector(`.film-details__table`);
  render(filmInfoTable, new FilmDetailsInfoComponent(FilmInfo.DIRECTOR, film.director).getElement());
  render(filmInfoTable, new FilmDetailsInfoComponent(FilmInfo.WRITERS, film.writers).getElement());
  render(filmInfoTable, new FilmDetailsInfoComponent(FilmInfo.ACTORS, film.actors).getElement());
  render(filmInfoTable, new FilmDetailsInfoComponent(FilmInfo.RELEASE_DATE, film.releaseDate).getElement());
  render(filmInfoTable, new FilmDetailsInfoComponent(FilmInfo.DURATION, film.duration).getElement());
  render(filmInfoTable, new FilmDetailsInfoComponent(FilmInfo.COUNTRY, film.country).getElement());
  render(filmInfoTable, new FilmDetailsGenreComponent(film.genres).getElement());
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
      render(siteBodyElement, filmDetailsComponent.getElement());

      renderFilmInfo(filmDetailsComponent, film);

      const buttonContainer = filmDetailsComponent.getElement().querySelector(`.film-details__controls`);
      FILM_CARD_DETAILS_BUTTONS.forEach((button) => {
        render(buttonContainer, new FilmDetailsButtonComponent(button).getElement());
      });

      const commentsList = filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`);
      const comments = generationComments(film.comments);
      comments.forEach((comment) => {
        render(commentsList, new CommentComponent(comment).getElement());
      });

      const emojiContainer = filmDetailsComponent.getElement().querySelector(`.film-details__emoji-list`);
      EMOJI_NAMES.forEach((name) => {
        render(emojiContainer, new EmojiComponent(name).getElement());
      });

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
const filmsBlockComponent = new FilmsBlockComponent();

render(siteHeaderElement, new ProfileUserComponent().getElement());
renderSiteMenu();
renderSort();
render(siteMainElement, filmsBlockComponent.getElement());
renderFilmsBlock(filmsBlockComponent, films);
addHandlerToFilmCards();
