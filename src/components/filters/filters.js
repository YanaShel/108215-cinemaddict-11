import AbstractComponent from "../abstract-component";
import {activateElement} from "../../util/common";

const SITE_MENU_ITEMS = [
  {name: `All movies`, className: `item`, href: `all`},
  {name: `Stats`, className: `additional`, href: `stats`, checked: false},
];

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
            <div class="main-navigation__items">
                ${this._getMenuFilers(this._filters)}
            </div>
          ${this._getMenuItem(SITE_MENU_ITEMS[1])}
       </nav>`
    ).trim();
  }

  setFilterChangeListener(listener) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = evt.target.id;
      listener(filterName);

      activateElement(evt.target, this.getElement(), `main-navigation__item--active`);
    });
  }

  _renderMenuFiler({name, count, checked}) {
    return (
      `<a href="#${name}"
          id="${name}"
          class="main-navigation__item ${checked ? `main-navigation__item--active` : ``}">
             ${name}
             ${name === `All movies` ? `` : `<span class="main-navigation__item-count">
                ${count}
            </span>`}
       </a>`
    ).trim();
  }

  _getMenuItem(item) {
    return (
      `<a href="#${item.href}"
          class="main-navigation__${item.className} ${item.checked ? `main-navigation__item--active` : ``}">
               ${item.name}
       </a>`
    ).trim();
  }

  _getMenuFilers(filters) {
    return filters.map((name) => this._renderMenuFiler(name)).join(`\n`);
  }
}
