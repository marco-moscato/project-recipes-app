import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from './FavoritesContext';
import { setOrGetLocalStorage } from '../services/localStorage';

function FavoritesProvider({ children }) {
  const [sugDrinks, setSugDrinks] = useState([]);
  const [sugMeals, setSugMeals] = useState([]);
  const drink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const meal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const mealToLocalStorage = {
    id: '1234',
    type: 'meal',
    nationality: 'italian',
    category: 'pasta',
    alcoholicOrNot: 'no',
    name: 'penne a carbonara',
    image: '',
  };

  //   const callAPI = async () => {
  //     const reqDrink = await fetchRecipes(drink);
  //     const reqMeal = await fetchRecipes(meal);
  //     setSugDrinks(reqDrink);
  //     setSugMeals(reqMeal);
  //   };
  //   callAPI();

  const favorites = () => setOrGetLocalStorage(mealToLocalStorage);
  favorites();

  return (
    <FavoritesContext.Provider value={ { sugDrinks, sugMeals } }>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.shape({
  }),
}.isRequired;

export default FavoritesProvider;
