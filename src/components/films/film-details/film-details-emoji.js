import AbstractSmartComponent from "../../abstract-smart-component";

export default class FilmDetailsEmoji extends AbstractSmartComponent {
  constructor(emoji) {
    super();
    this._emoji = emoji;
  }

  getTemplate() {
    return (
      `<input class="film-details__emoji-item visually-hidden"
              name=" comment-emoji"
              type="radio"
              id="emoji-${this._emoji}"
              value="${this._emoji}">
       <label class="film-details__emoji-label"
              for="emoji-${this._emoji}">
              <img src="./images/emoji/${this._emoji}.png" width="30" height="30" alt="emoji">
       </label>`
    ).trim();
  }
}
