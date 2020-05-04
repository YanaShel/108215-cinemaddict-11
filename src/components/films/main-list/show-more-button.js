import AbstractComponent from "../../abstract-component";

export default class ShowMoreButton extends AbstractComponent {
  setClickListener(cb) {
    this.getElement().addEventListener(`click`, cb);
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }
}
