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
  console.log(recipeDetail);

  useEffect(() => {
    fetchRecipe(url);
  }, [url]);

  // console.log(recipeDetail[path]);

  return (
    (recipeDetail && (recipeDetail[path].map((recipe, index) => (
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
    ))
    ))
  );
};

export default RecipeDetails;
