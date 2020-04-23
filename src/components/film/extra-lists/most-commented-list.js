import Abstract from "../../abstract";

export default class MostCommentedList extends Abstract {
  getCommentedFilms(films) {
    const copyFilms = films.slice();
    return copyFilms.sort((firstFilm, secondFilm) => secondFilm.comments.length - firstFilm.comments.length);
  }

  getTemplate() {
    return `<section class="films-list--extra">
              <h2 class="films-list__title">Most commented</h2>
              <div class="films-list__container">
              </div>
           </section>`;
  }
}
