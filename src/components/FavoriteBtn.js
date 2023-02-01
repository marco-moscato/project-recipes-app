import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
// import RecipesContext from '../context/RecipesContext';

function FavoriteBtn(props) {
  const [click, setClick] = useState(true);
  // const { path } = useContext(RecipesContext);
  const { value } = props;
  const { location } = useHistory();

  // console.log(path);
  const arr = [];

  const checkPath = () => {
    let favoriteRecipe = {};
    if (location.pathname.includes('meals')) {
      favoriteRecipe = {
        id: value.meals[0].idMeal,
        type: 'meal',
        nationality: value.meals[0].strArea,
        category: value.meals[0].strCategory,
        alcoholicOrNot: '',
        name: value.meals[0].strMeal,
        image: value.meals[0].strMealThumb,
      };
      // return arr.push(favoriteRecipe);
    }
    if (location.pathname.includes('drinks')) {
      favoriteRecipe = {
        id: value.drinks[0].idDrink,
        type: 'drink',
        nationality: '',
        category: value.drinks[0].strCategory,
        alcoholicOrNot: value.drinks[0].strAlcoholic,
        name: value.drinks[0].strDrink,
        image: value.drinks[0].strDrinkThumb,
      };
      // return arr.push(favoriteRecipe);
    }
    return arr.push(favoriteRecipe);
  };

  // para adicionar e remover FAVORITOS do local storage.
  const setLocalStorage = (param) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(param));
  };
  const getLocalStorage = () => JSON.parse(localStorage.getItem('favoriteRecipes'));
  // const removeFromLocalStorage = () => localStorage.removeItem('favoriteRecipes');
  const setOrGetLocalStorage = (param) => {
    if (getLocalStorage() !== null) {
      const getSaved = [...getLocalStorage(), param];
      setLocalStorage(getSaved);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(param));
      console.log(param);
      console.log('entrou no else do setOrGet');
    }
  };

  const handleClick = () => {
    setClick(!click);
    checkPath();
    setOrGetLocalStorage(arr);
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
