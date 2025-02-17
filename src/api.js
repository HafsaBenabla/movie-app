import axios from 'axios';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = process.env.REACT_APP_API_URL;

// Récupérer les films populaires
export const getPopularMovies = (page = 1) => {
    return axios.get(`${TMDB_BASE_URL}/movie/popular`, {
        params: {
            api_key: TMDB_API_KEY,
            language: 'fr-FR',
            page
        }
    });
};

// Rechercher des films
export const searchMovies = (query, page = 1) => {
    return axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
            api_key: TMDB_API_KEY,
            language: 'fr-FR',
            query,
            page
        }
    });
};

// Récupérer les films par catégorie
export const getMoviesByCategory = (category, page = 1) => {
    return axios.get(`${TMDB_BASE_URL}/movie/${category}`, {
        params: {
            api_key: TMDB_API_KEY,
            language: 'fr-FR',
            page
        }
    });
};

// API Backend
export const getLocalMovies = () => {
    return axios.get(`${API_URL}/movies`);
};

export const addLocalMovie = (movie) => {
    return axios.post(`${API_URL}/movies`, movie);
};
