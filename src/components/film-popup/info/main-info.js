import {createElementForTable} from "../../../util/dom-util";

export default class MainInfo {
  constructor(name, filmInfo) {
    this._name = name;
    this._filmInfo = filmInfo;
    this._element = null;
  }

  getTemplate() {
    return `<tr class="film-details__row">
                <td class="film-details__term">${this._name}</td>
                <td class="film-details__cell">${this._filmInfo}</td>
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
