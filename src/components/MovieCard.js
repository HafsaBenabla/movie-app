import React from 'react';

function MovieCard({ film, estPersonnel, onSupprimer }) {
    // Obtenir l'URL de l'image
    const imageUrl = film.poster_path 
        ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
        : film.image || 'https://via.placeholder.com/500x750';

    // Obtenir le titre
    const titre = film.title || film.titre;

    // Obtenir la description
    const description = film.overview || film.description;

    // Obtenir la note
    const note = film.vote_average || film.note || 0;

    return (
        <div className="film">
            <img src={imageUrl} alt={titre} />
            <h3>{titre}</h3>
            <p className="note">★ {note}/10</p>
            <p className="description">{description}</p>
            
            {estPersonnel && (
                <button 
                    className="supprimer"
                    onClick={() => onSupprimer(film._id)}
                >
                    Supprimer
                </button>
            )}
        </div>
    );
}

export default MovieCard;
