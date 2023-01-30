import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchRecipes from '../services/RecipesApi';
import FilterByCategory from './FilterByCategory';

function Recipes() {
  const { data, setData } = useContext(RecipesContext);
  const [path, setPath] = useState('');
  const [strName, setStrName] = useState('');
  const [strThumb, setStrThumb] = useState('');
  const [url, setUrl] = useState('');
  const [urlCategory, setUrlCategory] = useState('');
  const { location } = useHistory();
  const magic = 12;
  const [recipes, setRecipes] = useState(null);

  const renderRecipes = () => {
    if (location.pathname === '/meals') {
      setPath('meals');
      setStrName('strMeal');
      setStrThumb('strMealThumb');
      setUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setUrlCategory('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    }
    if (location.pathname === '/drinks') {
      setPath('drinks');
      setStrName('strDrink');
      setStrThumb('strDrinkThumb');
      setUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setUrlCategory('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    }
  };
  const test = async (param) => {
    if (!data && param) {
      const callApi = await fetchRecipes(param);
      setRecipes(callApi);
    }
  };

  useEffect(() => {
    renderRecipes();
    test(url);
  }, [url]);

  useEffect(() => {
    renderRecipes();
  }, []);

  return (
    <>
      <FilterByCategory url={urlCategory} path={path} />
      Recipes
      { recipes && recipes[location.pathname.replace('/', '')].map((recipe, index) => (
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

// * Cada botão deve conter o atributo prefixado `data-testid=${categoryName}-category-filter` e devem ser exibidas apenas as 5 primeiras categorias retornadas da API.
//   * Caso as receitas sejam de comida, deve-se exibir as 5 primeiras categorias de comida obtidas por meio do endpoint `https://www.themealdb.com/api/json/v1/1/list.php?c=list`;
//   * Caso as receitas sejam de bebida, deve-se exibir as 5 primeiras categorias de bebida obtidas por meio do endpoint `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`.
