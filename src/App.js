import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [films, setFilms] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [nouveauFilm, setNouveauFilm] = useState({
    titre: '',
    description: '',
    image: ''
  });

  const API_KEY = '98d79a7251b4050b7449d0443748f383';

  // Charger les films populaires au démarrage
  useEffect(() => {
    chargerFilmsPopulaires();
  }, []);

  // Fonction pour charger les films populaires
  const chargerFilmsPopulaires = async () => {
    const reponse = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`
    );
    setFilms(reponse.data.results);
  };

  // Fonction pour rechercher des films
  const rechercherFilms = async () => {
    if (recherche.trim() === '') {
      chargerFilmsPopulaires();
      return;
    }
    const reponse = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr-FR&query=${recherche}&page=1`
    );
    setFilms(reponse.data.results);
  };

  // Fonction pour ajouter un film à MongoDB
  const ajouterFilm = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/films', nouveauFilm);
    setNouveauFilm({ titre: '', description: '', image: '' });
    alert('Film ajouté avec succès !');
  };

  return (
    <div className="app">
      <h1>🎬 Films</h1>

      {/* Barre de recherche */}
      <div className="recherche">
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && rechercherFilms()}
        />
        <button onClick={rechercherFilms}>Rechercher</button>
      </div>

      {/* Formulaire d'ajout de film */}
      <form onSubmit={ajouterFilm} className="formulaire">
        <h2>Ajouter un nouveau film</h2>
        <input
          type="text"
          placeholder="Titre du film"
          value={nouveauFilm.titre}
          onChange={(e) => setNouveauFilm({...nouveauFilm, titre: e.target.value})}
          required
        />
        <textarea
          placeholder="Description du film"
          value={nouveauFilm.description}
          onChange={(e) => setNouveauFilm({...nouveauFilm, description: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="URL de l'image"
          value={nouveauFilm.image}
          onChange={(e) => setNouveauFilm({...nouveauFilm, image: e.target.value})}
          required
        />
        <button type="submit">Ajouter le film</button>
      </form>

      {/* Liste des films */}
      <div className="films">
        {films.map(film => (
          <div key={film.id} className="film">
            <img
              src={film.poster_path 
                ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                : 'https://via.placeholder.com/500x750?text=Pas+d%27image'
              }
              alt={film.title}
            />
            <h3>{film.title}</h3>
            <p className="date">Date de sortie : {new Date(film.release_date).toLocaleDateString('fr-FR')}</p>
            <p className="note">★ {film.vote_average.toFixed(1)}/10</p>
            <p className="description">{film.overview || 'Pas de description disponible'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
