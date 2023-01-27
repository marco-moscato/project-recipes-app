import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [data, setData] = useState('');

  const contextValue = useMemo(
    () => ({
      data,
      setData,
    }),
    [data],
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
