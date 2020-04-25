import Abstract from "../abstract";
import FilmDetails from "../film-popup/film-details";
import {render} from "../../util/dom-util";
import {Key} from "../../util/util";

const FILM_CARD_BUTTONS = [
  {name: `Add to watchlist`, className: `add-to-watchlist`},
  {name: `Mark as watched`, className: `mark-as-watched`},
  {name: `Mark as favorite`, className: `favorite`},
];

export default class FilmCard extends Abstract {
  constructor(film) {
    super();

    this._film = film;
    this.getElement().addEventListener(`click`, () => this._onFilmCardClick(this._film));
  }

  getTemplate() {
    const {name, poster, description, comments, year, duration, genres, rating} = this._film;
    const genreItem = genres[0];
    return `<article class="film-card">
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
            </article>`;
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

  _onFilmCardClick(film) {
    const bodyElement = document.querySelector(`body`);
    const filmDetails = new FilmDetails(film);
    const buttonCloseFilmDetails = filmDetails.getElement().querySelector(`.film-details__close-btn`);

    render(bodyElement, filmDetails);
    filmDetails.setCloseButtonClickListener(() => {
      this._closeFilmDetailsPopup(filmDetails.getElement(), buttonCloseFilmDetails);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === Key.ESCAPE;

      if (isEscKey) {
        filmDetails.getElement().remove();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);
  }

  _closeFilmDetailsPopup(popup, btnClose) {
    popup.remove();
    btnClose.removeEventListener(`click`, this.closeFilmDetailsPopup);
  }
}
