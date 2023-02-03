import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from './FavoritesContext';
import { getLocalStorage } from '../services/LocalStorageDoneRecipes';

function FavoritesProvider({ children }) {
  const [favRecipes, setFavRecipes] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const localStorage = getLocalStorage('favoriteRecipes');
      if (localStorage !== []) {
        setFavRecipes(localStorage);
      }
    };
    loadFavorites();
  }, []);

  const contextValue = useMemo(
    () => ({
      favRecipes,
    }),
    [
      favRecipes,
    ],
  );

  return (
    <FavoritesContext.Provider value={ contextValue }>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.shape({
  }),
}.isRequired;

export default FavoritesProvider;
