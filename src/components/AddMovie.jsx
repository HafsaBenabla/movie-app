import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMovie = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    posterUrl: '',
    rating: '',
    trailerUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/movies', movie);
      navigate('/');
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Ajouter un nouveau film</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={movie.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL de l'affiche</label>
          <input
            type="url"
            name="posterUrl"
            value={movie.posterUrl}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Note</label>
          <input
            type="number"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            required
            min="0"
            max="10"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL de la bande-annonce</label>
          <input
            type="url"
            name="trailerUrl"
            value={movie.trailerUrl}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ajouter le film
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
