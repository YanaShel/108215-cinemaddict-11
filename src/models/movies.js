export default class Movies {
  constructor() {
    this._movies = [];

    this._dataChangeListener = [];
  }

  getMovies() {
    return this._movies;
  }

  setMovies(films) {
    this._films = Array.from(films);
    this._callListeners(this._dataChangeListener);
  }

  updateMovies(id, film) {
    const index = this._films.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callListeners(this._dataChangeListener);

    return true;
  }
}
