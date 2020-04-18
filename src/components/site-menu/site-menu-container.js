import {createElement} from "../../util/dom-util";

export default class SiteMenuContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<nav class="main-navigation"></nav>`;
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
