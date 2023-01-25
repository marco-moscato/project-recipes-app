import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import App from '../App';

describe('Testa a tela de Login', () => {
  // beforeEach(() => {
  // renderWithRouter(<App />);
  // });

  it('Renderiza os elementos na tela', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
  it('Botão habilita e desabilita corretamente', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@trybe.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginBtn).toBeEnabled();
  });
  it('Botão redireciona para a rota /meals', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@trybe.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);
    const path = history.location.pathname;
    expect(path).toBe('/meals');
  });
  it('Verifica se salva email no localStorage', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@trybe.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);

    const userObj = { email: 'teste@trybe.com' };
    expect(userObj).toEqual(JSON.parse(localStorage.getItem('user')));
  });
});
