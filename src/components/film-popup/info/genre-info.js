import {createElementForTable} from "../../../util/dom-util";

export default class GenreInfo {
  constructor(genres) {
    this._genres = genres;
    this._element = null;
  }

  getTemplate() {
    return `<tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">
                  ${this._genres.join(`\n`)}
                </span>
              </td>
            </tr>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElementForTable(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
