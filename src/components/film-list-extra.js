import {createElement} from "../util";

export default class FilmListExtraComponent {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return `<section class="films-list--extra">
              <h2 class="films-list__title">${this._title}</h2>
              <div class="films-list__container"></div>
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
