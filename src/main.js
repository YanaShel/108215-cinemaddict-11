import UserProfile from "./components/profile/user-profile";
import MenuContainer from "./components/menu/menu-container";
import MenuItems from "./components/menu/menu-items";
import MenuItem from "./components/menu/menu-item";
import MenuFilter from "./components/menu/menu-filter";
import SortContainer from "./components/sort/sort-container";
import Sort from "./components/sort/sort";
import FilmsContainer from "./components/film/films-container";
import FilmsList from "./components/film/films-list";
import NoFilm from "./components/film/no-film";
import FilmCard from "./components/film/film-card";
import FilmCardButtonContainer from "./components/film/film-card-button-container";
import FilmCardButton from "./components/film/film-card-button";
import ShowMoreButton from "./components/film/show-more-button";
import FilmDetails from "./components/film-popup/film-details";
import MainInfo from "./components/film-popup/info/main-info";
import GenreInfo from "./components/film-popup/info/genre-info";
import FilmDetailsButton from "./components/film-popup/film-details-button";
import Emoji from "./components/film-popup/emoji";
import ExtraListsContainer from "./components/film/extra-lists-container";
import Comment from "./components/film-popup/comment";
import {generateFilms} from "./mock/film";
import {generationComments} from "./mock/comments";
import {render} from "./util/dom-util";
import {Key} from "./util/util";

const FILM_COUNT = 18;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const EXTRA_LISTS = [
  `Top rated`,
  `Most commented`,
];

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

const FILM_DETAILS_BUTTONS = [
  {name: `Add to watchlist`, id: `watchlist`},
  {name: `Already watched`, id: `watched`},
  {name: `Add to favorites`, id: `favorite`},
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
  const siteMenuContainerComponent = new MenuContainer();
  const siteMenuItemsComponent = new MenuItems();

  render(siteMainElement, siteMenuContainerComponent.getElement());
  render(siteMenuContainerComponent.getElement(), siteMenuItemsComponent.getElement());
  render(siteMenuItemsComponent.getElement(), new MenuItem(SITE_MENU_ITEMS[0]).getElement());
  FILTER_NAMES.forEach((name) => {
    const filterCount = Math.floor(Math.random() * 10);
    render(siteMenuItemsComponent.getElement(), new MenuFilter(name, filterCount).getElement());
  });
  render(siteMenuContainerComponent.getElement(), new MenuItem(SITE_MENU_ITEMS[1]).getElement());
};

const renderSort = () => {
  const sortContainerComponent = new SortContainer();
  render(siteMainElement, sortContainerComponent.getElement());
  SORT_ITEMS.forEach((item, i) => {
    render(sortContainerComponent.getElement(), new Sort(item, i === 0).getElement());
  });
};

const renderFilm = (container, film) => {
  const filmCardComponent = new FilmCard(film);
  const buttonContainerComponent = new FilmCardButtonContainer();

  render(container, filmCardComponent.getElement());
  render(filmCardComponent.getElement(), buttonContainerComponent.getElement());

  FILM_CARD_BUTTONS.forEach((button) => {
    render(buttonContainerComponent.getElement(), new FilmCardButton(button).getElement());
  });
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

const renderFilmInfo = (filmDetailsPopup, film) => {
  const filmInfoTable = filmDetailsPopup.getElement().querySelector(`.film-details__table`);
  render(filmInfoTable, new MainInfo(FilmInfo.DIRECTOR, film.director).getElement());
  render(filmInfoTable, new MainInfo(FilmInfo.WRITERS, film.writers).getElement());
  render(filmInfoTable, new MainInfo(FilmInfo.ACTORS, film.actors).getElement());
  render(filmInfoTable, new MainInfo(FilmInfo.RELEASE_DATE, film.releaseDate).getElement());
  render(filmInfoTable, new MainInfo(FilmInfo.DURATION, film.duration).getElement());
  render(filmInfoTable, new MainInfo(FilmInfo.COUNTRY, film.country).getElement());
  render(filmInfoTable, new GenreInfo(film.genres).getElement());
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
      const filmDetailsComponent = new FilmDetails(film);
      render(siteBodyElement, filmDetailsComponent.getElement());

      renderFilmInfo(filmDetailsComponent, film);

      const buttonContainer = filmDetailsComponent.getElement().querySelector(`.film-details__controls`);
      FILM_DETAILS_BUTTONS.forEach((button) => {
        render(buttonContainer, new FilmDetailsButton(button).getElement());
      });

      const commentsList = filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`);
      const comments = generationComments(film.comments);
      comments.forEach((comment) => {
        render(commentsList, new Comment(comment).getElement());
      });

      const emojiContainer = filmDetailsComponent.getElement().querySelector(`.film-details__emoji-list`);
      EMOJI_NAMES.forEach((name) => {
        render(emojiContainer, new Emoji(name).getElement());
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
const filmsBlockComponent = new FilmsContainer();

render(siteHeaderElement, new UserProfile().getElement());
renderSiteMenu();
renderSort();
render(siteMainElement, filmsBlockComponent.getElement());
renderFilmsBlock(filmsBlockComponent, films);
addHandlerToFilmCards();
