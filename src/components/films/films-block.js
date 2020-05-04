import AbstractComponent from "../abstract-component";

export default class FilmsBlock extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="films"></section>`
    ).trim();
  }
}
