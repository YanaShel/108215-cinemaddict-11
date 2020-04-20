import {createElement} from "../../util/dom-util";

export default class FilmCardButton {
  constructor(button) {
    this._button = button;
    this._element = null;
  }

  getTemplate() {
    const {name, className} = this._button;
    return `<button class="film-card__controls-item button film-card__controls-item--${className}">
                   ${name}
            </button>`;
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
