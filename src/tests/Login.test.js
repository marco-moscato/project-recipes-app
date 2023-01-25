import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import App from '../App';

describe('Testa a tela de Login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Renderiza os elementos na tela', () => {
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
  it('Botão habilita e desabilita corretamente', () => {
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@trybe.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginBtn).toBeEnabled();
  });
});
