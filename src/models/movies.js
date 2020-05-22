import {FilterType} from "../util/const";
import {getFilteredFilms} from "../util/filter";

export default class Movies {
  constructor() {
    this._films = [];
    this._filterType = FilterType.ALL;
    this._dataChangeListeners = [];
    this._filterChangeListeners = [];
  }

  get films() {
    return getFilteredFilms(this._films, this._filterType);
  }

  set films(films) {
    this._films = Array.from(films);
    this._callListeners(this._dataChangeListeners);
  }

  getAllFilms() {
    return this._films;
  }

  setFilter(filterType) {
    this._filterType = filterType;
    this._callListeners(this._filterChangeListeners);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._callListeners(this._dataChangeListeners);
    return true;
  }

  addFilterChangeListener(listener) {
    this._filterChangeListeners.push(listener);
  }

  addDataChangeListener(listener) {
    this._dataChangeListeners.push(listener);
  }

  _callListeners(listeners) {
    listeners.forEach((listener) => listener());
  }
}
