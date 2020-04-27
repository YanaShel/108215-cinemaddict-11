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

  getTemplate() {
    const {name, poster, description, comments, year, duration, genres, rating} = this._film;
    const genreItem = genres[0];
    const watchlistButton = this._renderButton(FILM_CARD_BUTTONS[0].name, FILM_CARD_BUTTONS[0].className, this._film.isWatchlist);
    const watchedButton = this._renderButton(FILM_CARD_BUTTONS[1].name, FILM_CARD_BUTTONS[1].className, this._film.isWatched);
    const favoriteButton = this._renderButton(FILM_CARD_BUTTONS[2].name, FILM_CARD_BUTTONS[2].className, this._film.isFavorite);
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
                ${watchlistButton}
                ${watchedButton}
                ${favoriteButton}
              </form>
            </article>`
    ).trim();
  }

  _renderButton(name, className, isActive) {
    return (`
         <button class="film-card__controls-item button film-card__controls-item--${className} ${isActive ? `film-card__controls-item--active` : ``}">
             ${name}
         </button>
      `).trim();
  }

  // _getButtons() {
  //   return FILM_CARD_BUTTONS.map(({name, className}, i) => this._renderButton(name, className, false))
  //     .join(`\n`);
  // }
}
