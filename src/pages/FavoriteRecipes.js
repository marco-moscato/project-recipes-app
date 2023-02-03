import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FavoritesContext from '../context/FavoritesContext';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const { favRecipes } = useContext(FavoritesContext);

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

      { favRecipes.map((fav, i) => (
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

          <button
            type="button"
          >
            <img
              data-testid={ `${i}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
            />
          </button>

          <button
            // data-testid={ `${i}-horizontal-favorite-btn` }
            type="button"
          >
            <img
              data-testid={ `${i}-horizontal-favorite-btn` }
              src={ blackHeart }
              alt="heart"
            />
          </button>

        </div>
      ))}

      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
