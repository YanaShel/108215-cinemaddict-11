import FilmCard from "../components/film/film-card";
import FilmDetails from "../components/film-popup/film-details";
import {render} from "../util/dom-util";
import {Key} from "../util/util";

const bodyElement = document.querySelector(`body`);

export default class Movie {
  constructor(container) {
    this._container = container;

    this._fimCard = null;
    this._filmDetails = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
  }

  render(film) {
    this._fimCard = new FilmCard(film);
    this._filmDetails = new FilmDetails(film);

    this._fimCard.setCardClickListener(this._onFilmCardClick);
    // this._fimCard.setWatchlistButtonClickListener(() => {});
    // this._fimCard.setWatchedButtonClickListener(() => {});
    // this._fimCard.setFavoriteButtonClickListener(() => {});

    render(this._container.querySelector(`.films-list__container`), this._fimCard);

  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === Key.ESCAPE;

    if (isEscKey) {
      this._filmDetails.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _closeFilmDetailsPopup(popup, btnClose) {
    popup.remove();
    btnClose.removeEventListener(`click`, this._closeFilmDetailsPopup);
  }

  _onFilmCardClick() {
    render(bodyElement, this._filmDetails);
    const buttonCloseFilmDetails = this._filmDetails.getElement().querySelector(`.film-details__close-btn`);

    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._filmDetails.setCloseButtonClickListener(() => {
      this._closeFilmDetailsPopup(this._filmDetails.getElement(), buttonCloseFilmDetails);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
    // this._filmDetails.setWatchlistButtonClickListener(() => {});
    // this._filmDetails.setWatchedButtonClickListener(()=> {});
    // this._filmDetails.setFavoriteButtonClickListener(() => {});
  }
}
