import AbstractSmartComponent from "../../abstract-smart-component";
import FilmDetailsGenre from "./film-details-genre";
import FilmDetailsButton from "./film-details-button";
import FilmDetailsComments from "./film-details-comments";
import {formatFilmDuration} from "../../../util/date";
import moment from "moment";

const FILM_DETAILS_BUTTONS = [
  {name: `Add to watchlist`, id: `watchlist`},
  {name: `Already watched`, id: `watched`},
  {name: `Add to favorites`, id: `favorite`},
];

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
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

    this._deleteButtonListener = null;
    this._setCommentListener = null;
    this._closePopupListener = null;
    this.setWatchlistPopupBtnClickListener();
    this.setWatchedPopupBtnClickListener();
    this.setFavoritePopupBtnClickListener();
    this.setEmojiClickListener();
  }

  getTemplate() {
    const genresMarkup = this._genres
      .map((genre) => new FilmDetailsGenre(genre).getTemplate())
      .join(`\n`);

    const buttonsMarkUp = FILM_DETAILS_BUTTONS
      .map((button) => new FilmDetailsButton(button).getTemplate())
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
                            <td class="film-details__term">Genres</td>
                            <td class="film-details__cell">${genresMarkup}</td>
                        </tr>
                    </table>

                    <p class="film-details__film-description">
                        ${this._description}
                    </p>
                  </div>
                </div>

                <section class="film-details__controls">
                    ${buttonsMarkUp}
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
    this.setCloseButtonClickListener(this._closePopupListener);
    this.setWatchlistPopupBtnClickListener();
    this.setWatchedPopupBtnClickListener();
    this.setFavoritePopupBtnClickListener();
    this.setEmojiClickListener();
    this.setDeleteButtonClickListener(this._deleteButtonListener);
    this.setAddCommentListener(this._setCommentListener);
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

  setCloseButtonClickListener(listener) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, listener);
    this._closePopupListener = listener;
  }

  setWatchlistPopupBtnClickListener(listener) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, listener);
  }

  setWatchedPopupBtnClickListener(listener) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, listener);
  }

  setFavoritePopupBtnClickListener(listener) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, listener);
  }

  setEmojiClickListener(listener) {
    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, listener);
  }

  _formatDate(date) {
    return moment(date).format(`DD MMMM YYYY`);
  }
}
