import React, { useContext } from 'react';
import FavoritesContext from '../context/FavoritesContext';

function FavoriteMeals() {
  const { favorites } = useContext(FavoritesContext);
  console.log(favorites);

  return (
    <div>
      FavoriteMeals
      <img alt="" />
      Foto da receita
      <p>Nome</p>
      <div data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category}` }
      </div>
      <button>Compartilhar</button>
      <button>Desfavoritar</button>
    </div>
  );
}

export default FavoriteMeals;
