import {createElement} from "../../util/dom-util";

export default class FilmsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="films"></section>`;
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
