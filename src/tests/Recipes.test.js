import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import Meals from '../pages/Meals';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import RecipesProvider from '../context/RecipesProvider';

describe('Testa o componente Recipes', () => {
  const idSearch = 'search-top-btn';
  const searchInput = 'search-input';
  const idRecipesBtn = 'exec-search-btn';

  beforeEach(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => mealsByIngredient,
    }));
  });

  it('Ao clicar no ícone de meals e drinks, vai para a sua respectiva rota', async () => {
    renderWithRouter(
      <RecipesProvider value={ mealsByIngredient }>
        <Meals />
      </RecipesProvider>,
    );

    const searchBtn = screen.getByTestId(idSearch);
    userEvent.click(searchBtn);

    const inputText = screen.getByTestId(searchInput);
    const ingrInput = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingrInput);

    userEvent.type(inputText, 'chicken');
    const getRecipesBtn = screen.getByTestId(idRecipesBtn);
    userEvent.click(getRecipesBtn);

    const firstRecipe = screen.getByTestId('0-recipe-card');
    expect(firstRecipe).toBeVisible();
  });
});
