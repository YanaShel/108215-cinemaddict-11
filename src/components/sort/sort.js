import {createElement} from "../../util/dom-util";

const SORT_ITEMS = [
  `Sort by default`,
  `Sort by date`,
  `Sort by rating`
];

export default class Sort {
  constructor() {
    this._element = null;
  }

  _getSortItem() {
    return SORT_ITEMS.map((item, i) => {
      return `<li>
                <a href="#" class="sort__button ${i === 0 ? `sort__button--active` : ``}">
                    ${item}
                </a>
              </li>`;
    }).join(`\n`);
  }

  getTemplate() {
    return `<ul class="sort">
                ${this._getSortItem()}
            </ul>`;
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
