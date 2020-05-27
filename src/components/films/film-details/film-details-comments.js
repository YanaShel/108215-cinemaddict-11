import AbstractComponent from "../../abstract-component";
import FilmDetailsEmoji from "./film-details-emoji";
import moment from "moment";
import {encode} from "he";

const EMOJI_NAMES = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

export default class FilmDetailsComments extends AbstractComponent {
  constructor(comments, newEmoji, commentText) {
    super();
    this._comments = comments;
    this._newEmoji = newEmoji;
    this._commentText = commentText;
  }

  getTemplate() {
    const commentsMarkup = this._getSortComments()
      .map((comment) => this._createCommentMarkup(comment))
      .join(`\n`);

    const emojiMarkUp = EMOJI_NAMES
      .map((name) => new FilmDetailsEmoji(name).getTemplate())
      .join(`\n`);

    const newEmojiMarkUp = this._newEmoji ?
      `<img src="./images/emoji/${this._newEmoji}.png"  width=55" height="55" alt="emoji">`
      : ``;

    return (
      `<div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments
                <span class="film-details__comments-count">
                    ${this._comments.length}
                </span>
            </h3>

            <ul class="film-details__comments-list">
                ${commentsMarkup}
            </ul>

            <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label">
                  ${newEmojiMarkUp}
                </div>

                <label class="film-details__comment-label">
                    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${this._commentText}</textarea>
                </label>

                <div class="film-details__emoji-list">
                     ${emojiMarkUp}
                </div>
            </div>
        </section>
      </div>`
    );
  }

  _createCommentMarkup({id, emotion, author, date, message}) {
    if (!message) {
      return ``;
    }
    return (
      `<li class="film-details__comment" id="${id}">
            <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
                <p class="film-details__comment-text">${encode(message)}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${this._formatCommentsDate(date)}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
            </div>
         </li>`
    ).trim();
  }

  _getSortComments() {
    return this._comments.slice()
      .sort((a, b) => b.date - a.date);
  }

  _formatCommentsDate(date) {
    const now = moment();
    const past = moment(date);
    const diff = now.diff(past, `days`);

    if (diff >= 3) {
      return past.format(`YYYY/MM/DD hh:mm`);
    } else if (diff === 0) {
      return moment(past).calendar({sameDay: `[Today]`});
    } else {
      return moment(past).fromNow();
    }
  }
}
