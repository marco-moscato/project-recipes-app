import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import App from '../App';

describe('Testa o componente Footer', () => {
  const emailId = 'email-input';
  const loginId = 'login-submit-btn';
  const passwordId = 'password-input';
  const emailTest = 'teste@trybe.com';

  it('Ao clicar no ícone de meals e drinks, vai para a sua respectiva rota', () => {
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
    expect(history.location.pathname).toBe('/drinks');
  });
});
