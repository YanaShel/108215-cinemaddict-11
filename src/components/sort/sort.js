import Abstract from "../abstract";

const SORT_ITEMS = [
  `Sort by default`,
  `Sort by date`,
  `Sort by rating`
];

export default class Sort extends Abstract {
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
}
