import React from 'react';

function FilterByCategory(props) {
  const { urlCategory } = props;
  const magic = 4;
  return (
    <div>
      { urlCategory.map((cat, index) => (
        index > magic
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
