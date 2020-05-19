import AbstractSmartComponent from "../../abstract-smart-component";
import FilmDetailsGenre from "./film-details-genre";
import FilmDetailsComments from "./film-details-comments";
import {formatFilmDuration} from "../../../util/common";
import moment from "moment";
import {Key} from "../../../util/const";

const COUNT_GENRES = 1;

class Observable {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(subscriber) {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers.delete(subscriber);
  }

  notify(changes) {
    this.subscribers.forEach((subscriber) => subscriber(changes));
  }
}

const FILM_DETAILS_BUTTONS = [
  {name: `Add to watchlist`, id: `watchlist`},
  {name: `Already watched`, id: `watched`},
  {name: `Add to favorites`, id: `favorite`},
];

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film, api) {
    super();
    this._id = film.id;
    this._name = film.name;
    this._nameOriginal = film.nameOriginal;
    this._poster = film.poster;
    this._description = film.description;
    this._comments = film.comments;
    this._genres = film.genres;
    this._rating = film.rating;
    this._age = film.age;
    this._director = film.director;
    this._writers = film.writers;
    this._actors = film.actors;
    this._releaseDate = film.releaseDate;
    this._duration = film.duration;
    this._country = film.country;
    this._isWatchlist = film.isWatchlist;
    this._isWatched = film.isWatched;
    this._isFavorite = film.isFavorite;

    this._deleteButtonListener = null;
    this._setCommentListener = null;
    this._closeFilmDetailsPopup = null;
    this._commentsComponent = null;

    this.setEmojiClickListener();

    this._api = api;
    this._getComments();

    this.commentsChanges = new Observable();
    this.watchListChanges = new Observable();
    this.watchedChanges = new Observable();
    this.favoritesChanges = new Observable();
  }

  getTemplate() {
    const watchlistButton = this._getButtonControlMarkup(FILM_DETAILS_BUTTONS[0].name, FILM_DETAILS_BUTTONS[0].id, this._isWatchlist);
    const watchedButton = this._getButtonControlMarkup(FILM_DETAILS_BUTTONS[1].name, FILM_DETAILS_BUTTONS[1].id, this._isWatched);
    const favoriteButton = this._getButtonControlMarkup(FILM_DETAILS_BUTTONS[2].name, FILM_DETAILS_BUTTONS[2].id, this._isFavorite);

    const genresMarkup = this._genres
      .map((genre) => new FilmDetailsGenre(genre).getTemplate())
      .join(`\n`);

    const commentsMarkup = new FilmDetailsComments(this._comments).getTemplate();

    return (
      `<section class="film-details">
            <form class="film-details__inner" action="" method="get">
              <div class="form-details__top-container">
                <div class="film-details__close">
                  <button class="film-details__close-btn" type="button">close</button>
                </div>
                <div class="film-details__info-wrap">
                  <div class="film-details__poster">
                    <img class="film-details__poster-img" src="
                        ${this._poster}
                    " alt="">
                    <p class="film-details__age">
                        ${this._age}+
                    </p>
                  </div>

                  <div class="film-details__info">
                    <div class="film-details__info-head">
                      <div class="film-details__title-wrap">
                        <h3 class="film-details__title">
                            ${this._name}
                        </h3>
                        <p class="film-details__title-original">Original:
                            ${this._nameOriginal}
                        </p>
                      </div>

                      <div class="film-details__rating">
                        <p class="film-details__total-rating">
                            ${this._rating}
                        </p>
                      </div>
                    </div>

                    <table class="film-details__table">
                        <tr class="film-details__row">
                            <td class="film-details__term">Director</td>
                            <td class="film-details__cell">${this._director}</td>
                        </tr>
                        <tr class="film-details__row">
                            <td class="film-details__term">Writers</td>
                            <td class="film-details__cell">${this._writers.join(`, `)}</td>
                        </tr>
                        <tr class="film-details__row">
                            <td class="film-details__term">Actors</td>
                            <td class="film-details__cell">${this._actors.join(`, `)}</td>
                        </tr>
                        <tr class="film-details__row">
                            <td class="film-details__term">Release Date</td>
                            <td class="film-details__cell">${this._formatDate(this._releaseDate)}</td>
                        </tr>
                        <tr class="film-details__row">
                            <td class="film-details__term">Runtime</td>
                            <td class="film-details__cell">${formatFilmDuration(this._duration)}</td>
                        </tr>
                        <tr class="film-details__row">
                            <td class="film-details__term">Country</td>
                            <td class="film-details__cell">${this._country}</td>
                        </tr>
                        <tr class="film-details__row">
                            <td class="film-details__term">${this._getTitleGenre(this._genres)}</td>
                            <td class="film-details__cell">${genresMarkup}</td>
                        </tr>
                    </table>

                    <p class="film-details__film-description">
                        ${this._description}
                    </p>
                  </div>
                </div>

                <section class="film-details__controls">
                    ${watchlistButton}
                    ${watchedButton}
                    ${favoriteButton}
                </section>
              </div>
              ${commentsMarkup}
            </form>
         </section>`
    );
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setWatchlistPopupBtnClickListener();
    this.setWatchedPopupBtnClickListener();
    this.setFavoritePopupBtnClickListener();
    this.setCloseButtonClickListener();
    this.setCloseEscListener();
    this.setEmojiClickListener();
    this.setDeleteButtonClickListener(this._deleteButtonListener);
    this.setAddCommentListener(this._setCommentListener);
  }

  setWatchlistPopupBtnClickListener() {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        this._toggleWatchList();
      });
  }

  setWatchedPopupBtnClickListener() {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        this._toggleWatched();
      });
  }

  setFavoritePopupBtnClickListener() {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        this._toggleFavorites();
      });
  }

  setCloseButtonClickListener() {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        this.resetAddCommentForm();
        this.getElement().remove();
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      });
  }

  setCloseEscListener() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  setDeleteButtonClickListener(listener) {
    const deleteCommentButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    if (deleteCommentButtons) {
      Array.from(deleteCommentButtons)
        .forEach((btn) => {
          btn.addEventListener(`click`, listener);
        });
    }

    this._deleteButtonListener = listener;
  }

  setEmojiClickListener(listener) {
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, listener);
  }

  collectComment() {
    const textComment = this._element.querySelector(`.film-details__comment-input`);
    const emojiElement = this._element.querySelector(`.film-details__add-emoji-label`).firstElementChild;

    const message = textComment.value;
    const emotion = emojiElement ? emojiElement.attributes[0].value : ``;

    if (!emotion || !message) {
      return null;
    }

    const date = new Date();
    const id = String(new Date() + Math.random());
    const author = `Неопознаный энот`;

    return {message, emotion, date, id, author};
  }

  resetAddCommentForm() {
    const textComment = this._element.querySelector(`.film-details__comment-input`);
    textComment.value = ``;
    const emojiElement = this._element.querySelector(`.film-details__add-emoji-label`).firstElementChild;

    if (emojiElement) {
      emojiElement.remove();
    }
  }

  setAddCommentListener(listener) {
    const textComment = this.getElement().querySelector(`.film-details__comment-input`);
    textComment.addEventListener(`keydown`, listener);
    this._setCommentListener = listener;
  }

  _getButtonControlMarkup(name, id, isActive) {
    return (
      `<input type="checkbox"
              class="film-details__control-input visually-hidden"
              id="${id}"
              name="${id}"
              ${isActive ? `checked` : ``}
       >
       <label for="${id}"
              class="film-details__control-label film-details__control-label--${id}">
              ${name}
       </label>`
    ).trim();
  }

  _getComments() {
    this._api
      .getComments(this._id)
      .then((comments) => {
        this._comments = comments;
        this.rerender();
      });
  }

  _getTitleGenre(genres) {
    return genres.length > COUNT_GENRES ? `Genres` : `Genre`;
  }

  _toggleWatchList() {
    this._isWatchlist = !this._isWatchlist;
    this.watchListChanges.notify(this._isWatchlist);
    this.rerender();
  }

  _toggleWatched() {
    this._isWatched = !this._isWatched;
    this.watchedChanges.notify(this._isWatched);
    this.rerender();
  }

  _toggleFavorites() {
    this._isFavorite = !this._isFavorite;
    this.favoritesChanges.notify(this._isFavorite);
    this.rerender();
  }

  _formatDate(date) {
    return moment(date).format(`DD MMMM YYYY`);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === Key.ESCAPE;

    if (isEscKey) {
      this.querySelector(`.film-details`).remove();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

}
