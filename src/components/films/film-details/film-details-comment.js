import AbstractComponent from "../../abstract-component";
import moment from "moment";

export default class FilmDetailsComment extends AbstractComponent {
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
                  <span class="film-details__comment-day">${this._formatCommentsDate(this._date)}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
            </div>
         </li>`
    ).trim();
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
