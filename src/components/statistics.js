import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const Filters = [
  {id: `all-time`, name: `All time`},
  {id: `today`, name: `Today`},
  {id: `week`, name: `Week`},
  {id: `month`, name: `Month`},
  {id: `year`, name: `Year`},
];

export default class Statistics extends AbstractSmartComponent {
  getTemplate() {
    return (
      `<section className="statistic">
            <p className="statistic__rank">
                Your rank
                <img className="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
                <span className="statistic__rank-label">Sci-Fighter</span>
            </p>

            <form action="https://echo.htmlacademy.ru/" method="get" className="statistic__filters">
                <p className="statistic__filters-description">Show stats:</p>
                ${this._getStatisticFiltersMarkup()}
            </form>

            <ul className="statistic__text-list">
                <li className="statistic__text-item">
                    <h4 className="statistic__item-title">You watched</h4>
                    <p className="statistic__item-text">22 <span className="statistic__item-description">movies</span></p>
                </li>
                <li className="statistic__text-item">
                    <h4 className="statistic__item-title">Total duration</h4>
                    <p className="statistic__item-text">130 <span className="statistic__item-description">h</span> 22 <span className="statistic__item-description">m</span></p>
                </li>
                <li className="statistic__text-item">
                    <h4 className="statistic__item-title">Top genre</h4>
                    <p className="statistic__item-text">Sci-Fi</p>
                </li>
            </ul>

            <div className="statistic__chart-wrap">
                <canvas className="statistic__chart" width="1000"></canvas>
            </div>
       </section>`
    ).trim();
  }

  _createStatisticFilterMarkup(id, name) {
    return (
      `<input type="radio" className="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${id}" value="${id}" checked>
       <label htmlFor="statistic-${id}" className="statistic__filters-label">${name}</label>`
    );
  }

  _getStatisticFiltersMarkup() {
    return Filters.map(({id, name}) => this._createStatisticFilterMarkup(id, name));
  }
}
