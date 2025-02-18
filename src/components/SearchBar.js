import React from 'react';

function SearchBar({ recherche, setRecherche, onRecherche }) {
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            onRecherche();
        }
    }

    return (
        <div className="recherche">
            <input
                type="text"
                placeholder="Rechercher un film..."
                value={recherche}
                onChange={e => setRecherche(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button onClick={onRecherche}>
                Rechercher
            </button>
        </div>
    );
}

export default SearchBar;
