import Abstract from "../../abstract";

export default class TopRatedList extends Abstract {
  getRatedFilms(films) {
    const copyFilms = films.slice();
    return copyFilms.sort((firstFilm, secondFilm) => secondFilm.rating - firstFilm.rating);
  }

  getTemplate() {
    return `<section class="films-list--extra">
              <h2 class="films-list__title">Top rated</h2>
              <div class="films-list__container">
              </div>
           </section>`;
  }
}
