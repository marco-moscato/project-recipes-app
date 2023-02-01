import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from './FavoritesContext';
import { getLocalStorage } from '../services/localStorage';

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    setFavorites(getLocalStorage());
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={ favorites }>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.shape({
  }),
}.isRequired;

export default FavoritesProvider;
