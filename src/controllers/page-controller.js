import Sort from "../components/sort/sort";
import FilmList from "../components/film/film-list";
import NoFilm from "../components/film/no-films";
import ShowMoreButton from "../components/film/show-more-button";
import TopRatedList from "../components/film/extra-lists/top-rated-list";
import MostCommentedList from "../components/film/extra-lists/most-commented-list";
import {remove, render} from "../util/dom-util";
import FilmsBlock from "../components/film/films-block";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const getSortedFilms = (films, sortType, from, to) => {
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
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sort = new Sort();
    this._filmsBlock = new FilmsBlock();
    this._filmsList = new FilmList();
    this._showMoreButton = new ShowMoreButton();
    this._topRatedList = new TopRatedList();
    this._mostCommentedList = new MostCommentedList();
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

    this._filmsList.renderFilms(films.slice(0, SHOWING_FILMS_COUNT_ON_START));

    render(this._filmsList.getElement(), this._showMoreButton);

    this._showMoreButton.setClickListener(() => {
      let numberFilmCards = this._filmsList.getFilmCardCount();
      if (SHOWING_FILMS_COUNT_BY_BUTTON + numberFilmCards >= films.length) {
        this._filmsList.renderFilms(films.slice(numberFilmCards, films.length));
        remove(this._showMoreButton);
      } else {
        this._filmsList.renderFilms(films.slice(numberFilmCards, SHOWING_FILMS_COUNT_BY_BUTTON + numberFilmCards));
      }
    });

    render(filmBlock, this._topRatedList);
    render(filmBlock, this._mostCommentedList);

    this._topRatedList.renderFilms(films);
    this._mostCommentedList.renderFilms(films);

    this._sort.setSortTypeChangeHandler((sortType) => {
      const showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;
      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      this._filmsList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

      this._filmsList.renderFilms(sortedFilms);

    });

  }
}
