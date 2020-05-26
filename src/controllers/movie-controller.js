import FilmCard from "../components/films/main-list/film-card";
import FilmDetails from "../components/films/film-details/film-details";
import {render, replace, remove} from "../util/dom-util";
import {Key} from "../util/const";


export const State = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._bodyElement = document.querySelector(`body`);

    this._fimCard = null;
    this._filmDetails = null;

    this._state = State.DEFAULT;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._closeFilmDetailsPopup = this._closeFilmDetailsPopup.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._renderFilmCard(film);
    this._createFilmDetails(film);
  }

  setDefaultView() {
    if (this._state !== State.DEFAULT) {
      this._closeFilmDetailsPopup();
    }
  }

  destroy() {
    remove(this._fimCard);
    remove(this._filmDetails);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _renderFilmCard(film) {
    const oldFilmCard = this._fimCard;
    this._fimCard = new FilmCard(film);

    if (oldFilmCard) {
      replace(this._fimCard, oldFilmCard);
    } else {
      render(this._container.querySelector(`.films-list__container`), this._fimCard);
    }

    this._fimCard.setCardClickListener(this._onFilmCardClick);

    this._fimCard.setWatchlistButtonClickListener((evt) => {
      evt.stopPropagation();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist}));
    });

    this._fimCard.setWatchedButtonClickListener((evt) => {
      evt.stopPropagation();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched}));
    });

    this._fimCard.setFavoriteButtonClickListener((evt) => {
      evt.stopPropagation();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite}));
    });
  }

  _createFilmDetails(film) {
    this._filmDetails = new FilmDetails(film);

    this._filmDetails.watchListChanges.subscribe((inWatchlist) => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: inWatchlist}));
    });

    this._filmDetails.watchedChanges.subscribe((inWatched) => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: inWatched}));
    });

    this._filmDetails.favoritesChanges.subscribe((inFavorite) => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: inFavorite}));
    });

    this._filmDetails.commentsChanges.subscribe((comments) => {
      const filmItem = Object.assign({}, film, {comments});
      this._onDataChange(this, film, filmItem, true);
    });
  }

  _closeFilmDetailsPopup() {
    this._state = State.DEFAULT;
    this._filmDetails.resetAddCommentForm();
    this._filmDetails.getElement().remove();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === Key.ESCAPE;

    if (isEscKey) {
      this._filmDetails.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onFilmCardClick() {
    this._onViewChange();
    render(this._bodyElement, this._filmDetails);
    this._state = State.DETAILS;

    this._filmDetails.setCloseButtonClickListener();
    this._filmDetails.setCloseEscListener();
  }

}
