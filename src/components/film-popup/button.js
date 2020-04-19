import {createElement} from "../../util/dom-util";

export default class FilmDetailsButton {
  constructor(filmCardButton) {
    this._filmCardButton = filmCardButton;
    this._element = null;
  }

  getTemplate() {
    const {name, className} = this._filmCardButton;
    return `<input type="checkbox" class="film-details__control-input visually-hidden" id="${className}" name="${className}">
            <label for="${className}" class="film-details__control-label film-details__control-label--${className}">${name}</label>`;
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
