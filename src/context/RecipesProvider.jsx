import React from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  return (
    <RecipesContext.Provider>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.shape({
  }),
}.isRequired;

export default RecipesProvider;
