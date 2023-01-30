import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../services/RecipesApi';
import RecipesContext from '../context/RecipesContext';

function FilterByCategory(props) {
  const { url, path } = props;
  const [categories, setCategories] = useState([]);
  const { setCategoryRecipes, toggleOn, setToggleOn } = useContext(RecipesContext);
  // const [toggleOn, setToggleOn] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const fetchUrlCategory = await fetchRecipes(url);
        setCategories(fetchUrlCategory[path]);
        return fetchUrlCategory[path];
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [url, path]);

  /* lógica do botão toggle ainda não esta correta */
  const handleClick = async (param) => {
    if (path === 'meals') {
      if (toggleOn) {
        const callApi = await fetchRecipes(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${param}`);
        setCategoryRecipes(callApi.meals);
        setToggleOn(!toggleOn);
      } else {
        setCategoryRecipes(null);
        setToggleOn(!toggleOn);
      }
    }
    if (path === 'drinks') {
      if (toggleOn) {
        setCategoryRecipes(null);
        setToggleOn(!toggleOn);
      } else {
        const callApi = await fetchRecipes(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${param}`);
        setCategoryRecipes(callApi.drinks);
      }
    }
    console.log(path);
  };
  const magic5 = 5;
  return (
    <div>
      { categories.map((cat, index) => (
        index < magic5
        && (
          <button
            key={ index }
            data-testid={ `${cat.strCategory}-category-filter` }
            onClick={ () => handleClick(cat.strCategory) }
          >
            { cat.strCategory }

          </button>)

      ))}
    </div>
  );
}

FilterByCategory.propTypes = {
  urlCategory: PropTypes.string,
}.isRequired;

export default FilterByCategory;

// {"meals":[{"strCategory":"Beef"},{"strCategory":"Breakfast"},{"strCategory":"Chicken"},{"strCategory":"Dessert"},{"strCategory":"Goat"},{"strCategory":"Lamb"},{"strCategory":"Miscellaneous"},{"strCategory":"Pasta"},{"strCategory":"Pork"},{"strCategory":"Seafood"},{"strCategory":"Side"},{"strCategory":"Starter"},{"strCategory":"Vegan"},{"strCategory":"Vegetarian"}]}
