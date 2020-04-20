import {createElement} from "../../util/dom-util";

export default class FilmDetailsButton {
  constructor(button) {
    this._button = button;
    this._element = null;
  }

  getTemplate() {
    const {name, id} = this._button;
    return `<input type="checkbox"
                   class="film-details__control-input visually-hidden"
                   id="${id}"
                   name="${id}">
            <label for="${id}"
                   class="film-details__control-label film-details__control-label--${id}">
                   ${name}
            </label>`;
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
