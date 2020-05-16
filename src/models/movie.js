export default class Movie {
  constructor(movie) {
    this.id = movie[`id`];
    this.name = movie[`film_info`][`title`];
    this.nameOriginal = movie[`film_info`][`alternative_title`];
    this.director = movie[`film_info`][`director`];
    this.poster = movie[`film_info`][`poster`];
    this.description = movie[`film_info`][`description`];
    this.writers = movie[`film_info`][`writers`];
    this.actors = movie[`film_info`][`actors`];
    this.country = movie[`film_info`][`release`][`release_country`];
    this.duration = movie[`film_info`][`runtime`];
    this.genres = movie[`film_info`][`genre`];
    this.rating = movie[`film_info`][`total_rating`];
    this.age = movie[`film_info`][`age_rating`];
    this.releaseDate = new Date(movie[`film_info`][`release`][`date`]);
    this.comments = movie[`comments`];
    this.isWatched = Boolean(movie[`user_details`][`already_watched`]);
    this.isFavorite = Boolean(movie[`user_details`][`favorite`]);
    this.isWatchlist = Boolean(movie[`user_details`][`watchlist`]);
    this.watchingDate = new Date(movie[`user_details`][`watching_date`]);
  }

  static toRAW(movie) {
    return {
      "id": movie.id,
      "comments": movie.comments,
      "film_info": {
        "title": movie.name,
        "alternative_title": movie.nameOriginal,
        "total_rating": movie.rating,
        "poster": movie.poster,
        "age_rating": movie.age,
        "director": movie.director,
        "writers": movie.writers,
        "actors": movie.actors,
        "release": {
          "date": movie.releaseDate,
          "release_country": movie.country
        },
        "runtime": movie.duration,
        "genre": movie.genres,
        "description": movie.description,
      },
      "user_details": {
        "watchlist": movie.isWatchlist,
        "already_watched": movie.isWatched,
        "watching_date": movie.watchingDate,
        "favorite": movie.isFavorite
      }
    };
  }

  static parseFilm(movie) {
    return new Movie(movie);
  }

  static parseFilms(movies) {
    return movies.map(Movie.parseFilm);
  }
}


