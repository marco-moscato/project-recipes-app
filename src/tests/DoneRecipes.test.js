import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import DoneRecipes from '../pages/DoneRecipes';

const mockRecipes = [{
  id: '53061',
  type: 'meal',
  nationality: 'Croatian',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Fresh sardines',
  image: 'https://www.themealdb.com/images/media/meals/nv5lf31628771380.jpg',
  doneDate: '',
  tags: ['Fresh'],
},
{
  id: '52859',
  type: 'meal',
  nationality: 'American',
  category: 'Dessert',
  alcoholicOrNot: '',
  name: 'Key Lime Pie',
  image: 'https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg',
  doneDate: '',
  tags: ['Cake', 'Pie', 'Desert', 'Fruity,Sour'],
},
{
  id: '13222',
  type: 'drink',
  nationality: '',
  category: 'Shot',
  alcoholicOrNot: 'Alcoholic',
  name: 'Big Red',
  image: 'https://www.thecocktaildb.com/images/media/drink/yqwuwu1441248116.jpg',
  doneDate: '2015-09-03 03:41:56',
  tags: [],
},
{
  id: '178325',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aperol Spritz',
  image: 'https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg',
  doneDate: '',
  tags: [],
}];

describe('Testa o componente Footer', () => {
  const setItem = (jsonId, newJson) => {
    window.localStorage.setItem(jsonId, JSON.stringify(newJson));
  };

  const doneRecipes = 'doneRecipes';

  beforeAll(() => {
    setItem(doneRecipes, mockRecipes);
  });

  it('Testa se as receitas foram colocadas no localStorage', () => {
    expect(localStorage.getItem(doneRecipes)).toEqual(JSON.stringify(mockRecipes));
  });

  it('Ao clicar nos botões de filtros, renderiza as receitas corretamente', () => {
    renderWithRouter(<DoneRecipes />);
    const mealFilterButton = screen.getByRole('button', { name: /meals/i });
    const drinksFilterButton = screen.getByRole('button', { name: /drinks/i });
    const allFilterButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allFilterButton);

    userEvent.click(mealFilterButton);
    const meal = screen.getByRole('img', { name: /fresh sardines/i });
    expect(meal).toBeVisible();
    userEvent.click(drinksFilterButton);
    const drink = screen.getByRole('img', { name: /big red/i });
    expect(drink).toBeVisible();
    expect(meal).not.toBeVisible();
  });

  it('Testa se as receitas foram colocadas no localStorage', () => {
    renderWithRouter(<DoneRecipes />);
    const shareButton = screen.getByTestId('0-share-btn');
    userEvent.click(shareButton);
    const copiedMessage = screen.findByTestId('link-copied');
    waitForElementToBeRemoved(() => copiedMessage);
    // 'http://localhost:3000/meals/53061'
  });
});
