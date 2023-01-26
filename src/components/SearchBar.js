import React, { useEffect, useState } from 'react';
import fetchRecipes from '../services/RecipesApi';

function SearchBar() {
  const [textSearch, setTextSearch] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    switch (endpoint) {
    case 'ingr':
      setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${textSearch}`);
      break;

    case 'nome':
      setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${textSearch}`);
      break;

    case 'first':
      setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${textSearch}`);
      break;

    default:
      setUrl('');
    }
  }, [textSearch, endpoint]);

  const handleClik = async () => {
    const alert = 'Your search must have only 1 (one) character';
    if (textSearch.length !== 1 && endpoint === 'first') global.alert(alert);
    await fetchRecipes(url);
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
