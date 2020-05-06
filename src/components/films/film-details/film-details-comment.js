import AbstractSmartComponent from "../../abstract-smart-component";
import {formatCommentsDate} from "../../../util/date";

export default class FilmDetailsComment extends AbstractSmartComponent {
  constructor(comment) {
    super();
    this._emotion = comment.emotion;
    this._author = comment.author;
    this._date = comment.date;
    this._message = comment.message;

  }

  getTemplate() {
    return (
      `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
                <img src="./images/emoji/${this._emotion}.png" width="55" height="55" alt="emoji-${this._emotion}">
            </span>
            <div>
                <p class="film-details__comment-text">${this._message}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${this._author}</span>
                  <span class="film-details__comment-day">${formatCommentsDate(this._date)}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
            </div>
         </li>`
    ).trim();
  }
}
