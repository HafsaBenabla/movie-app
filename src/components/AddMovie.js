import React, { useState } from 'react';

function AddMovie({ onAjout }) {
    const [film, setFilm] = useState({
        titre: '',
        description: '',
        image: '',
        note: 0
    });

    function handleSubmit(e) {
        e.preventDefault();
        onAjout(film);
        // Réinitialiser le formulaire
        setFilm({
            titre: '',
            description: '',
            image: '',
            note: 0
        });
    }

    return (
        <form onSubmit={handleSubmit} className="formulaire">
            <h2>Ajouter un film</h2>
            
            <input
                type="text"
                placeholder="Titre du film"
                value={film.titre}
                onChange={e => setFilm({...film, titre: e.target.value})}
                required
            />

            <textarea
                placeholder="Description du film"
                value={film.description}
                onChange={e => setFilm({...film, description: e.target.value})}
                required
            />

            <input
                type="text"
                placeholder="URL de l'image"
                value={film.image}
                onChange={e => setFilm({...film, image: e.target.value})}
                required
            />

            <input
                type="number"
                placeholder="Note sur 10"
                min="0"
                max="10"
                value={film.note}
                onChange={e => setFilm({...film, note: Number(e.target.value)})}
                required
            />

            <button type="submit">Ajouter</button>
        </form>
    );
}

export default AddMovie;
