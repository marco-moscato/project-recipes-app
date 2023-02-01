import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

function FavoriteBtn(props) {
  const [click, setClick] = useState(true);
  const { path } = useContext(RecipesContext);
  const { value } = props;

  console.log(path);
  const arr = []; 

  const checkPath = () => {
    let favoriteRecipe = {};
    if (path === 'meals') {
      favoriteRecipe = {
        id: value[path][0].idMeal,
        type: 'meal',
        nationality: value[path][0].strArea,
        category: value[path][0].strCategory,
        alcoholicOrNot: '',
        name: value[path][0].strMeal,
        image: value[path][0].strMealThumb,
      };
    }
    if (path === 'drinks') {
      favoriteRecipe = {
        id: value[path][0].idDrink,
        type: 'drink',
        nationality: value[path][0].strArea,
        category: value[path][0].strCategory,
        alcoholicOrNot: value[path][0].strAlcoholic,
        name: value[path][0].strDrink,
        image: value[path][0].strDrinkThumb,
      };
    }
    return arr.push(favoriteRecipe);
  };

  const handleClick = () => {
    setClick(!click);
    checkPath()
    localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
  };
  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ handleClick }
    >
      <img
        src={ click ? whiteHeart : blackHeart }
        alt="heart"
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  value: PropTypes.shape({
  }),
}.isRequired;

export default FavoriteBtn;
