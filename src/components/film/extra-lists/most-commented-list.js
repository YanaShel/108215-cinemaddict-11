import Abstract from "../../abstract";
import FilmCard from "../film-card";
import {render} from "../../../util/dom-util";

export default class MostCommentedList extends Abstract {
  getTemplate() {
    return `<section class="films-list--extra">
              <h2 class="films-list__title">Most commented</h2>
              <div class="films-list__container">
              </div>
           </section>`;
  }

  renderFilms(films) {
    const mostCommentedFilms = this._getCommentedFilms(films).slice(0, 2);
    mostCommentedFilms.forEach((film) => {
      const filmCard = new FilmCard(film);
      render(this.getElement().querySelector(`.films-list__container`), filmCard);
    });
  }

  _getCommentedFilms(films) {
    const copyFilms = films.slice();
    return copyFilms.sort((firstFilm, secondFilm) => secondFilm.comments.length - firstFilm.comments.length);
  }
}
