import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DoneRecipes from './DoneRecipes';

function FavoriteRecipes() {
  // mocks
  const index = 1;
  const nationality = 'frech';
  const category = 'pasta';

  return (
    <div>
      <Header
        title="Favorite Recipes"
        haveSearch={ false }
      />
      <DoneRecipes />
      <div data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category}` }
      </div>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
