import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FavoritesContext from '../context/FavoritesContext';
import ShareBtn from '../components/ShareBtn';
// import blackHeart from '../images/blackHeartIcon.svg';
// import RecipesContext from '../context/RecipesContext';

function FavoriteRecipes() {
  const { favMeals, favDrinks } = useContext(FavoritesContext);

  return (
    <div>
      <Header
        title="Favorite Recipes"
        haveSearch={ false }
      />

      <button
        data-testid="filter-by-meal-btn"
        type="button"
        // onClick={ () => setPath('meal') }
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
        // onClick={ () => setPath('drink') }
      >
        Drinks
      </button>

      <button
        data-testid="filter-by-all-btn"
        type="button"
        // onClick={ () => setPath('') }
      >
        All
      </button>

      { favMeals.lenght > 0 && (favMeals.map((fav, i) => (
        <div key={ i }>
          <img
            data-testid={ `${i}-horizontal-image` }
            src={ fav.image }
            alt={ fav.name }
          />
          <p data-testid={ `${i}-horizontal-name` }>{ fav.name }</p>
          <p data-testid={ `${i}-horizontal-top-text` }>
            { `${fav.nationality} - ${fav.category}` }
          </p>
          <ShareBtn />
          <button
            data-testid={ `${i}-horizontal-favorite-btn` }
            type="button"
          >
            <img
              data-testid="favorite-btn"
              src={ blackHeart }
              alt="heart"
            />
          </button>

        </div>
      )))}

      { favDrinks.lenght > 0 && (favDrinks.map((fav, i) => (
        <div key={ i }>
          <img
            data-testid={ `${i}-horizontal-image` }
            src={ fav.image }
            alt={ fav.name }
          />
          <p data-testid={ `${i}-horizontal-name` }>{ fav.name }</p>
          <p data-testid={ `${i}-horizontal-top-text` }>
            { fav.alcoholicOrNot }
          </p>
          <ShareBtn />
          <button
            data-testid={ `${i}-horizontal-favorite-btn` }
            type="button"
          >
            <img
              data-testid="favorite-btn"
              src={ blackHeart }
              alt="heart"
            />
          </button>

        </div>
      )))}

      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
