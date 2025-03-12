"use strict";
class Movie {
    id;
    title;
    director;
    releaseYear;
    genre;
    ratings;
    constructor(id, title, director, releaseYear, genre, ratings = []) {
        this.id = id;
        this.title = title;
        this.director = director;
        this.releaseYear = releaseYear;
        this.genre = genre;
        this.ratings = ratings;
    }
    getAverageRating() {
        if (this.ratings.length === 0)
            return 0;
        return this.ratings.reduce((sum, rating) => sum + rating, 0) / this.ratings.length;
    }
}
class MovieManagement {
    movies = new Map();
    addMovie(id, title, director, releaseYear, genre) {
        if (this.movies.has(id)) {
            console.log("Movie with this ID already exists.");
            return;
        }
        this.movies.set(id, new Movie(id, title, director, releaseYear, genre));
    }
    rateMovie(id, rating) {
        const movie = this.movies.get(id);
        if (!movie) {
            console.log("Movie not found.");
            return;
        }
        if (rating < 1 || rating > 5) {
            console.log("Rating should be between 1 and 5.");
            return;
        }
        movie.ratings.push(rating);
    }
    getAverageRating(id) {
        const movie = this.movies.get(id);
        return movie ? movie.getAverageRating() : undefined;
    }
    getTopRatedMovies() {
        return Array.from(this.movies.values()).sort((a, b) => b.getAverageRating() - a.getAverageRating());
    }
    getMoviesByGenre(genre) {
        return Array.from(this.movies.values()).filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    }
    getMoviesByDirector(director) {
        return Array.from(this.movies.values()).filter(movie => movie.director.toLowerCase() === director.toLowerCase());
    }
    searchMoviesBasedOnKeyword(keyword) {
        return Array.from(this.movies.values()).filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
    }
    getMovie(id) {
        return this.movies.get(id);
    }
    removeMovie(id) {
        if (!this.movies.delete(id)) {
            console.log("Movie not found.");
        }
    }
}
// Example Usage:
const movieManager = new MovieManagement();
movieManager.addMovie("1", "Inception", "Christopher Nolan", 2010, "Sci-Fi");
movieManager.addMovie("2", "Interstellar", "Christopher Nolan", 2014, "Sci-Fi");
movieManager.addMovie("3", "3 Idiots", "Rajkumar Hirani", 2009, "Comedy");
movieManager.addMovie("4", "Dilwale Dulhania Le Jayenge", "Aditya Chopra", 1995, "Romance");
movieManager.rateMovie("1", 5);
movieManager.rateMovie("1", 4);
movieManager.rateMovie("2", 5);
console.log(movieManager.getTopRatedMovies());
