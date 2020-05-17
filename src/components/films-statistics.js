import AbstractComponent from "./abstract-component";

export default class FilmsStatistics extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return (
      `<p>${this._films.length} movies inside</p>`
    );
  }
}
