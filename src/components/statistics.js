import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {GENRES} from "../const";

const BAR_HEIGHT = 50;
const FILTER_ID_PREFIX = `statistic-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const Filters = [
  {id: `all-time`, name: `All time`},
  {id: `today`, name: `Today`},
  {id: `week`, name: `Week`},
  {id: `month`, name: `Month`},
  {id: `year`, name: `Year`},
];

export default class Statistics extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;
    this._films = this._filmsModel.getFilms().filter((film) => film.isWatched);
    this._chartData = this._getCountFilmsByGenre(this._films);
    this._activeFilter = Filters[0].id;
    this._getSelectedFilterType();

  }

  getTemplate() {
    return (
      `<section class="statistic">
            <p class="statistic__rank">
                Your rank
                <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
                <span class="statistic__rank-label">Sci-Fighter</span>
            </p>

            <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
                <p class="statistic__filters-description">Show stats:</p>
                ${this._getStatisticFiltersMarkup()}
            </form>

            <ul class="statistic__text-list">
                <li class="statistic__text-item">
                    <h4 class="statistic__item-title">You watched</h4>
                    <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
                </li>
                <li class="statistic__text-item">
                    <h4 class="statistic__item-title">Total duration</h4>
                    <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
                </li>
                <li class="statistic__text-item">
                    <h4 class="statistic__item-title">Top genre</h4>
                    <p class="statistic__item-text">Sci-Fi</p>
                </li>
            </ul>

            <div class="statistic__chart-wrap">
            <div class="statistic__chart-wrap">
                <canvas class="statistic__chart" width="1000"></canvas>
            </div>
       </section>`
    ).trim();
  }

  recoveryListeners() {
    this._getSelectedFilterType();
  }

  _createStatisticFilterMarkup(id, name) {
    const checked = id === this._activeFilter;
    return (
      `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${id}" value="${id}" ${checked ? `checked` : ``}>
       <label for="statistic-${id}" class="statistic__filters-label">${name}</label>`
    );
  }

  _getStatisticFiltersMarkup() {
    return Filters.map(({id, name}) => this._createStatisticFilterMarkup(id, name)).join(`\n`);
  }

  _getSelectedFilterType() {
    this.getElement().querySelector(`.statistic__filters`)
      .addEventListener(`click`, (evt) => {
        const filterItem = evt.target.control;
        if (!filterItem) {
          return;
        }
        const filter = filterItem.id;
        this._activeFilter = getFilterNameById(filter);
        this.rerender();
      });
  }

  _getCountFilmsByGenre(films) {
    let result = [];
    if (films.length) {
      result = GENRES.map((genre) => {
        const genres = films.map((film) => film.genres).flat();
        return {
          genre,
          count: genres.filter((genreItem) => genreItem === genre).length,
        };
      }).sort((a, b) => b.count - a.count);
    }
    return result;
  }

}
