import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import DoneRecipes from './DoneRecipes';
import FavoritesContext from '../context/FavoritesContext';
import ShareBtn from '../components/ShareBtn';

function FavoriteRecipes() {
  const { favMeals, favDrinks } = useContext(FavoritesContext);

  return (
    <div>
      <Header
        title="Favorite Recipes"
        haveSearch={ false }
      />
      {/* <DoneRecipes /> */}

      { favMeals.map((fav) => (
        <div key={ fav.id }>
          FavoriteMeals
          <img src={ fav.img } alt={ fav.name } />
          Foto da receita
          <p>{ fav.name }</p>
          <div data-testid={ `${fav.id}-horizontal-top-text` }>
            {`${fav.nationality} - ${fav.category}` }
          </div>
          <ShareBtn />
          {/* renderizar botão favorites */}
        </div>
      ))}

      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
