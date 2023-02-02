import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from './FavoritesContext';
// import { getLocalStorage } from '../services/localStorage';

function FavoritesProvider({ children }) {
  const [favMeals, setFavMeals] = useState([]);
  const [favDrinks, setFavDrinks] = useState([]);
  console.log(setFavMeals);
  console.log(setFavDrinks);

  // const loadFavorites = () => {
  //   getLocalStorage()
  //     .filter((fav) => (fav.type === 'meal' ? setFavMeals(fav) : setFavDrinks(fav)));
  // };

  // useEffect(() => {
  //   loadFavorites();
  // }, []);

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
