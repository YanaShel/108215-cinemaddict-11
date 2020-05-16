import FilmCard from "../components/films/main-list/film-card";
import FilmDetails from "../components/films/film-details/film-details";
import {render, replace, remove} from "../util/dom-util";
import {Key} from "../util/util";

export const State = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._api = api;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._bodyElement = document.querySelector(`body`);
    this._fimCard = null;
    this._filmDetails = null;
    this._state = State.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
  }

  render(film, state) {
    this._state = state;
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

    this._filmDetails = new FilmDetails(film, this._api);
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
    this._filmDetails.setDeleteButtonClickListener((evt) => {
      evt.preventDefault();

      const deleteButton = evt.target;
      const comment = deleteButton.closest(`.film-details__comment`);
      const commentId = comment.id;
      const comments = film.comments.filter((commentItem) => commentItem.id !== commentId);

      this._onDataChange(this, film, Object.assign(film, {comments}));
    });
    this._filmDetails.setAddCommentListener((evt) => {
      const isEnterAndCtrl = evt.key === `Enter` && evt.ctrlKey;
      if (isEnterAndCtrl) {
        const newComment = this._filmDetails.collectComment();
        if (!newComment) {
          return;
        }
        newComment.filmId = film.id;
        const newComments = film.comments.concat(newComment);
        this._onDataChange(this, film, Object.assign(film, {comments: newComments}));
      }
    });
    this._filmDetails.setCloseButtonClickListener(() => {
      this._closeFilmDetailsPopup();
    });

    if (oldFilmCard && oldFilmDetails) {
      replace(this._fimCard, oldFilmCard);
      replace(this._filmDetails, oldFilmDetails);
    } else {
      render(this._container.querySelector(`.films-list__container`), this._fimCard);
    }
  }

  setDefaultView() {
    if (this._state !== State.DEFAULT) {
      this._closeFilmDetailsPopup();
    }
  }

  destroy() {
    remove(this._fimCard);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _closeFilmDetailsPopup() {
    this._filmDetails.resetAddCommentForm();
    this._filmDetails.getElement().remove();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === Key.ESCAPE;

    if (isEscKey) {
      this._filmDetails.getElement().remove();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onFilmCardClick() {
    this._onViewChange();
    render(this._bodyElement, this._filmDetails);
    this._state = State.DETAILS;

    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._filmDetails.setCloseButtonClickListener(() => {
      this._closeFilmDetailsPopup();
    });
  }

}
