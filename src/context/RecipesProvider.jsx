import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
// import fetchRecipes from '../services/RecipesApi';

function RecipesProvider({ children }) {
  const [data, setData] = useState('');
  const [categoryRecipes, setCategoryRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleOn, setToggleOn] = useState(false);
  const [path, setPath] = useState('');
  const [initialAPI, setInitialAPI] = useState(null);

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
      path,
      setPath,
      initialAPI,
      setInitialAPI,
    }),
    [
      data,
      categoryRecipes,
      isLoading,
      toggleOn,
      path,
      initialAPI,
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
