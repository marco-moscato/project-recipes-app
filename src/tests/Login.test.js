import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import App from '../App';

describe('Testa a tela de Login', () => {
  // beforeEach(() => {
  // renderWithRouter(<App />);
  // });

  const emailId = 'email-input';
  const loginId = 'login-submit-btn';
  const passwordId = 'password-input';
  const emailTest = 'teste@trybe.com';

  it('Renderiza os elementos na tela', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailId);
    const loginBtn = screen.getByTestId(loginId);
    const passwordInput = screen.getByTestId(passwordId);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
  it('Botão habilita e desabilita corretamente', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailId);
    const loginBtn = screen.getByTestId(loginId);
    const passwordInput = screen.getByTestId(passwordId);

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    expect(loginBtn).toBeEnabled();
  });
  it('Botão redireciona para a rota /meals', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailId);
    const loginBtn = screen.getByTestId(loginId);
    const passwordInput = screen.getByTestId(passwordId);

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);
    const path = history.location.pathname;
    expect(path).toBe('/meals');
  });
  it('Verifica se salva email no localStorage', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailId);
    const loginBtn = screen.getByTestId(loginId);
    const passwordInput = screen.getByTestId(passwordId);

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);

    const userObj = { email: emailTest };
    expect(userObj).toEqual(JSON.parse(localStorage.getItem('user')));
  });
});
