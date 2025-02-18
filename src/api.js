import axios from 'axios';

// Configuration
const API_KEY = '98d79a7251b4050b7449d0443748f383';
const API_URL = 'http://localhost:5000/api';

// Films TMDB
function getFilmsPopulaires() {
    return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR`);
}

function rechercherFilms(query) {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr-FR&query=${query}`);
}

// Films personnels
function getMesFilms() {
    return axios.get(`${API_URL}/films`);
}

function ajouterFilm(film) {
    return axios.post(`${API_URL}/films`, film);
}

function supprimerFilm(id) {
    return axios.delete(`${API_URL}/films/${id}`);
}

export {
    getFilmsPopulaires,
    rechercherFilms,
    getMesFilms,
    ajouterFilm,
    supprimerFilm
};
