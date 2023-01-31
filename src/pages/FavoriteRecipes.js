import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DoneRecipes from './DoneRecipes';

function FavoriteRecipes() {
  return (
    <div>
      <Header
        title="Favorite Recipes"
        haveSearch={ false }
      />
      <DoneRecipes />
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;

// [{
//   id: id-da-receita,
//   type: meal-ou-drink,
//   nationality: nacionalidade-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita
// }]
