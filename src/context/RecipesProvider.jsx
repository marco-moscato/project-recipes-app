import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [data, setData] = useState('');
  const [categoryRecipes, setCategoryRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleOn, setToggleOn] = useState(false);

  const contextValue = useMemo(
    () => ({
      data,
      setData,
      categoryRecipes,
      setCategoryRecipes,
      isLoading,
      setIsLoading,
      toggleOn,
      setToggleOn,
    }),
    [
      data,
      categoryRecipes,
      isLoading,
      toggleOn,
    ],
  );
  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.shape({
  }),
}.isRequired;

export default RecipesProvider;
