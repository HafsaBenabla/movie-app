import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ films, estPersonnel, onSupprimer }) {
    return (
        <div className="films">
            {films.map(film => (
                <MovieCard
                    key={film.id || film._id}
                    film={film}
                    estPersonnel={estPersonnel}
                    onSupprimer={onSupprimer}
                />
            ))}
        </div>
    );
}

export default MovieList;
