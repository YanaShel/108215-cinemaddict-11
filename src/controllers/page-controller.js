import Sort from "../components/sort/sort";
import FilmList from "../components/films/main-list/film-list";
import NoFilm from "../components/films/no-films";
import ShowMoreButton from "../components/films/main-list/show-more-button";
import TopRatedList from "../components/films/extra-lists/top-rated-list";
import MostCommentedList from "../components/films/extra-lists/most-commented-list";
import FilmsBlock from "../components/films/films-block";
import MovieController, {State as FilmState} from "./movie-controller";
import {remove, render} from "../util/dom-util";
import {SortType} from "../util/const";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export default class PageController {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._api = api;

    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._sort = new Sort();
    this._filmsBlock = new FilmsBlock();
    this._filmsList = new FilmList();
    this._noFilm = new NoFilm();
    this._showMoreButton = new ShowMoreButton();
    this._topRatedList = null;
    this._mostCommentedList = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._sort.setSortTypeChangeListener(this._onSortTypeChange);
    this._filmsModel.addFilterChangeListener(this._onFilterChange);
  }

  render() {
    const films = this._filmsModel.films;
    const filmBlock = this._filmsBlock.getElement();
    const filmsList = this._filmsList.getElement();

    render(this._container, this._sort);
    render(this._container, this._filmsBlock);
    render(filmBlock, this._filmsList);

    if (films.length === 0) {
      render(filmsList, this._noFilm);
      return;
    }

    this._renderFilms(films.slice(0, this._showingFilmsCount));

    this._renderShowMoreButton();

    this._renderTopRatedFilms();

    this._renderMostCommentedFilms();
  }

  hide() {
    this._filmsBlock.hide();
    this._sort.hide();
  }

  show() {
    this._filmsBlock.show();
    this._sort.show();
  }

  renderFilms(filmListElement, films, onDataChange, onViewChange) {
    return films.map((film) => {
      const movie = new MovieController(filmListElement, onDataChange, onViewChange);
      movie.render(film, FilmState.DEFAULT);

      return movie;
    });
  }

  _renderFilms(films) {
    const newFilms = this.renderFilms(this._filmsList.getElement(), films, this._onDataChange, this._onViewChange, this._api);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmsCount = this._showedFilmControllers.length;
  }

  _renderShowMoreButton() {
    remove(this._showMoreButton);

    if (this._showingFilmsCount >= this._filmsModel.films.length) {
      return;
    }

    render(this._filmsList.getElement(), this._showMoreButton);

    this._showMoreButton.setClickListener(this._onShowMoreButtonClick);
  }

  _getMostCommentedFilms(films) {
    return films.slice()
      .sort((firstFilm, secondFilm) => secondFilm.comments.length - firstFilm.comments.length)
      .slice(0, 2);
  }

  _getTopRatedFilms(films) {
    return films.slice()
      .sort((firstFilm, secondFilm) => secondFilm.rating - firstFilm.rating)
      .slice(0, 2);
  }

  _renderTopRatedFilms() {
    if (this._topRatedList) {
      remove(this._topRatedList);
    }

    const films = this._filmsModel.films;
    this._topRatedList = new TopRatedList(films);
    render(this._filmsBlock.getElement(), this._topRatedList);
    this.renderFilms(this._topRatedList.getElement(), this._getTopRatedFilms(films), this._onDataChange, this._onViewChange, this._api);
  }

  _renderMostCommentedFilms() {
    if (this._mostCommentedList) {
      remove(this._mostCommentedList);
    }

    const films = this._filmsModel.films;
    this._mostCommentedList = new MostCommentedList();
    render(this._filmsBlock.getElement(), this._mostCommentedList);
    this.renderFilms(this._mostCommentedList.getElement(), this._getMostCommentedFilms(films), this._onDataChange, this._onViewChange, this._api);
  }

  _rerenderFilmsExtra() {
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _getSortedFilms(films, from, to, sortType = `default`) {
    let sortedFilms = [];
    const showingFilms = films.slice();

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = showingFilms.sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.RATING:
        sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedFilms = showingFilms;
        break;
    }

    return sortedFilms.slice(from, to);
  }

  _updateFilms(count) {
    this._removeFilms();
    const sortedFilms = this._getSortedFilms(this._filmsModel.films, 0, count, this._sort.getSortType());
    this._renderFilms(sortedFilms);
    this._renderShowMoreButton();
    this._rerenderFilmsExtra();
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _onDataChange(movieController, oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
      .then((filmModel) => {
        const isSuccess = this._filmsModel.updateFilm(oldData.id, filmModel);

        if (isSuccess) {
          movieController.render(filmModel);
          this._updateFilms(this._showingFilmsCount);
        }
      });
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    const sortedFilms = this._getSortedFilms(this._filmsModel.films, 0, this._showingFilmsCount, sortType);
    this._removeFilms();
    this._renderFilms(sortedFilms);

    this._renderShowMoreButton();
  }

  _onShowMoreButtonClick() {
    const prevFilmsCount = this._showingFilmsCount;
    const films = this._filmsModel.films;

    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    const sortedFilms = this._getSortedFilms(films, prevFilmsCount, this._showingFilmsCount, this._sort.getSortType());
    this._renderFilms(sortedFilms);

    if (this._showingFilmsCount >= films.length) {
      remove(this._showMoreButton);
    }
  }

  _onFilterChange() {
    this._sort.resetSortToDefault();
    this._updateFilms(SHOWING_FILMS_COUNT_ON_START);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((filmController) => filmController.setDefaultView());
  }
}
