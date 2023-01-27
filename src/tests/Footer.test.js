import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import App from '../App';

describe('Testa o componente Footer', () => {
  const emailId = 'email-input';
  const loginId = 'login-submit-btn';
  const passwordId = 'password-input';
  const emailTest = 'teste@trybe.com';

  it('Ao clicar no ícone de perfil, vai para a rota /profile', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailId);
    const loginBtn = screen.getByTestId(loginId);
    const passwordInput = screen.getByTestId(passwordId);

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);
    expect(history.location.pathname).toBe('/meals');

    const mealIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealIcon);
    expect(history.location.pathname).toBe('/meals');

    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkIcon);
    console.log(history);
    // await waitFor(() => expect(path).toBe('/drinks'));
    expect(history.location.pathname).toBe('/drinks');
  });

  //   it.todo('Ao clicar no ícone de pesquisa, o input é renderizado na tela', () => {
  //     renderWithRouter(<Meals />);

//     const searchBtn = screen.getByTestId('search-top-btn');
//     userEvent.click(searchBtn);
//     const searchBar = screen.getByTestId('search-input');
//     expect(searchBar).toBeVisible();
//   });
});
