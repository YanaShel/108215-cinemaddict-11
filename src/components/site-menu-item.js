import {createElement} from "../dom-util";

export default class SiteMenuItem {
  constructor(name, className, href, isActive) {
    this._name = name;
    this._className = className;
    this._href = href;
    this._isActive = isActive;
    this._element = null;
  }

  getTemplate() {
    return `<a href="#${this._href}" class="main-navigation__${this._className} ${this._isActive ? `main-navigation__item--active` : ``}">${this._name}</a>`;
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
