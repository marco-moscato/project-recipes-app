import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import fetchRecipes from '../services/RecipesApi';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';
import '../styles/RecipeDetails.css';

const RecipeDetails = () => {
  const { location } = useHistory();
  const [url, setUrl] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [path, setPath] = useState('');
  const [thumb, setThumb] = useState('');
  const [name, setName] = useState('');
  const [save, setSave] = useState([]);
  const [disable, setDisable] = useState(false);
  const [textBtn, setTextBtn] = useState('Start Recipe');
  const [recommendationAPI, setRecommendationAPI] = useState(null);
  const [recommendationURL, setRecommendationURL] = useState('');

  const fetchRecipe = async (param) => {
    const api = await fetchRecipes(param);
    setRecipeDetail(api);
  };
  useEffect(() => {
    if (location.pathname.includes('/meals')) {
      const id = location.pathname.replace('/meals/', '');
      setRecipeId(id);
      setUrl(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setPath('meals');
      setThumb('strMealThumb');
      setName('strMeal');
      setRecommendationURL('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
    if (location.pathname.includes('/drinks')) {
      const id = location.pathname.replace('/drinks/', '');
      setRecipeId(id);
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setPath('drinks');
      setThumb('strDrinkThumb');
      setName('strDrink');
      setRecommendationURL('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  }, []);
  // console.log(path);

  const checkedItemSaved = () => {
    if (!save) {
      return null;
    }
    if (save.includes(recipeId)) {
      return setDisable(true);
    }
    return setDisable(false);
  };

  const checkedItemInProgress = () => {
    if (!path) {
      return;
    }
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Object.keys(progress[path]).includes(recipeId)) {
      return setTextBtn('Continue Recipe');
    }
  };

  //* Simula o finish recipe. item para localstorage
  const recipeSaved = [
    {
      id: 15997,
    },
    {
      id: 15900,
    },
    {
      id: 15995,
    },
    {
      id: 13501,
    },
  ];
  const progressRecipe = {
    drinks: {
      15997: [1],
      17222: [1],
      17225: [1],
      178319: [1],
    },
    meals: {
      52977: [1],
      52771: [1],
    },
  };

  const recommendationCallAPI = async (param) => {
    const callApi = await fetchRecipes(param);
    setRecommendationAPI(callApi);
  };

  useEffect(() => {
    setSave(localStorage.getItem('doneRecipes'));
    fetchRecipe(url);
    localStorage.setItem('doneRecipes', JSON.stringify(recipeSaved));
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    checkedItemSaved();
    checkedItemInProgress();
    recommendationCallAPI(recommendationURL);
  }, [url]);

  console.log(recommendationAPI);

  return (
    (
      recipeDetail && (recipeDetail[path].map((recipe, index) => (
        <>
          <div
            key={ index }
          >
            <h1
              data-testid="recipe-title"
              key={ `tittle${index}` }
            >
              {recipe[name]}
            </h1>
            <img
              key={ `image${index}` }
              data-testid="recipe-photo"
              className="detailImg"
              src={ recipe[thumb] }
              alt={ recipe[name] }
            />
            {
              path === 'drinks'
                ? (
                  <span
                    key={ `category${index}` }
                    data-testid="recipe-category"
                  >
                    {`${recipe.strCategory}(${recipe.strAlcoholic})`}
                  </span>
                )
                : (
                  <span
                    key={ `category${index}` }
                    data-testid="recipe-category"
                  >
                    {recipe.strCategory}
                  </span>
                )
            }
            <ul
              key={ `ul${index}` }
              // puxar um filter?
            >
              {Object.keys(recipe)
                .filter((recipeKey) => recipeKey.includes('Ingredient'))
                .map((ingredient, i) => (
                  recipe[ingredient] !== ''
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
            <p
              data-testid="instructions"
              key={ `instruc${index}` }
            >
              {recipe.strInstructions}
            </p>
            {
              path === 'meals' && (
                <iframe
                  key={ `frame${index}` }
                  data-testid="video"
                  src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                  title={ recipe[name] }
                />
              )
            }
          </div>
          <FavoriteBtn key={ `favor${index}` } />
          <ShareBtn key={ `share${index}` } />
          {!disable
            && (
              <Link
                to={ `/${path}/${recipeId}/in-progress` }
                key={ `Link${index}` }
              >
                <button
                  key={ recipeId + index }
                  data-testid="start-recipe-btn"
                  type="button"
                  className="startRecipeBtn"
                >
                  {textBtn}
                </button>
              </Link>
            )}
        </>
      ))
      )
    )
  );
};

export default RecipeDetails;
