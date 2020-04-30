import Abstract from "../../abstract";
import FilmCard from "../film-card";
import {render} from "../../../util/dom-util";

export default class TopRatedList extends Abstract {
  constructor(films) {
    super();
    this._clickListener = null;
    this._topRatedFilms = this._getTopRatedFilms(films);
  }

  setClickListener(listener) {
    this._clickListener = listener;
  }

  getTemplate() {
    return (
      `<section class="films-list--extra">
              <h2 class="films-list__title">Top rated</h2>
              <div class="films-list__container">
              </div>
           </section>`
    ).trim();
  }

  getElement() {
    const topRatedBlock = super.getElement();
    const container = topRatedBlock.querySelector(`.films-list__container`);
    this._topRatedFilms.forEach((filmCard) => {
      render(container, filmCard);
    });
    return topRatedBlock;
  }

  _getTopRatedFilms(films) {
    return films.slice()
      .sort((firstFilm, secondFilm) => secondFilm.rating - firstFilm.rating)
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
