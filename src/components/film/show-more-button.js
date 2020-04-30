import Abstract from "../abstract";

export default class ShowMoreButton extends Abstract {
  setClickListener(cb) {
    this.getElement().addEventListener(`click`, cb);
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }
}
