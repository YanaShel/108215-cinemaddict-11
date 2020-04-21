import {createElement} from "../../util/dom-util";

export default class FilmsList {
  constructor() {
    this._element = null;
  }

  set films(films) {
    this._films = films;
  }

  // не корректно отображается сообщение no-film
  _renderFilms() {
    const isFilmsInDataBase = this._films.length > 0;
    if (isFilmsInDataBase) {
      return `<div class="films-list__container"></div>`;
    } else {
      return `<h2 class="films-list__title">There are no movies in our database</h2>`;
    }
  }

  getTemplate() {
    return `<section class="films-list">
              <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
              ${this._renderFilms()}
            </section>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
