import AbstractSmartComponent from "../../abstract-smart-component";

export default class FilmDetailsGenre extends AbstractSmartComponent {
  constructor(genre) {
    super();
    this._genre = genre;
  }

  getTemplate() {
    return (
      `<span class="film-details__genre"> ${this._genre}</span>`
    ).trim();
  }
}
