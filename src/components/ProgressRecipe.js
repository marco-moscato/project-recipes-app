/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchRecipes from '../services/RecipesApi';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';

function ProgressRecipe() {
  const { location } = useHistory();
  const [url, setUrl] = useState('');
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [path, setPath] = useState('');
  const [thumb, setThumb] = useState('');
  const [name, setName] = useState('');
  const [instruc, setInstruc] = useState('');
  const [cat, setCat] = useState('');
  const [alcoholic, setAlcoholic] = useState('');
  const [recipeId, setRecipeId] = useState('');

  console.log(recipeDetail);
  // const progressRecipe = {
  //   drinks: {
  //     15997: [],
  //   },
  //   meals: {
  //     52977: [],
  //   },
  // };

  // const fetchRecipe = async (param) => {
  //   const api = await fetchRecipes(param);
  //   setRecipeDetail(api);
  // };

  useEffect(() => {
    if (location.pathname.includes('/meals')) {
      const editId = location.pathname.replace('/meals/', '');
      const id = editId.replace('/in-progress', '');
      setRecipeId(id);
      setUrl(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setPath('meals');
      setThumb('strMealThumb');
      setName('strMeal');
      setCat('strCategory');
      setInstruc('strInstructions');
    }
    if (location.pathname.includes('/drinks')) {
      const editId = location.pathname.replace('/drinks/', '', '/in-progress', '');
      const id = editId.replace('/in-progress', '');
      setRecipeId(id);
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setPath('drinks');
      setThumb('strDrinkThumb');
      setName('strDrink');
      setCat('strCategory');
      setAlcoholic('strAlcoholic');
      setInstruc('strInstructions');
    }
  }, []);

  useEffect(() => {
    setRecipeDetail(() => JSON.parse(localStorage.getItem('recipeDetail')));
  }, []);

  console.log(recipeDetail);

  return (
    (recipeDetail && (recipeDetail[path].map((recipe, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ recipe[thumb] }
          alt={ recipe[name] }
        />
        <p data-testid="recipe-title">
          {recipe[name]}
        </p>
        <p data-testid="recipe-category">
          {recipe[cat]}
        </p>
        <ul
          key={ `ul${index}` }
        >
          {Object.keys(recipe)
            .filter((recipeKey) => recipeKey.includes('Ingredient'))
            .map((ingredient, i) => (
              recipe[ingredient] !== null
                ? (
                  <li
                    data-testid={ `${i}-ingredient-name-and-measure` }
                    key={ `ingredient${i}` }
                  >
                    { `${recipe[ingredient]} ${recipe[`strMeasure${i + 1}`]}`}
                  </li>
                )
                : null
            ))}
        </ul>
        <p data-testid="instructions">
          {recipe[instruc]}
        </p>
        {alcoholic && (<p>{recipe[alcoholic]}</p>)}
        <FavoriteBtn value={ recipeDetail } />
        <ShareBtn />
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          {' '}
          botão de finalizar receita
        </button>
      </div>)))
    ));
}

export default ProgressRecipe;
