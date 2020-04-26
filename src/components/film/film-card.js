import Abstract from "../abstract";

const FILM_CARD_BUTTONS = [
  {name: `Add to watchlist`, className: `add-to-watchlist`},
  {name: `Mark as watched`, className: `mark-as-watched`},
  {name: `Mark as favorite`, className: `favorite`},
];

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this.setCardClickListener = this.setCardClickListener.bind(this);
  }

  setCardClickListener(cb) {
    this.getElement().addEventListener(`click`, () => cb(this._film));
  }

  // setWatchlistButtonClickListener(listener) {
  //   this.getElement().querySelector(`.add-to-watchlist`)
  //     .addEventListener(`click`, listener);
  // }
  //
  // setWatchedButtonClickListener(listener) {
  //   this.getElement().querySelector(`.mark-as-watched`)
  //     .addEventListener(`click`, listener);
  // }
  //
  // setFavoriteButtonClickListener(listener) {
  //   this.getElement().querySelector(`.favorite`)
  //     .addEventListener(`click`, listener);
  // }

  getTemplate() {
    const {name, poster, description, comments, year, duration, genres, rating} = this._film;
    const genreItem = genres[0];
    return (
      `<article class="film-card">
            <h3 class="film-card__title">${name}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
                <span class="film-card__year">${year}</span>
                <span class="film-card__duration">${duration}</span>
                <span class="film-card__genre">${genreItem}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${description.join(`\n`)}</p>
            <a class="film-card__comments">${comments.length} comments</a>
            <form class="film-card__controls">
                ${this._getButtons()}
              </form>
            </article>`
    ).trim();
  }

  _renderButton(name, className) {
    return (`
         <button class="film-card__controls-item button film-card__controls-item--${className}">
             ${name}
         </button>
      `).trim();
  }

  _getButtons() {
    return FILM_CARD_BUTTONS.map(({name, className}) => this._renderButton(name, className))
      .join(`\n`);
  }
}
