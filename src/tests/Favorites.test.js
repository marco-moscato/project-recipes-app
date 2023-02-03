import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import Meals from '../pages/Meals';
import App from '../App';
// import { mockAPI } from '../services/mockAPI';

describe('Testa a página de Favoritos', () => {
  const emailId = 'email-input';
  const loginId = 'login-submit-btn';
  const passwordId = 'password-input';
  const emailTest = 'teste@trybe.com';

  it('Testa se a página é renderizada com os componentes requisitados', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailId);
    const loginBtn = screen.getByTestId(loginId);
    const passwordInput = screen.getByTestId(passwordId);

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);
    const path = history.location.pathname;
    expect(path).toBe('/meals');

    const image = await screen.findByTestId('0-card-img');
    expect(image).toBeDefined();
    userEvent.click(image);
  });
});
