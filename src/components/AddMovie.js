import React, { useState } from 'react';
import '../styles/AddMovie.css';

const AddMovie = ({ onAddMovie }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMovie(newMovie);
    setNewMovie({ title: '', description: '', posterURL: '', rating: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <h3>Ajouter un nouveau film</h3>
      <input
        type="text"
        name="title"
        value={newMovie.title}
        onChange={handleChange}
        placeholder="Titre du film"
        required
      />
      <textarea
        name="description"
        value={newMovie.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="url"
        name="posterURL"
        value={newMovie.posterURL}
        onChange={handleChange}
        placeholder="URL de l'affiche"
        required
      />
      <input
        type="number"
        name="rating"
        value={newMovie.rating}
        onChange={handleChange}
        placeholder="Note sur 10"
        min="0"
        max="10"
        required
      />
      <button type="submit">Ajouter le film</button>
    </form>
  );
};

export default AddMovie;
