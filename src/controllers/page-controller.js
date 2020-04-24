import FilmList from "../components/film/film-list";
import NoFilm from "../components/film/no-films";
import ShowMoreButton from "../components/film/show-more-button";
import TopRatedList from "../components/film/extra-lists/top-rated-list";
import MostCommentedList from "../components/film/extra-lists/most-commented-list";
import {remove, render} from "../util/dom-util";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmsList = new FilmList();
    this._showMoreButton = new ShowMoreButton();
    this._topRatedList = new TopRatedList();
    this._mostCommentedList = new MostCommentedList();
  }

  renderList(films) {
    const container = this._container.getElement();
    render(container, this._filmsList);

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

    render(container, this._topRatedList);
    render(container, this._mostCommentedList);

    this._topRatedList.renderFilms(films);
    this._mostCommentedList.renderFilms(films);
  }
}
