import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from './FavoritesContext';
import { getLocalStorage, removeItemFromLocalStorage } from '../services/LocalStorageDoneRecipes';

function FavoritesProvider({ children }) {
  const [favRecipes, setFavRecipes] = useState([]);
  const [modal, setModal] = useState('none');

  useEffect(() => {
    const loadFavorites = () => {
      const localStorage = getLocalStorage('favoriteRecipes');
      if (localStorage !== []) {
        setFavRecipes(localStorage);
      }
    };
    loadFavorites();
  }, []);

  const removeFavorite = (fav) => {
    removeItemFromLocalStorage('favoriteRecipes', fav);
    console.log(fav);
  };

  const copyToClickboard = (recipe) => {
    const magicTimeout = 2000;
    const recipeURL = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    navigator.clipboard.writeText(recipeURL);
    setModal('block');
    setTimeout(() => {
      setModal('none');
    }, magicTimeout);
  };

  const contextValue = useMemo(
    () => ({
      favRecipes,
      modal,
      copyToClickboard,
      removeFavorite,
    }),
    [
      favRecipes,
      modal,
      copyToClickboard,
      removeFavorite,
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
