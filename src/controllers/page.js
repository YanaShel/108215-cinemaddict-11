import Sort from "../components/sort/sort";
import FilmList from "../components/film/film-list";
import NoFilm from "../components/film/no-films";
import ShowMoreButton from "../components/film/show-more-button";
import TopRatedList from "../components/film/extra-lists/top-rated-list";
import MostCommentedList from "../components/film/extra-lists/most-commented-list";
import FilmsBlock from "../components/film/films-block";
import Movie from "./movie";
import {remove, render} from "../util/dom-util";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export default class Page {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._sort = new Sort();
    this._filmsBlock = new FilmsBlock();
    this._filmsList = new FilmList();
    this._noFilmsComponent = new NoFilm();
    this._showMoreButton = new ShowMoreButton();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sort.setSortTypeChangeListener(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;
    const filmBlock = this._filmsBlock.getElement();
    const filmsList = this._filmsList.getElement();

    render(this._container, this._sort);
    render(this._container, this._filmsBlock);
    render(filmBlock, this._filmsList);

    if (films.length === 0) {
      render(filmsList, new NoFilm());
      return;
    }

    const newFilms = this._renderFilms(filmsList, films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderShowMoreButton();

    // todo где нужно передавать listener для topRatedList и mostCommentedList. В movie?
    this._topRatedList = new TopRatedList(films);
    this._topRatedList.setClickListener(this._onFilmCardClick);
    render(filmBlock, this._topRatedList);

    this._mostCommentedList = new MostCommentedList(films);
    this._mostCommentedList.setClickListener(this._onFilmCardClick);
    render(filmBlock, this._mostCommentedList);
  }

  _renderFilms(filmListElement, films, onDataChange, onViewChange) {
    return films.map((film) => {
      const movie = new Movie(filmListElement, onDataChange, onViewChange);
      movie.render(film);

      return movie;
    });
  }

  _renderShowMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    render(this._filmsList.getElement(), this._showMoreButton);

    this._showMoreButton.setClickListener(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const sortedFilms = this._getSortedFilms(this._films, this._sort.getSortType(), prevFilmsCount, this._showingFilmsCount);
      const newFilms = this._renderFilms(this._filmsList.getElement(), sortedFilms, this._onDataChange, this._onViewChange);

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButton);
      }
    });
  }

  _getSortedFilms(films, sortType, from, to) {
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

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    const sortedFilms = this._getSortedFilms(this._films, sortType, 0, this._showingFilmsCount);

    this._filmsList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

    const newFilms = this._renderFilms(this._filmsList.getElement(), sortedFilms, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = newFilms;

    this._renderShowMoreButton();
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it._setDefaultView());
  }
}
