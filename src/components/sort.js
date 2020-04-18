import {createElement} from "../dom-util";

export default class Sort {
  constructor(sortItem, isActive) {
    this._sortItem = sortItem;
    this._isActive = isActive;
    this._element = null;
  }

  getTemplate() {
    return `<li><a href="#" class="sort__button ${this._isActive ? `sort__button--active` : ``}">${this._sortItem}</a></li>`;
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
