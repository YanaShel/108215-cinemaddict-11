import AbstractSmartComponent from "../../abstract-smart-component";
import FilmDetailsComment from "./film-details-comment";
import {formatFilmDuration, formatDate} from "../../../util/date";

const EMOJI_NAMES = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const FILM_DETAILS_BUTTONS = [
  {name: `Add to watchlist`, id: `watchlist`},
  {name: `Already watched`, id: `watched`},
  {name: `Add to favorites`, id: `favorite`},
];

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._name = film.name;
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

    this._closePopupListener = null;
    this.setWatchlistPopupBtnClickListener();
    this.setWatchedPopupBtnClickListener();
    this.setFavoritePopupBtnClickListener();
    this.setEmojiClickListener();
  }

  _getSortComments() {
    return this._comments.slice()
      .sort((a, b) => b.date - a.date);
  }

  getTemplate() {
    const commentsMarkup = this._getSortComments().map((comment) => new FilmDetailsComment(comment).getTemplate()).join(`\n`);

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
                        ${this._age}
                    </p>
                  </div>

                  <div class="film-details__info">
                    <div class="film-details__info-head">
                      <div class="film-details__title-wrap">
                        <h3 class="film-details__title">
                            ${this._name}
                        </h3>
                        <p class="film-details__title-original">Original:
                            ${this._name}
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
                            <td class="film-details__cell">${this._writers}</td>
                        </tr>
                        <tr class="film-details__row">
                            <td class="film-details__term">Actors</td>
                            <td class="film-details__cell">${this._actors}</td>
                        </tr>
                        <tr class="film-details__row">
                            <td class="film-details__term">Release Date</td>
                            <td class="film-details__cell">${formatDate(this._releaseDate)}</td>
                        </tr>
                        <tr class="film-details__row">
                            <td class="film-details__term">Runtime</td>
                            <td class="film-details__cell">${formatFilmDuration(this._duration)}</td>
                        </tr>
                        <tr class="film-details__row">
                            <td class="film-details__term">Country</td>
                            <td class="film-details__cell">${this._country}</td>
                        </tr>
                            ${this._createGenresMarkup()}
                    </table>

                    <p class="film-details__film-description">
                        ${this._description.join(`\n`)}
                    </p>
                  </div>
                </div>

                <section class="film-details__controls">
                    ${this._getButtonsControl()}
                </section>
              </div>

              <div class="form-details__bottom-container">
                <section class="film-details__comments-wrap">
                  <h3 class="film-details__comments-title">Comments
                    <span class="film-details__comments-count">
                        ${this._comments.length}
                    </span>
                  </h3>

                   <ul class="film-details__comments-list">
                       ${commentsMarkup}
                   </ul>

                  <div class="film-details__new-comment">
                    <div for="add-emoji" class="film-details__add-emoji-label"></div>

                    <label class="film-details__comment-label">
                      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                                name="comment"></textarea>
                    </label>

                    <div class="film-details__emoji-list">
                        ${this._getEmoji()}
                    </div>
                  </div>
                </section>
              </div>
            </form>
         </section>`
    );
  }

  recoveryListeners() {
    this.setCloseButtonClickListener(this._closePopupListener);
    this.setWatchlistPopupBtnClickListener();
    this.setWatchedPopupBtnClickListener();
    this.setFavoritePopupBtnClickListener();
    this.setEmojiClickListener();
  }

  rerender() {
    super.rerender();
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

  _createGenreMarkup(genre) {
    return (
      `<span class="film-details__genre">
            ${genre}
       </span>`
    ).trim();
  }
  _getGenres() {
    return this._genres.map((genre) => this._createGenreMarkup(genre)).join(`\n`);
  }
  _createGenresMarkup() {
    return `<tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">${this._getGenres()}
              </td>
            </tr>`;
  }

  _createButtonControlMarkup(name, id) {
    return (
      `<input type="checkbox"
              class="film-details__control-input visually-hidden"
              id="${id}"
              name="${id}">
       <label for="${id}"
              class="film-details__control-label film-details__control-label--${id}">
              ${name}
       </label>`
    ).trim();

  }
  _getButtonsControl() {
    return FILM_DETAILS_BUTTONS.map(({name, id}) => this._createButtonControlMarkup(name, id)).join(`\n`);
  }

  _createEmojiMarkup(name) {
    return (
      `<input class="film-details__emoji-item visually-hidden"
              name=" comment-emoji"
              type="radio"
              id="emoji-${name}"
              value="${name}">
       <label class="film-details__emoji-label"
              for="emoji-${name}">
              <img src="./images/emoji/${name}.png" width="30" height="30" alt="emoji">
       </label>`
    ).trim();
  }
  _getEmoji() {
    return EMOJI_NAMES.map((name) => this._createEmojiMarkup(name)).join(`\n`);
  }

}
