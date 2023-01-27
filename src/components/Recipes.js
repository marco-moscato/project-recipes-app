import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { data } = useContext(RecipesContext);
  const [path, setPath] = useState('');
  const [strName, setStrName] = useState('');
  const [strThumb, setStrThumb] = useState('');
  const { location } = useHistory();
  const magic = 12;

  const renderRecipes = () => {
    if (location.pathname === '/meals') {
      setPath('meals');
      setStrName('strMeal');
      setStrThumb('strMealThumb');
    }
    if (location.pathname === '/drinks') {
      setPath('drinks');
      setStrName('strDrink');
      setStrThumb('strDrinkThumb');
    }
  };

  useEffect(() => {
    renderRecipes();
  }, [data]);

  return (
    <>
      Recipes
      { data && data[path].map((recipe, index) => (
        index < magic
          && (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe[strThumb] }
                alt={ recipe[strName] }
              />
              <p data-testid={ `${index}-card-name` }>{ recipe[strName] }</p>
            </div>
          )
      ))}
    </>
  );
}

export default Recipes;
