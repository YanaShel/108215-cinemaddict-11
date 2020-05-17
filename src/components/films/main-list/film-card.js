import AbstractComponent from "../../abstract-component";
import {formatFilmDuration} from "../../../util/common";
import moment from "moment";

const FILM_CARD_BUTTONS = [
  {name: `Add to watchlist`, className: `add-to-watchlist`},
  {name: `Mark as watched`, className: `mark-as-watched`},
  {name: `Mark as favorite`, className: `favorite`},
];

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this._name = film.name;
    this._poster = film.poster;
    this._description = film.description;
    this._comments = film.comments;
    this._releaseDate = film.releaseDate;
    this._duration = film.duration;
    this._genres = film.genres;
    this._rating = film.rating;

    this.setCardClickListener = this.setCardClickListener.bind(this);
  }

  getTemplate() {
    const watchlistButton = this._createButtonMarkup(FILM_CARD_BUTTONS[0].name, FILM_CARD_BUTTONS[0].className, this._film.isWatchlist);
    const watchedButton = this._createButtonMarkup(FILM_CARD_BUTTONS[1].name, FILM_CARD_BUTTONS[1].className, this._film.isWatched);
    const favoriteButton = this._createButtonMarkup(FILM_CARD_BUTTONS[2].name, FILM_CARD_BUTTONS[2].className, this._film.isFavorite);
    return (
      `<article class="film-card">
            <h3 class="film-card__title">${this._name}</h3>
            <p class="film-card__rating">${this._rating}</p>
            <p class="film-card__info">
                <span class="film-card__year">${this._formatYear(this._releaseDate)}</span>
                <span class="film-card__duration">${formatFilmDuration(this._duration)}</span>
                <span class="film-card__genre">${this._genres.length > 0 ? this._genres[0] : ``}</span>
            </p>
            <img src="${this._poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${this._description}</p>
            <a class="film-card__comments">${this._comments.length} comments</a>
            <form class="film-card__controls">
                ${watchlistButton}
                ${watchedButton}
                ${favoriteButton}
              </form>
            </article>`
    ).trim();
  }

  setCardClickListener(cb) {
    this.getElement().addEventListener(`click`, () => cb(this._film));
  }

  setWatchlistButtonClickListener(listener) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, listener);
  }

  setWatchedButtonClickListener(listener) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, listener);
  }

  setFavoriteButtonClickListener(listener) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, listener);
  }

  _formatYear(date) {
    return moment(date).get(`year`);
  }

  _createButtonMarkup(name, className, isActive) {
    return (`
         <button class="film-card__controls-item button film-card__controls-item--${className} ${isActive ? `film-card__controls-item--active` : ``}">
             ${name}
         </button>
      `).trim();
  }
}
