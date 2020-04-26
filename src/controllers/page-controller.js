import Sort from "../components/sort/sort";
import FilmList from "../components/film/film-list";
import NoFilm from "../components/film/no-films";
import ShowMoreButton from "../components/film/show-more-button";
import TopRatedList from "../components/film/extra-lists/top-rated-list";
import MostCommentedList from "../components/film/extra-lists/most-commented-list";
import {remove, render} from "../util/dom-util";
import FilmsBlock from "../components/film/films-block";
import FilmCard from "../components/film/film-card";
import FilmDetails from "../components/film-popup/film-details";
import {Key} from "../util/util";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const bodyElement = document.querySelector(`body`);

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sort = new Sort();
    this._filmsBlock = new FilmsBlock();
    this._filmsList = new FilmList();
    this._showMoreButton = new ShowMoreButton();
  }

  renderFilms(films) {
    films.forEach((film) => {
      const filmCard = new FilmCard(film);
      filmCard.setCardClickListener(this.onFilmCardClick);
      render(this._filmsList.getElement().querySelector(`.films-list__container`), filmCard);
    });
  }

  onFilmCardClick(film) {
    const filmDetails = new FilmDetails(film);
    render(bodyElement, filmDetails);

    filmDetails.setCloseButtonClickListener(() => {
      filmDetails.getElement().remove();
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
  }

  getSortedFilms(films, sortType, from, to) {
    let sortedFilms = [];
    const showingFilms = films.slice();

    switch (sortType) {
      case `date`:
        sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
        break;
      case `rating`:
        sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
        break;
      case `default`:
        sortedFilms = showingFilms;
        break;
    }

    return sortedFilms.slice(from, to);
  }

  renderList(films) {
    const filmBlock = this._filmsBlock.getElement();

    render(this._container, this._sort);
    render(this._container, this._filmsBlock);
    render(filmBlock, this._filmsList);

    if (films.length === 0) {
      render(this._filmsList.getElement(), new NoFilm());
      return;
    }

    this.renderFilms(films.slice(0, SHOWING_FILMS_COUNT_ON_START));

    render(this._filmsList.getElement(), this._showMoreButton);

    this._showMoreButton.setClickListener(() => {
      let numberFilmCards = this._filmsList.getFilmCardCount();
      if (SHOWING_FILMS_COUNT_BY_BUTTON + numberFilmCards >= films.length) {
        this.renderFilms(films.slice(numberFilmCards, films.length));
        remove(this._showMoreButton);
      } else {
        this.renderFilms(films.slice(numberFilmCards, SHOWING_FILMS_COUNT_BY_BUTTON + numberFilmCards));
      }
    });

    this._topRatedList = new TopRatedList(films);
    this._topRatedList.setClickListener(this.onFilmCardClick);
    render(filmBlock, this._topRatedList);

    this._mostCommentedList = new MostCommentedList(films);
    this._mostCommentedList.setClickListener(this.onFilmCardClick);
    render(filmBlock, this._mostCommentedList);

    this._sort.setSortTypeChangeListener((sortType) => {
      const sortedFilms = this.getSortedFilms(films, sortType, 0, SHOWING_FILMS_COUNT_BY_BUTTON);

      this._filmsList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

      this.renderFilms(sortedFilms);

    });

  }
}
