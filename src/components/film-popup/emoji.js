import {createElement} from "../../util/dom-util";

export default class Emoji {
  constructor(emojiName) {
    this._emojiName = emojiName;
    this._element = null;
  }

  getTemplate() {
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${this._emojiName}" value="${this._emojiName}">
            <label class="film-details__emoji-label" for="emoji-${this._emojiName}">
                <img src="./images/emoji/${this._emojiName}.png" width="30" height="30" alt="emoji">
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
