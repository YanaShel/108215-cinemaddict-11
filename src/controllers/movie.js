import FilmCard from "../components/film/film-card";
import FilmDetails from "../components/film-popup/film-details";
import {render, replace} from "../util/dom-util";
import {Key} from "../util/util";

export default class Movie {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._bodyElement = document.querySelector(`body`);
    this._fimCard = null;
    this._filmDetails = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
  }

  render(film) {
    const oldFilmCard = this._fimCard;
    const oldFilmDetails = this._filmDetails;

    this._fimCard = new FilmCard(film);
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

    this._filmDetails = new FilmDetails(film);

    if (oldFilmCard && oldFilmDetails) {
      replace(this._fimCard, oldFilmCard);
      replace(this._filmDetails, oldFilmDetails);
    } else {
      render(this._container.querySelector(`.films-list__container`), this._fimCard);
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === Key.ESCAPE;

    if (isEscKey) {
      this._filmDetails.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _closeFilmDetailsPopup() {
    this._filmDetails.getElement().remove();
  }

  _onFilmCardClick() {
    this._onViewChange();
    render(this._bodyElement, this._filmDetails);
    const buttonCloseFilmDetails = this._filmDetails.getElement().querySelector(`.film-details__close-btn`);

    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._filmDetails.setCloseButtonClickListener(() => {
      this._closeFilmDetailsPopup(this._filmDetails.getElement(), buttonCloseFilmDetails);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
  }

  _setDefaultView() {
    this._closeFilmDetailsPopup();
  }
}
