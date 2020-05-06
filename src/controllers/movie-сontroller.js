import FilmCard from "../components/films/main-list/film-card";
import FilmDetails from "../components/films/film-details/film-details";
import {render, replace} from "../util/dom-util";
import {Key} from "../util/util";

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._bodyElement = document.querySelector(`body`);
    this._fimCard = null;
    this._filmDetails = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
  }

  render(film) {
    const oldFilmCard = this._fimCard;
    const oldFilmDetails = this._filmDetails;

    this._fimCard = new FilmCard(film);
    this._fimCard.setCardClickListener(this._onFilmCardClick);

    this._fimCard.setWatchlistButtonClickListener((evt) => {
      evt.stopPropagation();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist}));
    });
    this._fimCard.setWatchedButtonClickListener((evt) => {
      evt.stopPropagation();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched}));
    });
    this._fimCard.setFavoriteButtonClickListener((evt) => {
      evt.stopPropagation();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite}));
    });

    this._filmDetails = new FilmDetails(film);
    this._filmDetails.setWatchlistPopupBtnClickListener(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist}));
    });
    this._filmDetails.setWatchedPopupBtnClickListener(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched}));
    });
    this._filmDetails.setFavoritePopupBtnClickListener(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite}));
    });
    this._filmDetails.setEmojiClickListener((evt) => {
      const emojiContainer = this._filmDetails.getElement().querySelector(`.film-details__add-emoji-label`);
      let imgEmoji = emojiContainer.querySelector(`img`);
      if (!imgEmoji) {
        imgEmoji = document.createElement(`img`);
      }
      imgEmoji.src = `./images/emoji/${evt.target.value}.png`;
      imgEmoji.width = 55;
      imgEmoji.height = 55;
      emojiContainer.append(imgEmoji);
    });

    if (oldFilmCard && oldFilmDetails) {
      replace(this._fimCard, oldFilmCard);
      replace(this._filmDetails, oldFilmDetails);
    } else {
      render(this._container.querySelector(`.films-list__container`), this._fimCard);
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === Key.ESCAPE;

    if (isEscKey) {
      this._filmDetails.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _closeFilmDetailsPopup() {
    this._filmDetails.getElement().remove();
  }

  _onFilmCardClick() {
    this._onViewChange();
    render(this._bodyElement, this._filmDetails);
    const buttonCloseFilmDetails = this._filmDetails.getElement().querySelector(`.film-details__close-btn`);

    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._filmDetails.setCloseButtonClickListener(() => {
      this._closeFilmDetailsPopup(this._filmDetails.getElement(), buttonCloseFilmDetails);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
  }

  _setDefaultView() {
    this._closeFilmDetailsPopup();
  }
}
