import {createElement} from "../../util/dom-util";

export default class SiteMenuFilter {
  constructor(filter, count) {
    this._filter = filter;
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return `<a href="#${this._filter}" class="main-navigation__item">${this._filter}
                <span class="main-navigation__item-count">${this._count}</span>
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
