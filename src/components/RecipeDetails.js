import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchRecipes from '../services/RecipesApi';

const RecipeDetails = () => {
  const { location } = useHistory();
  const [url, setUrl] = useState('');
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [path, setPath] = useState('');
  const [thumb, setThumb] = useState('');
  const [name, setName] = useState('');
  const [save, setSave] = useState([]);
  const [disable, setDisable] = useState(false);

  const fetchRecipe = async (param) => {
    const api = await fetchRecipes(param);
    setRecipeDetail(api);
  };
  useEffect(() => {
    if (location.pathname.includes('/meals')) {
      const id = location.pathname.replace('/meals/', '');
      setUrl(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setPath('meals');
      setThumb('strMealThumb');
      setName('strMeal');
    }
    if (location.pathname.includes('/drinks')) {
      const id = location.pathname.replace('/drinks/', '');
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setPath('drinks');
      setThumb('strDrinkThumb');
      setName('strDrink');
    }
  }, []);
  // console.log(recipeDetail);

  const checkedItemSaved = () => {
    if (!save) { 
      return null
    } else {
      const id = location.pathname.replace('/drinks/', '');
      save.includes(id) ? setDisable(true) : setDisable(false)
    }    
  }
  
  useEffect(() => {
    setSave(localStorage.getItem('doneRecipes'))
    fetchRecipe(url);
    localStorage.setItem('doneRecipes', JSON.stringify(recipeSaved));
    checkedItemSaved()
  }, [url]);
  

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
]


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
          {/* {console.log(recipe)} */}
          </div>
          {!disable && <button
            data-testid="start-recipe-btn"
            type="button"
            className='startRecipeBtn'
          >
            Start Recipe
          </button>}
        </>
      ))
      )
    )
  );
};

export default RecipeDetails;
