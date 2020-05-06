import AbstractSmartComponent from "../../abstract-smart-component";

export default class FilmDetailsButton extends AbstractSmartComponent {
  constructor(button) {
    super();
    this._name = button.name;
    this._id = button.id;
  }

  getTemplate() {
    return (
      `<input type="checkbox"
              class="film-details__control-input visually-hidden"
              id="${this._id}"
              name="${this._id}">
       <label for="${this._id}"
              class="film-details__control-label film-details__control-label--${this._id}">
              ${this._name}
       </label>`
    ).trim();
  }
}
