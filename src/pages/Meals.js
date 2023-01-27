import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div>
      <Header
        title="Meals"
        haveSearch
      />
      <Recipes />
    </div>
  );
}

export default Meals;
