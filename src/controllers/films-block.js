import FilmList from "../components/film/film-list";
import NoFilm from "../components/film/no-films";
import FilmCard from "../components/film/film-card";
import ShowMoreButton from "../components/film/show-more-button";
import FilmDetails from "../components/film-popup/film-details";
import TopRatedList from "../components/film/extra-lists/top-rated-list";
import MostCommentedList from "../components/film/extra-lists/most-commented-list";
import {remove, render} from "../util/dom-util";
import {Key} from "../util/util";

const FILM_LIST_EXTRA_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const bodyElement = document.querySelector(`body`);

const renderFilm = (container, film) => {
  const filmCard = new FilmCard(film);
  filmCard.setCardClickListener(onFilmCardClick);
  render(container, filmCard);
};

const closeFilmDetailsPopup = (popup, btnClose) => {
  popup.remove();
  btnClose.removeEventListener(`click`, closeFilmDetailsPopup);
};

const onFilmCardClick = (film) => {
  const filmDetails = new FilmDetails(film);
  const buttonCloseFilmDetails = filmDetails.getElement().querySelector(`.film-details__close-btn`);

  render(bodyElement, filmDetails);
  filmDetails.setCloseButtonClickListener(() => {
    closeFilmDetailsPopup(filmDetails.getElement(), buttonCloseFilmDetails);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === Key.ESCAPE;

    if (isEscKey) {
      filmDetails.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  document.addEventListener(`keydown`, onEscKeyDown);
};

export default class FilmsBlockController {
  constructor(container) {
    this._container = container;

    this._filmsList = new FilmList();
    this._showMoreButton = new ShowMoreButton();
  }

  renderList(films) {
    const container = this._container.getElement();
    render(container, this._filmsList);

    if (films.length === 0) {
      render(this._filmsList.getElement(), new NoFilm());
      return;
    }

    const filmsContainer = this._filmsList.getElement().querySelector(`.films-list__container`);

    let numberFilmCards = 0;
    numberFilmCards = this._filmsList.getFilmCardCount();
    for (let i = numberFilmCards; i < SHOWING_FILMS_COUNT_ON_START; i++) {
      renderFilm(filmsContainer, films[i]);
    }

    render(this._filmsList.getElement(), this._showMoreButton);

    this._showMoreButton.setClickListener(() => {
      numberFilmCards = this._filmsList.getFilmCardCount();
      if (SHOWING_FILMS_COUNT_BY_BUTTON + numberFilmCards >= films.length) {
        for (let i = numberFilmCards; i < films.length; i++) {
          renderFilm(filmsContainer, films[i]);
          remove(this._showMoreButton);
        }
      } else {
        for (let i = numberFilmCards; i < SHOWING_FILMS_COUNT_BY_BUTTON + numberFilmCards; i++) {
          renderFilm(filmsContainer, films[i]);
        }
      }
    });
  }
  renderMostCommentedFilms(films) {
    if (films.length > 0) {
      const container = this._container.getElement();
      const topRatedList = new TopRatedList();
      const filmsContainer = topRatedList.getElement().querySelector(`.films-list__container`);
      const sortFilms = topRatedList.getRatedFilms(films);

      render(container, topRatedList);
      for (let i = 0; i < FILM_LIST_EXTRA_COUNT; i++) {
        const film = new FilmCard(sortFilms[i]);
        film.setCardClickListener(onFilmCardClick);
        render(filmsContainer, film);
      }
    }
  }
  renderTopRatedFilms(films) {
    if (films.length > 0) {
      const container = this._container.getElement();
      const mostCommentedList = new MostCommentedList();
      const filmsContainer = mostCommentedList.getElement().querySelector(`.films-list__container`);
      const sortFilms = mostCommentedList.getCommentedFilms(films);

      render(container, mostCommentedList);
      for (let i = 0; i < FILM_LIST_EXTRA_COUNT; i++) {
        const film = new FilmCard(sortFilms[i]);
        film.setCardClickListener(onFilmCardClick);
        render(filmsContainer, film);
      }
    }
  }
}
