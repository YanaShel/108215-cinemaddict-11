import AbstractSmartComponent from "../abstract-smart-component";

const DEFAULT_SORT_TYPE = `default`;

export const SortType = {
  default: `Sort by default`,
  date: `Sort by date`,
  rating: `Sort by rating`,
};

export default class Sort extends AbstractSmartComponent {
  constructor() {
    super();

    this._currenSortType = DEFAULT_SORT_TYPE;
    this._sortTypeChangeListener = null;
  }

  getTemplate() {
    return (
      `<ul class="sort">
           ${this._getSortItems()}
       </ul>`
    ).trim();
  }

  recoveryListeners() {
    this.setSortTypeChangeListener(this._sortTypeChangeListener);
  }

  rerender() {
    super.rerender();
  }

  getSortType() {
    return this._currenSortType;
  }

  resetSortToDefault() {
    this._currenSortType = DEFAULT_SORT_TYPE;
    this.rerender();
  }

  setSortTypeChangeListener(listener) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._updateActiveClass(evt.target);

      this._currenSortType = sortType;

      listener(this._currenSortType);
    });

    this._sortTypeChangeListener = listener;
  }

  _createSortItemMarkup(dataAttribute, name, i) {
    return (
      `<li>
            <a href="#" data-sort-type="${dataAttribute}" class="sort__button ${i === 0 ? `sort__button--active` : ``}">
               ${name}
            </a>
       </li>`
    ).trim();
  }

  _getSortItems() {
    return Object.entries(SortType).map(([dataAttribute, name], i) => this._createSortItemMarkup(dataAttribute, name, i)).join(`\n`);
  }

  _updateActiveClass(activeButton) {
    const sortButtons = this.getElement().querySelectorAll(`.sort__button`);
    sortButtons.forEach((button) => {
      if (button.classList.contains(`sort__button--active`)) {
        button.classList.remove(`sort__button--active`);
      }
      activeButton.classList.add(`sort__button--active`);
    });
  }
}
