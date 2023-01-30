import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchRecipes from '../services/RecipesApi';

function FilterByCategory(props) {
  const { url, path } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const fetchUrlCategory = await fetchRecipes(url);
        setCategories(fetchUrlCategory[path]);
        return fetchUrlCategory[path]
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [url, path]);

  const magic5 = 5;
  return (
    <div>
      { categories.map((cat, index) => (
        index < magic5
        && (
          <button key={ index } data-testid={ `${cat.strCategory}-category-filter` }>
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
