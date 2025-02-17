import React from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieList.css';

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          overview={movie.overview}
          poster_path={movie.poster_path}
          release_date={movie.release_date}
          vote_average={movie.vote_average}
        />
      ))}
    </div>
  );
}

export default MovieList;
