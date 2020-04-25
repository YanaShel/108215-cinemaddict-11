import Abstract from "../../abstract";
import FilmCard from "../film-card";
import {render} from "../../../util/dom-util";

export default class TopRatedList extends Abstract {
  constructor(films) {
    super();

    this.setClickListener = this.setClickListener.bind(this);
    this._topRatedFilms = this._getRatedFilms(films).slice(0, 2);
  }

  getTemplate() {
    return `<section class="films-list--extra">
              <h2 class="films-list__title">Top rated</h2>
              <div class="films-list__container">
              </div>
           </section>`;
  }

  renderFilms() {
    this._topRatedFilms.forEach((film) => {
      const filmCard = new FilmCard(film);
      render(this.getElement().querySelector(`.films-list__container`), filmCard);
    });
  }

  setClickListener(cb) {
    this.getElement().addEventListener(`click`, () => cb(this._topRatedFilms));
  }

  _getRatedFilms(films) {
    const copyFilms = films.slice();
    return copyFilms.sort((firstFilm, secondFilm) => secondFilm.rating - firstFilm.rating);
  }
}
