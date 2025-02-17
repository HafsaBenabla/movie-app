import React from 'react';
import '../styles/Filter.css';

const Filter = ({ onFilterChange }) => {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Rechercher par titre..."
        onChange={(e) => onFilterChange({ type: 'title', value: e.target.value })}
        className="filter-input"
      />
      <input
        type="number"
        min="0"
        max="10"
        placeholder="Note minimale..."
        onChange={(e) => onFilterChange({ type: 'rating', value: e.target.value })}
        className="filter-input"
      />
    </div>
  );
};

export default Filter;
