import {createElement} from "../../util/dom-util";

export default class FilmCardButtonContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<form class="film-card__controls"></form>`;
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
