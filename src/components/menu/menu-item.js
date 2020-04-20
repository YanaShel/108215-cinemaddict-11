import {createElement} from "../../util/dom-util";

export default class MenuItem {
  constructor(item) {
    this._item = item;
    this._element = null;
  }

  getTemplate() {
    const {name, className, href, isActive} = this._item;
    return `<a href="#${href}"
               class="main-navigation__${className}${isActive ? `main-navigation__item--active` : ``}">
               ${name}
            </a>`;
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
