import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FavoritesContext from '../context/FavoritesContext';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const { favRecipes, copyToClickboard, modal } = useContext(FavoritesContext);
  console.log(copyToClickboard);

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

      <p
        data-testid="link-copied"
        style={ { display: [modal] } }
      >
        Link copied!
      </p>

      { favRecipes.map((fav, i) => (
        <div key={ i }>

          <button
            type="button"
            onClick={ () => copyToClickboard(fav) }
          >
            <img
              data-testid={ `${i}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
            />
          </button>

          <button
            type="button"

          >
            <img
              data-testid={ `${i}-horizontal-favorite-btn` }
              src={ blackHeart }
              alt="heart"
            />
          </button>

          <img
            data-testid={ `${i}-horizontal-image` }
            src={ fav.image }
            alt={ fav.name }
          />
          <p data-testid={ `${i}-horizontal-name` }>{ fav.name }</p>
          <p data-testid={ `${i}-horizontal-top-text` }>
            { `${fav.nationality} - ${fav.category}` }
          </p>
          { fav.type === 'drink'
          && <p data-testid={ `${i}-horizontal-top-text` }>{ fav.alcoholicOrNot }</p>}

        </div>
      ))}

      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
