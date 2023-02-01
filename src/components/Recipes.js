/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchRecipes from '../services/RecipesApi';
import FilterByCategory from './FilterByCategory';

function Recipes() {
  const { data, categoryRecipes, setCategoryRecipes, path, setPath, initialAPI,
    setInitialAPI } = useContext(RecipesContext);
  // const [path, setPath] = useState('');
  const [strName, setStrName] = useState('');
  const [strThumb, setStrThumb] = useState('');
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');
  const [urlCategory, setUrlCategory] = useState('');
  const { location } = useHistory();
  const magic = 12;
  const [recipes, setRecipes] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const renderRecipes = () => {
    if (location.pathname === '/meals') {
      setPath('meals');
      setId('idMeal');
      setStrName('strMeal');
      setStrThumb('strMealThumb');
      setUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setUrlCategory('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    }
    if (location.pathname === '/drinks') {
      setPath('drinks');
      setId('idDrink');
      setStrName('strDrink');
      setStrThumb('strDrinkThumb');
      setUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setUrlCategory('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    }
  };

  const initialCallAPI = async (param) => {
    const callApi = await fetchRecipes(param);
    setInitialAPI(callApi);
    setRecipes(callApi);
    return callApi;
  };

  useEffect(() => {
    renderRecipes();
    // test(url);
    initialCallAPI(url);
  }, [url]);

  useEffect(() => {
    renderRecipes();
    setRecipes(data);
  }, [data]);

  // useEffect(() => {
  //   console.log(categoryRecipes, 'entra no didUpdate do categoryRecipes');
  //   setCategoryRecipes(categoryRecipes);
  //   // setRecipes(categoryRecipes);
  // }, [categoryRecipes]);

  const resetFilters = () => {
    setCategoryRecipes(null);
    setRecipes(initialAPI);
  };

  return (
    <>
      <FilterByCategory url={ urlCategory } path={ path } />
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => resetFilters() }
      >
        All

      </button>
      Recipes
      {
        categoryRecipes ? (categoryRecipes.map((recipe, index) => (
          index < magic
          && (
            <Link
              to={ `/${path}/${recipe[id]}` }
              key={ index }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe[strThumb] }
                  alt={ recipe[strName] }
                />
                <p data-testid={ `${index}-card-name` }>{ recipe[strName] }</p>
              </div>
            </Link>
          )
        )))
          : recipes && recipes[location.pathname.replace('/', '')]
            .map((recipe, index) => (
              index < magic
          && (
            <Link
              to={ `/${path}/${recipe[id]}` }
              key={ index }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe[strThumb] }
                  alt={ recipe[strName] }
                />
                <p data-testid={ `${index}-card-name` }>{ recipe[strName] }</p>
              </div>
            </Link>
          )
            ))
      }
    </>
  );
}

export default Recipes;
