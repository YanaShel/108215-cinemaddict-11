import {FilterType} from "../const";
import {getFilmsByFilter} from "../util/filter";

export default class Movies {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.All;
    this._dataChangeListener = [];
    this._filterChangeListeners = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callListeners(this._dataChangeListener);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callListeners(this._filterChangeListeners);
  }

  updateFilms(id, film) {
    const index = this._films.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._callListeners(this._dataChangeListener);
    return true;
  }

  setFilterChangeListener(listener) {
    this._filterChangeListeners.push(listener);
  }

  setDataChangeListener(listener) {
    this._dataChangeListener.push(listener);
  }

  _callListeners(listeners) {
    listeners.forEach((listener) => listener());
  }
}
