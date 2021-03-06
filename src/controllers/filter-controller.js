import Filters from "../components/filters/filters";
import {FilterType} from "../util/const";
import {render, replace} from "../util/dom-util";
import {getFilteredFilms} from "../util/filter";

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._filter = null;

    this._activeFilterType = FilterType.ALL;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._moviesModel.addDataChangeListener(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._moviesModel.getAllFilms();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilteredFilms(allFilms, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filter;
    this._filter = new Filters(filters);
    this._filter.setFilterChangeListener(this._onFilterChange);

    if (oldComponent) {
      replace(this._filter, oldComponent);
    } else {
      render(container, this._filter);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
