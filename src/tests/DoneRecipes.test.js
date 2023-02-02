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

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});
jest.spyOn(navigator.clipboard, 'writeText');

const doneRecipes = 'doneRecipes';

describe('Testes da Página Done Recipes', () => {
  const setItem = (jsonId, newJson) => {
    window.localStorage.setItem(jsonId, JSON.stringify(newJson));
  };

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

  it('Ao clicar no botão share, o link é copiado', () => {
    renderWithRouter(<DoneRecipes />);
    const shareButtonn = screen.getByTestId('0-share-btn');
    userEvent.click(shareButtonn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/53061');
  });

  it('Testa se as receitas foram colocadas no localStorage', () => {
    renderWithRouter(<DoneRecipes />);
    const shareButton = screen.getByTestId('0-share-btn');
    userEvent.click(shareButton);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
    const copiedMessage = screen.findByTestId('link-copied');
    waitForElementToBeRemoved(() => copiedMessage);
  });
});
