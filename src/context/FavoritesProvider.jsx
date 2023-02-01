import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from './FavoritesContext';
import { getLocalStorage } from '../services/localStorage';

function FavoritesProvider({ children }) {
  const [favMeals, setFavMeals] = useState([]);
  const [favDrinks, setFavDrinks] = useState([]);

  const loadFavorites = () => {
    getLocalStorage()
      .filter((fav) => (fav.type === 'meal' ? setFavMeals(fav) : setFavDrinks(fav)));
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={ { favMeals, favDrinks } }>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.shape({
  }),
}.isRequired;

export default FavoritesProvider;
