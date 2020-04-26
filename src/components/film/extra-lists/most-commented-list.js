import Abstract from "../../abstract";
import FilmCard from "../film-card";
import {render} from "../../../util/dom-util";

export default class MostCommentedList extends Abstract {
  constructor(films) {
    super();

    this._films = films;
    this.setClickListener = this.setClickListener.bind(this);
    this._mostComentedFilms = this._getCommentedFilms(this._films).slice(0, 2);
  }

  _getCommentedFilms(films) {
    const copyFilms = films.slice();
    return copyFilms.sort((firstFilm, secondFilm) => secondFilm.comments.length - firstFilm.comments.length);
  }

  setClickListener(cb) {
    this.getElement().addEventListener(`click`, () => cb(this._mostComentedFilms));
  }

  renderFilms() {
    this._mostComentedFilms.forEach((film) => {
      const filmCard = new FilmCard(film);
      render(this.getElement().querySelector(`.films-list__container`), filmCard);
    });
  }

  getTemplate() {
    return `<section class="films-list--extra">
              <h2 class="films-list__title">Most commented</h2>
              <div class="films-list__container">
              </div>
           </section>`;
  }
}
