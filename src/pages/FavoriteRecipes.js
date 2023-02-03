import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FavoritesContext from '../context/FavoritesContext';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const { favRecipes, copyToClickboard, modal,
    removeFavorite, handleFilters } = useContext(FavoritesContext);

  return (
    <div>
      <Header
        title="Favorite Recipes"
        haveSearch={ false }
      />

      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ (e) => handleFilters(e) }
        name="filter-by-meal-btn"
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
        name="filter-by-drink-btn"
        onClick={ (e) => handleFilters(e) }
      >
        Drinks
      </button>

      <button
        data-testid="filter-by-all-btn"
        type="button"
        name="filter-all"
        onClick={ (e) => handleFilters(e) }
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
            onClick={ (e) => removeFavorite(fav, e) }
          >
            <img
              data-testid={ `${i}-horizontal-favorite-btn` }
              src={ blackHeart }
              alt="heart"
            />
          </button>

          <Link to={ `/${fav.type}s/:${fav.id}` }>
            <img
              data-testid={ `${i}-horizontal-image` }
              src={ fav.image }
              alt={ fav.name }
            />
          </Link>
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
