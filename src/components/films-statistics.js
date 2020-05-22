import AbstractComponent from "./abstract-component";

export default class FilmsStatistics extends AbstractComponent {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return (
      `<p>${this._filmsCount} movies inside</p>`
    );
  }
}
