import AbstractComponent from "../abstract-component";
import {getRandomIntegerNumber} from "../../util/util";

const SITE_MENU_ITEMS = [
  {name: `All movies`, className: `item`, href: `all`, isActive: true},
  {name: `Stats`, className: `additional`, href: `stats`},
];

const FILTER_NAMES = [
  `Watchlist`,
  `History`,
  `Favorites`,
];

export default class Menu extends AbstractComponent {
  getTemplate() {
    return (
      `<nav class="main-navigation">
            <div class="main-navigation__items">
                ${this._getMenuItem(SITE_MENU_ITEMS[0])}
                ${this._getMenuFilers()}
            </div>
          ${this._getMenuItem(SITE_MENU_ITEMS[1])}
       </nav>`
    ).trim();
  }

  _renderMenuFiler(name) {
    return (
      `<a href="#${name}"
          class="main-navigation__item">
             ${name}
            <span class="main-navigation__item-count">
                ${getRandomIntegerNumber(1, 10)}
            </span>
       </a>`
    ).trim();
  }

  _getMenuItem(item) {
    return (
      `<a href="#${item.href}"
          class="main-navigation__${item.className} ${item.isActive ? `main-navigation__item--active` : ``}">
               ${item.name}
       </a>`
    ).trim();
  }

  _getMenuFilers() {
    return FILTER_NAMES.map((name) => this._renderMenuFiler(name)).join(`\n`);
  }
}
