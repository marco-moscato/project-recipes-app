import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from './FavoritesContext';
import { getLocalStorage } from '../services/LocalStorageDoneRecipes';

function FavoritesProvider({ children }) {
  const [favMeals, setFavMeals] = useState([]);
  const [favDrinks, setFavDrinks] = useState([]);

  const loadFavorites = () => {
    if (getLocalStorage !== null) {
      getLocalStorage('favoriteRecipes')
        .filter((fav) => (fav.type === 'meal' ? setFavMeals(fav) : setFavDrinks(fav)));
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const contextValue = useMemo(
    () => ({
      favMeals,
      favDrinks,
    }),
    [
      favMeals,
      favDrinks,
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
