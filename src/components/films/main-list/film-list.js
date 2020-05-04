import AbstractComponent from "../../abstract-component";

export default class FilmList extends AbstractComponent {
  getFilmCardCount() {
    return this.getElement().querySelector(`.films-list__container`).querySelectorAll(`.film-card`).length;
  }

  getTemplate() {
    return (
      `<section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
            <div class="films-list__container">
            </div>
       </section>`
    );
  }
}
