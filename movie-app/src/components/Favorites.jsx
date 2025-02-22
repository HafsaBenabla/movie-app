import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Favorites = () => {
  // Récupérer les favoris du localStorage
  const getFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  };

  const removeFavorite = (movieId) => {
    const favorites = getFavorites().filter(movie => movie._id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    // Force le re-render du composant
    window.location.reload();
  };

  const favorites = getFavorites();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Films Favoris</h1>
      
      {favorites.length === 0 ? (
        <p className="text-gray-600">Vous n'avez pas encore de films favoris.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(movie => (
            <div key={movie._id} className="border rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <Link to={`/movie/${movie._id}`}>
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                    }}
                  />
                </Link>
                <button
                  onClick={() => removeFavorite(movie._id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-100"
                >
                  <FaHeart className="text-red-500 text-xl" />
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">{movie.title}</h2>
                <p className="text-gray-600">Note: {movie.rating.toFixed(1)}/10</p>
                <p className="text-gray-500 mt-2 line-clamp-3">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
