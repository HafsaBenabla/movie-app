import React from 'react';
import '../styles/MovieCard.css';

function MovieCard({ title, overview, poster_path, release_date, vote_average }) {
  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=Pas+d%27image';

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} className="movie-poster" />
      <div className="movie-info">
        <h3>{title}</h3>
        {release_date && (
          <p className="release-date">{formatDate(release_date)}</p>
        )}
        {vote_average > 0 && (
          <p className="rating">★ {vote_average.toFixed(1)}</p>
        )}
        <p className="overview">{overview}</p>
      </div>
    </div>
  );
}

export default MovieCard;
