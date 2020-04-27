import Abstract from "../abstract";

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

const FilmInfo = {
  director: `Director`,
  writers: `Writers`,
  actors: `Actors`,
  releaseDate: `Release Date`,
  duration: `Runtime`,
  country: `Country`,
};

export default class FilmDetails extends Abstract {
  constructor(film) {
    super();
    this._film = film;
  }

  setCloseButtonClickListener(cb) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, cb);
  }

  setWatchlistButtonClickListener(listener) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, listener);
  }

  setWatchedButtonClickListener(listener) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, listener);
  }

  setFavoriteButtonClickListener(listener) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, listener);
  }

  getTemplate() {
    const {name, poster, description, comments, rating, age} = this._film;
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
                        ${poster}
                    " alt="">
                    <p class="film-details__age">
                        ${age}
                    </p>
                  </div>

                  <div class="film-details__info">
                    <div class="film-details__info-head">
                      <div class="film-details__title-wrap">
                        <h3 class="film-details__title">
                            ${name}
                        </h3>
                        <p class="film-details__title-original">Original:
                            ${name}
                        </p>
                      </div>

                      <div class="film-details__rating">
                        <p class="film-details__total-rating">
                            ${rating}
                        </p>
                      </div>
                    </div>

                    <table class="film-details__table">
                        ${this._getInfo()}
                        ${this._getGenre()}
                    </table>

                    <p class="film-details__film-description">
                        ${description.join(`\n`)}
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
                        ${comments.length}
                    </span>
                  </h3>

                   <ul class="film-details__comments-list">
                       ${this._getComments()}
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

  _renderInfo(value, name) {
    return (`
         <tr class="film-details__row">
            <td class="film-details__term">
               ${name}
            </td>
            <td class="film-details__cell">
               ${this._film[value]}
            </td>
         </tr>
      `).trim();
  }

  _renderGenre(genre) {
    return (
      `<span class="film-details__genre">
            ${genre}
       </span>`
    ).trim();
  }

  _renderGenres() {
    return this._film.genres.map((genre) => this._renderGenre(genre)).join(`\n`);
  }

  _renderButtonControl(name, id) {
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

  _renderComment(emotion, author, date, message) {
    return (
      `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
                <p class="film-details__comment-text">${message}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${date}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
            </div>
         </li>`
    ).trim();
  }

  _renderEmoji(name) {
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

  _getInfo() {
    return Object.entries(FilmInfo).map(([value, name]) => this._renderInfo(value, name)).join(`\n`);
  }

  _getGenre() {
    return `<tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">${this._renderGenres()}
              </td>
            </tr>`;
  }

  _getButtonsControl() {
    return FILM_DETAILS_BUTTONS.map(({name, id}) => this._renderButtonControl(name, id)).join(`\n`);
  }

  _getComments() {
    return this._film.comments.map(({emotion, author, date, message}) => this._renderComment(emotion, author, date, message)).join(`\n`);
  }

  _getEmoji() {
    return EMOJI_NAMES.map((name) => this._renderEmoji(name)).join(`\n`);
  }
}
