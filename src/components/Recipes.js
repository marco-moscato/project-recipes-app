import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchRecipes from '../services/RecipesApi';

function Recipes() {
  const { data, setData } = useContext(RecipesContext);
  const [path, setPath] = useState('');
  const [strName, setStrName] = useState('');
  const [strThumb, setStrThumb] = useState('');
  const { location } = useHistory();
  const magic = 12;
  const [url, setUrl] = useState('');

  const renderRecipes = () => {
    if (location.pathname === '/meals') {
      setPath('meals');
      setStrName('strMeal');
      setStrThumb('strMealThumb');
      setUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    if (location.pathname === '/drinks') {
      setPath('drinks');
      setStrName('strDrink');
      setStrThumb('strDrinkThumb');
      setUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  };
  const test = async () => {
    if (!data) setData(await fetchRecipes(url));
    console.log(data);
    console.log(await fetchRecipes(url));
  };

  useEffect(() => {
    renderRecipes();
    test();
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
