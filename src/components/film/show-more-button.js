import Abstract from "../abstract";

export default class ShowMoreButton extends Abstract {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  setClickListener(cb) {
    this.getElement().addEventListener(`click`, cb);
  }
}
