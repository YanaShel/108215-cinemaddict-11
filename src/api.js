import Movie from "./models/movie";
import Comment from "./models/comment";

const StatusCode = {
  OK: 200,
  MULTIPLE_CHOICE: 300
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(Movie.parseFilms);
  }

  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then((response) => response.json())
      .then((Comment.parseComments));
  }

  postComment(movieId, comment) {
    return this._load({
      url: `comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(Comment.toRAW(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then((film) => Comment.parseComments(film.comments));
  }

  deleteComment(id) {
    return this._load({url: `comments/${id}`, method: Method.DELETE});
  }

  updateFilm(id, movie) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(Movie.toRAW(movie)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Movie.parseFilm);
  }

  _checkStatus(response) {
    if (response.status >= StatusCode.OK && response.status < StatusCode.MULTIPLE_CHOICE) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(this._checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
