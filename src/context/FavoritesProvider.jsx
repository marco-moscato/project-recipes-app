import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from './FavoritesContext';
import { removeItemFromLocalStorage, getLocalStorage } from
  '../services/LocalStorageDoneRecipes';

function FavoritesProvider({ children }) {
  const [favRecipes, setFavRecipes] = useState([]);
  const [modal, setModal] = useState('none');

  useEffect(() => {
    const loadFavorites = () => {
      const currentLS = localStorage.getItem('favoriteRecipes');
      const parsedLS = currentLS ? JSON.parse(currentLS) : [];
      return parsedLS;
    };
    setFavRecipes(loadFavorites());
  }, []);

  const removeFavorite = (fav, e) => {
    e.preventDefault();
    setFavRecipes(removeItemFromLocalStorage('favoriteRecipes', fav));
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

  const handleFilters = (e) => {
    // e.preventDefault();
    const localStorage = getLocalStorage('favoriteRecipes');
    const { name } = e.target;
    if (name === 'filter-by-meal-btn') {
      const filter = localStorage.filter((fav) => fav.type === 'meal');
      setFavRecipes(filter);
    }
    if (name === 'filter-by-drink-btn') {
      const filter = localStorage.filter((fav) => fav.type === 'drink');
      setFavRecipes(filter);
    }
    if (name === 'filter-all') {
      setFavRecipes(localStorage);
    }
  };

  const contextValue = useMemo(
    () => ({
      favRecipes,
      modal,
      copyToClickboard,
      removeFavorite,
      handleFilters,
    }),
    [
      favRecipes,
      modal,
      copyToClickboard,
      removeFavorite,
      handleFilters,
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
