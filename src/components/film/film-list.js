import Abstract from "../abstract";
import FilmCard from "./film-card";
import {render} from "../../util/dom-util";

export default class FilmList extends Abstract {
  getTemplate() {
    return `<section class="films-list">
              <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
              <div class="films-list__container">
              </div>
            </section>`;
  }

  renderFilms(films) {
    films.forEach((film) => {
      const filmCard = new FilmCard(film);
      render(this.getElement().querySelector(`.films-list__container`), filmCard);
    });
  }

  getFilmCardCount() {
    return this.getElement().querySelector(`.films-list__container`).querySelectorAll(`.film-card`).length;
  }
}
