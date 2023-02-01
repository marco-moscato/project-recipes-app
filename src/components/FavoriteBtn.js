import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
// import RecipesContext from '../context/RecipesContext';

function FavoriteBtn(props) {
  const [click, setClick] = useState(true);
  const [idRecipe, setIdRecipe] = useState('');
  // const { path } = useContext(RecipesContext);
  const { value } = props;
  const { location } = useHistory();

  // const arr = [];
  console.log(value);

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
    }
    return favoriteRecipe;
  };

  // para adicionar e remover FAVORITOS do local storage.
  const setLocalStorage = (param) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(param));
  };
  const getLocalStorage = () => JSON.parse(localStorage.getItem('favoriteRecipes'));
  const removeFromLocalStorage = (param) => {
    // const storage = getLocalStorage();
    setLocalStorage(param);
  };
  const setOrGetLocalStorage = (param) => {
    if (getLocalStorage() !== null || getLocalStorage() !== []) {
      const localSaved = getLocalStorage();
      // const getSaved = (...localSaved, param)
      // tá quase certo. tem que ter spread de alguma forma
      setLocalStorage([...localSaved, param]);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(param));
    }
  };

  useEffect(() => {
    if (location.pathname.includes('meals')) {
      setIdRecipe(value.meals[0].idMeal);
    } else {
      setIdRecipe(value.drinks[0].idDrink);
    }
    const storage = getLocalStorage();
    console.log(storage);
    if (storage !== null) {
      console.log(storage);
      const isOnLocal = storage.some((e) => e.id === idRecipe);
      setClick(!isOnLocal);
    }
  }, [location.pathname, idRecipe, value]);

  const handleClick = () => {
    const storage = getLocalStorage();
    if (storage !== null) {
      const isOnLocal = storage.some((e) => e.id === idRecipe);
      const objeto = storage.filter((e) => e.id !== idRecipe);
      console.log(isOnLocal);
      if (isOnLocal) {
        removeFromLocalStorage(objeto);
        setClick(!click);
      } else {
        setClick(!click);
        checkPath();
        setOrGetLocalStorage(checkPath());
      }
    } else {
      setClick(!click);
      checkPath();
      setLocalStorage([checkPath()]);
    }
  };

  return (
    <button
      // data-testid="favorite-btn"
      type="button"
      onClick={ handleClick }
    >
      <img
        data-testid="favorite-btn"
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
