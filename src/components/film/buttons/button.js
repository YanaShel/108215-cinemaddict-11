import {createElement} from "../../../util/dom-util";

export default class FilmCardButton {
  constructor(filmCardButton) {
    this._filmCardButton = filmCardButton;
    this._element = null;
  }

  getTemplate() {
    const {name, className} = this._filmCardButton;
    return `<button class="film-card__controls-item button film-card__controls-item--${className}">${name}</button>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
