class Movie {
    constructor(
      public id: string,
      public title: string,
      public director: string,
      public releaseYear: number,
      public genre: string,
      public ratings: number[] = []
    ) {}
  
    getAverageRating(): number {
      if (this.ratings.length === 0) return 0;
      return this.ratings.reduce((sum, rating) => sum + rating, 0) / this.ratings.length;
    }
  }
  
  class MovieManagement {
    private movies: Map<string, Movie> = new Map();
  
    addMovie(id: string, title: string, director: string, releaseYear: number, genre: string): void {
      if (this.movies.has(id)) {
        console.log("Movie with this ID already exists.");
        return;
      }
      this.movies.set(id, new Movie(id, title, director, releaseYear, genre));
    }
  
    rateMovie(id: string, rating: number): void {
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
  
    getAverageRating(id: string): number | undefined {
      const movie = this.movies.get(id);
      return movie ? movie.getAverageRating() : undefined;
    }
  
    getTopRatedMovies(): Movie[] {
      return Array.from(this.movies.values()).sort((a, b) => b.getAverageRating() - a.getAverageRating());
    }
  
    getMoviesByGenre(genre: string): Movie[] {
      return Array.from(this.movies.values()).filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    }
  
    getMoviesByDirector(director: string): Movie[] {
      return Array.from(this.movies.values()).filter(movie => movie.director.toLowerCase() === director.toLowerCase());
    }
  
    searchMoviesBasedOnKeyword(keyword: string): Movie[] {
      return Array.from(this.movies.values()).filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
    }
  
    getMovie(id: string): Movie | undefined {
      return this.movies.get(id);
    }
  
    removeMovie(id: string): void {
      if (!this.movies.delete(id)) {
        console.log("Movie not found.");
      }
    }
  }
  
  // Example Usage:
  const movieManager = new MovieManagement();
  movieManager.addMovie("1", "Inception", "Christopher Nolan", 2010, "Sci-Fi");
  movieManager.addMovie("2", "Interstellar", "Christopher Nolan", 2014, "Sci-Fi");
  movieManager.rateMovie("1", 5);
  movieManager.rateMovie("1", 4);
  movieManager.rateMovie("2", 5);
  console.log(movieManager.getTopRatedMovies());
  