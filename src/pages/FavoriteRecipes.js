import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header
        title="Favorite Recipes"
        haveSearch={ false }
      />
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
