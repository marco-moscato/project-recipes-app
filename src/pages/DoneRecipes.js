import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const index = 1; // mock
  const tagName = 'tagName'; // mock

  return (
    <div>
      <Header
        title="Done Recipes"
        haveSearch={ false }
      />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      <img data-testid={ `${index}-horizontal-image` } alt="" />
      Imagem do Card
      <p data-testid={ `${index}-horizontal-top-text` }>Categoria da receita</p>
      <p data-testid={ `${index}-horizontal-name` }>Nome da receita</p>
      <p data-testid={ `${index}-horizontal-done-date` }>Data da receita</p>
      <p data-testid={ `${index}-horizontal-share-btn` }>Compartilhar Receita</p>
      <p data-testid={ `${index}-${tagName}-horizontal-tag` }>Tag</p>
    </div>
  );
}

export default DoneRecipes;
