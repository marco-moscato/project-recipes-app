import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchRecipes from '../services/RecipesApi';

function SearchBar() {
  const [textSearch, setTextSearch] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [url, setUrl] = useState('');
  const [changeApi, setChangeApi] = useState('');
  const [page, setPage] = useState('');
  const [id, setId] = useState('');

  const { setData } = useContext(RecipesContext);
  const { location, push } = useHistory();

  useEffect(() => {
    if (location.pathname === '/meals') {
      setChangeApi('themealdb');
      setPage('meals');
      setId('idMeal');
    }
    if (location.pathname === '/drinks') {
      setChangeApi('thecocktaildb');
      setPage('drinks');
      setId('idDrink');
    }
  }, [location.pathname]);

  useEffect(() => {
    switch (endpoint) {
    case 'ingr':
      setUrl(`https://www.${changeApi}.com/api/json/v1/1/filter.php?i=${textSearch}`);
      break;

    case 'nome':
      setUrl(`https://www.${changeApi}.com/api/json/v1/1/search.php?s=${textSearch}`);
      break;

    case 'first':
      setUrl(`https://www.${changeApi}.com/api/json/v1/1/search.php?f=${textSearch}`);
      break;

    default:
      setUrl('');
    }
  }, [textSearch, endpoint, changeApi]);

  const handleClik = async () => {
    const alert = 'Your search must have only 1 (one) character';

    if (textSearch.length !== 1 && endpoint === 'first') {
      return global.alert(alert);
    }
    const recipes = await fetchRecipes(url);

    if (recipes[page] === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (recipes[page].length === 1) {
      return push(`/${page}/${recipes[page][0][id]}`);
    }

    setData(recipes);
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        placeholder="digite sua pesquisa"
        onChange={ ({ target }) => setTextSearch(target.value) }
        value={ textSearch }
      />
      <label htmlFor="Ingredients">
        Ingredients
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="searchRadio"
          id="Ingredients"
          value="ingr"
          onChange={ ({ target }) => setEndpoint(target.value) }
        />
      </label>
      <label htmlFor="Name">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          name="searchRadio"
          value="nome"
          id="Name"
          onChange={ ({ target }) => setEndpoint(target.value) }
        />
      </label>
      <label htmlFor="First Letter">
        First Letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="searchRadio"
          value="first"
          id="First Letter"
          onChange={ ({ target }) => setEndpoint(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClik }
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SearchBar;
