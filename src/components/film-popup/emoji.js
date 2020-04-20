import {createElement} from "../../util/dom-util";

export default class Emoji {
  constructor(emoji) {
    this._emoji = emoji;
    this._element = null;
  }

  getTemplate() {
    return `<input class="film-details__emoji-item visually-hidden"
                   name="comment-emoji"
                   type="radio"
                   id="emoji-${this._emoji}"
                   value="${this._emoji}">
            <label class="film-details__emoji-label"
                   for="emoji-${this._emoji}">
                   <img src="./images/emoji/${this._emoji}.png" width="30" height="30" alt="emoji">
            </label>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
