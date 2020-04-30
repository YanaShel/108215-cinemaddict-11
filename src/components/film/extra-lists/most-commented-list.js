import Abstract from "../../abstract";
import FilmCard from "../film-card";
import {render} from "../../../util/dom-util";

export default class MostCommentedList extends Abstract {
  constructor(films) {
    super();
    this._clickListener = null;
    this._mostCommentedFilms = this._getMostCommentedFilms(films);
  }

  setClickListener(listener) {
    this._clickListener = listener;
  }

  getTemplate() {
    return (
      `<section class="films-list--extra">
            <h2 class="films-list__title">Most commented</h2>
            <div class="films-list__container">
            </div>
       </section>`
    ).trim();
  }

  getElement() {
    const mostCommentedBlock = super.getElement();
    const container = mostCommentedBlock.querySelector(`.films-list__container`);
    this._mostCommentedFilms.forEach((filmCard) => {
      render(container, filmCard);
    });
    return mostCommentedBlock;
  }

  _getMostCommentedFilms(films) {
    return films.slice()
      .sort((firstFilm, secondFilm) => secondFilm.comments.length - firstFilm.comments.length)
      .slice(0, 2)
      .map((currentFilm) => {
        const card = new FilmCard(currentFilm);
        card.setCardClickListener((film) => this._handlerCardClick(film));
        return card;
      });
  }

  _handlerCardClick(film) {
    if (typeof this._clickListener === `function`) {
      this._clickListener(film);
    }
  }
}
