import Abstract from "../abstract";

const SORT_ITEMS = [
  `Sort by default`,
  `Sort by date`,
  `Sort by rating`
];

export default class Sort extends Abstract {
  _renderSortItem(item, i) {
    return (
      `<li>
            <a href="#" class="sort__button ${i === 0 ? `sort__button--active` : ``}">
               ${item}
            </a>
       </li>`
    ).trim();
  }

  _getSortItems() {
    return SORT_ITEMS.map((item, i) => this._renderSortItem(item, i)).join(`\n`);
  }

  getTemplate() {
    return (
      `<ul class="sort">
           ${this._getSortItems()}
       </ul>`
    ).trim();
  }
}
