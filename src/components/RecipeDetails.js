import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import fetchRecipes from '../services/RecipesApi';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';

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
    }
    if (location.pathname.includes('/drinks')) {
      const id = location.pathname.replace('/drinks/', '');
      setRecipeId(id);
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setPath('drinks');
      setThumb('strDrinkThumb');
      setName('strDrink');
    }
  }, []);
  // console.log(path);

  const checkedItemSaved = () => {
    if (!save) {
      return null;
    }
    // const id = location.pathname.replace('/drinks/', '');
    save.includes(recipeId) ? setDisable(true) : setDisable(false);
  };

  const checkedItemInProgress = () => {
    if (path) {
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      Object.keys(progress[path]).includes(recipeId)
        ? setTextBtn('Continue Recipe')
        : console.log(progress);
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
      15997: [1, 2, 3],
      17222: [1, 2, 3],
      17225: [1],
      178319: [1],
    },
    meals: {
      52977: [1, 2, 3, 4],
      52771: [1, 2, 3, 4],
    },
  };
  
  useEffect(() => {
    setSave(localStorage.getItem('doneRecipes'));
    fetchRecipe(url);
    localStorage.setItem('doneRecipes', JSON.stringify(recipeSaved));
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
    checkedItemSaved();
    checkedItemInProgress();
  }, [url]);
  return (
    (
      recipeDetail && (recipeDetail[path].map((recipe, index) => (
        <>
          <div
            key={ index }
          >
            <h1
              data-testid="recipe-title"
            >
              {recipe[name]}
            </h1>
            <img
              data-testid="recipe-photo"
              src={ recipe[thumb] }
              alt={ recipe[name] }
            />
          </div>
          <FavoriteBtn />
          <ShareBtn />
          {!disable
            && <Link
              to={ `/${path}/${recipeId}/in-progress` }
            >
              <button
                key={ recipeId + index }
                data-testid="start-recipe-btn"
                type="button"
                className="startRecipeBtn"
              >
                {textBtn}
              </button>
            </Link>}
        </>
      ))
      )
    )
  );
};

export default RecipeDetails;
