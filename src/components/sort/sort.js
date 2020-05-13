import AbstractComponent from "../abstract-component";

export const SortType = {
  default: `Sort by default`,
  date: `Sort by date`,
  rating: `Sort by rating`,
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = `default`;
  }

  getTemplate() {
    return (
      `<ul class="sort">
           ${this._getSortItems()}
       </ul>`
    ).trim();
  }

  getSortType() {
    return this._currenSortType;
  }

  resetSortToDefault() {
    const defaultSortButton = this.getElement().querySelector(`a[data-sort-type="default"]`);
    this._updateActiveClass(defaultSortButton);
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
