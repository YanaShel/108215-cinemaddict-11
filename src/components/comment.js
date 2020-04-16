import {createElement} from "../util";

export default class CommentComponent {
  constructor(comment) {
    this._comment = comment;
    this._element = null;
  }

  getTemplate() {
    return `<ul class="film-details__comments-list">${this.createComments(this._comment)}</ul>`;
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

  createCommentTemplate({emotion, author, date, message}) {
    return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${message}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
        </li>`;
  }

  createComments(comments) {
    return comments.map((item) => this.createCommentTemplate(item)).join(`\n`);
  }
}
