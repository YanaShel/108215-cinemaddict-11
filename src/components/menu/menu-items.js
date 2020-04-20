import {createElement} from "../../util/dom-util";

export default class MenuItems {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<div class="main-navigation__items"></div>`;
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