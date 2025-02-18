import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import AddMovie from './components/AddMovie';
import Filter from './components/Filter';
import { getFilmsPopulaires, rechercherFilms, ajouterFilm, getMesFilms } from './api';
import './App.css';

function App() {
  const [films, setFilms] = useState([]);
  const [filmsNonFiltres, setFilmsNonFiltres] = useState([]);
  const [mesFilms, setMesFilms] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [filtres, setFiltres] = useState({
    title: '',
    rating: 0
  });

  // Charger les films au démarrage
  useEffect(() => {
    chargerFilms();
    chargerMesFilms();
  }, []);

  // Charger les films de l'API TMDB
  const chargerFilms = async () => {
    try {
      const response = await getFilmsPopulaires();
      setFilms(response.data.results);
      setFilmsNonFiltres(response.data.results);
    } catch (error) {
      console.error("Erreur lors du chargement des films:", error);
    }
  };

  // Charger mes films personnels
  const chargerMesFilms = async () => {
    try {
      const response = await getMesFilms();
      setMesFilms(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement de mes films:", error);
    }
  };

  // Fonction de recherche
  const handleRecherche = async () => {
    try {
      if (recherche.trim() === '') {
        chargerFilms();
        return;
      }
      const response = await rechercherFilms(recherche);
      setFilms(response.data.results);
      setFilmsNonFiltres(response.data.results);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  // Fonction de filtrage
  const handleFilterChange = (filter) => {
    const newFiltres = { ...filtres, [filter.type]: filter.value };
    setFiltres(newFiltres);

    let resultatsFiltrés = [...filmsNonFiltres];

    if (newFiltres.title) {
      resultatsFiltrés = resultatsFiltrés.filter(film =>
        film.title.toLowerCase().includes(newFiltres.title.toLowerCase())
      );
    }

    if (newFiltres.rating > 0) {
      resultatsFiltrés = resultatsFiltrés.filter(film =>
        film.vote_average >= newFiltres.rating
      );
    }

    setFilms(resultatsFiltrés);
  };

  // Fonction pour ajouter un film
  const handleAjoutFilm = async (nouveauFilm) => {
    try {
      await ajouterFilm(nouveauFilm);
      alert('Film ajouté avec succès !');
      // Recharger la liste des films personnels
      chargerMesFilms();
    } catch (error) {
      console.error("Erreur lors de l'ajout du film:", error);
      alert("Erreur lors de l'ajout du film");
    }
  };

  return (
    <div className="App">
      <h1>🎬 Application de Films</h1>
      <SearchBar 
        recherche={recherche}
        setRecherche={setRecherche}
        onRecherche={handleRecherche}
      />
      <Filter onFilterChange={handleFilterChange} />
      <AddMovie onAjout={handleAjoutFilm} />
      
      {/* Afficher mes films personnels */}
      <h2>Mes Films</h2>
      <MovieList 
        films={mesFilms}
        estPersonnel={true}
      />

      {/* Afficher les films de TMDB */}
      <h2>Films Populaires</h2>
      <MovieList 
        films={films}
        estPersonnel={false}
      />
    </div>
  );
}

export default App;