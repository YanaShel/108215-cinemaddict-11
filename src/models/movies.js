export default class Movies {
  constructor() {
    this._films = [];

    this._dataChangeListener = [];
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callListeners(this._dataChangeListener);
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

  _callListeners(listeners) {
    listeners.forEach((listener) => listener());
  }
}
