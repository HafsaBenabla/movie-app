import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaRegHeart, FaHeart, FaSearch } from 'react-icons/fa';

const API_KEY = '98d79a7251b4050b7449d0443748f383';
const TMDB_API_URL = 'https://api.themoviedb.org/3';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [personalMovies, setPersonalMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchRating, setSearchRating] = useState('');
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('popular');

  useEffect(() => {
    fetchMovies();
    fetchPersonalMovies();
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${TMDB_API_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: 'fr-FR',
          page: 1
        }
      });
      
      const formattedMovies = response.data.results.map(movie => ({
        _id: movie.id,
        title: movie.title,
        description: movie.overview,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        backdropUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        rating: movie.vote_average,
        releaseDate: movie.release_date
      }));

      setMovies(formattedMovies);
      setError(null);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Erreur lors du chargement des films depuis TMDB.');
    }
  };

  const fetchPersonalMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/movies');
      setPersonalMovies(response.data);
    } catch (error) {
      console.error('Error fetching personal movies:', error);
    }
  };

  const toggleFavorite = (movie, event) => {
    event.preventDefault();
    const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = currentFavorites.some(fav => fav._id === movie._id);
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = currentFavorites.filter(fav => fav._id !== movie._id);
    } else {
      newFavorites = [...currentFavorites, movie];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav._id === movieId);
  };

  const currentMovies = activeTab === 'popular' ? movies : personalMovies;
  
  const filteredMovies = currentMovies.filter(movie => {
    return movie.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
           (!searchRating || movie.rating >= parseFloat(searchRating));
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-6 text-white/80">
            <Link to="/" className="text-xl font-bold text-white">CINEMA</Link>
            <button className="hover:text-white">ABOUT</button>
            <button className="hover:text-white">VIDEOS</button>
            <button className="hover:text-white">FEATURED</button>
            <button className="hover:text-white">GALLERY</button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un film..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <input
              type="number"
              placeholder="Note min."
              value={searchRating}
              onChange={(e) => setSearchRating(e.target.value)}
              className="w-24 px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
              min="0"
              max="10"
              step="0.1"
            />
          </div>
        </nav>

        {/* Onglets */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-white/20 p-1">
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'popular'
                  ? 'bg-white text-gray-900'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Films Populaires
            </button>
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'personal'
                  ? 'bg-white text-gray-900'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Mes Films
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <div key={movie._id} className="group relative">
              <Link to={`/movie/${movie._id}`}>
                <div className="relative overflow-hidden rounded-lg bg-gray-800 transition-transform group-hover:scale-105">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-[400px] object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-xl font-bold text-white mb-2">{movie.title}</h2>
                      <p className="text-white/80 text-sm line-clamp-2">{movie.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-yellow-400">{movie.rating.toFixed(1)}/10</span>
                        <span className="text-white/60">{new Date(movie.releaseDate).getFullYear()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                onClick={(e) => toggleFavorite(movie, e)}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                {isFavorite(movie._id) ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-white text-xl" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 flex justify-between items-center text-white/60">
          <p>&copy; 2025 Cinema App. Tous droits réservés.</p>
          <div className="flex items-center space-x-4">
            <span>FOLLOW US</span>
            <div className="flex space-x-2">
              <a href="#" className="hover:text-white">FB</a>
              <a href="#" className="hover:text-white">IG</a>
              <a href="#" className="hover:text-white">TW</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
