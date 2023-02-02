import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FavoritesContext from '../context/FavoritesContext';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';

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
        onClick={ () => setPath('meal') }
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setPath('drink') }
      >
        Drinks
      </button>

      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setPath('') }
      >
        All
      </button>

      <img data-testid={ `${index}-horizontal-imag` } src="" alt="" />
      Imagem da receita

      <p data-testid={ `${index}-horizontal-top-text` }>Categoria</p>

      <p data-testid={ `${index}-horizontal-name` }>Nome da receita</p>

      <ShareBtn />

      <Footer />
      <FavoriteBtn />
    </div>
  );
}

export default FavoriteRecipes;
