import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const loginBtnTestId = 'login-submit-btn';
const validEmail = 'teste@teste.com';
const recipeCardId = '0-recipe-card';
const recipeName = 'Spicy Arrabiata Penne';
// const drinkName = '747';

describe('Testes da página de receita em progresso', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(fetch);
  });

  test('testa se a pagina renderiza os elementos da receita meal', async () => {
    renderWithRouter(
      <App />,
    );
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginSubmitBtn = screen.getByTestId(loginBtnTestId);

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginSubmitBtn);

    await waitFor(() => screen.getByText('Corba'));
    const recipeCard = screen.getByTestId(recipeCardId);
    userEvent.click(recipeCard);

    await waitFor(() => screen.getByText(recipeName));
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);

    await waitFor(() => screen.getByText(recipeName));
    const labelIng = screen.getByTestId('0-ingredient-step');

    expect(labelIng).toBeInTheDocument();
  });

  //   test('testa se a pagina renderiza os elementos da receita drink', async () => {
  //     renderWithRouter(
  //       <App />,
  //     );
  //     const emailInput = screen.getByTestId(emailTestId);
  //     const passwordInput = screen.getByTestId(passwordTestId);
  //     const loginSubmitBtn = screen.getByTestId(loginBtnTestId);

  //     userEvent.type(emailInput, validEmail);
  //     userEvent.type(passwordInput, '1234567');
  //     userEvent.click(loginSubmitBtn);

  //     await waitFor(() => screen.getByText('Corba'));
  //     const drinkBtn = screen.getByTestId('drinks-bottom-btn');
  //     userEvent.click(drinkBtn);

  //     await waitFor(() => screen.getByText(drinkName));
  //     const startRecipeBtn = screen.getByTestId('start-recipe-btn');
  //     userEvent.click(startRecipeBtn);

  //     await waitFor(() => screen.getByText(drinkName));
  //     const labelIng = screen.getByTestId('0-ingredient-step');

//     expect(labelIng).toBeInTheDocument();
//   });
});
