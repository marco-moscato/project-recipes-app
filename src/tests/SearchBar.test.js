import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './RenderWith';
import Meals from '../pages/Meals';
import App from '../App';

const emailId = 'email-input';
const loginId = 'login-submit-btn';
const passwordId = 'password-input';
const emailTest = 'teste@trybe.com';
const idSearch = 'search-top-btn';
const searchInput = 'search-input';
const idRadioBtn = 'exec-search-btn';

describe('Testa o componente SearchBar', () => {
  it('Verifica se pathname está correto', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const loginBtn = screen.getByTestId(loginId);

    act(() => {
      userEvent.type(emailInput, emailTest);
      userEvent.type(passwordInput, '1234567');

      expect(loginBtn).toBeEnabled();
    });
    userEvent.click(loginBtn);
    const path = history.location.pathname;
    expect(path).toBe('/meals');
  });
  it('Verifica se os radios são renderizados na tela', () => {
    const { history } = renderWithRouter(<Meals />);
    global.alert = jest.fn();
    act(() => {
      history.push('/meals');
    });

    const searchBtn = screen.getByTestId(idSearch);
    userEvent.click(searchBtn);

    const inputText = screen.getByTestId(searchInput);

    const ingrInput = screen.getByTestId('ingredient-search-radio');
    const nameInput = screen.getByTestId('name-search-radio');
    const firstInput = screen.getByTestId('first-letter-search-radio');

    const radioBtn = screen.getByTestId(idRadioBtn);

    userEvent.click(ingrInput);
    userEvent.click(nameInput);
    userEvent.click(firstInput);

    userEvent.type(inputText, 'm');
    userEvent.click(radioBtn);

    expect(ingrInput).toBeVisible();
    expect(nameInput).toBeVisible();
    expect(firstInput).toBeVisible();
  });
  it('Verifica se ao receber 1 item da API, página é redireciona à receita', async () => {
    const { history } = renderWithRouter(<Meals />);
    act(() => {
      history.push('/meals');
    });
    const path = history.location.pathname;

    const searchBtn = screen.getByTestId(idSearch);
    userEvent.click(searchBtn);

    const nameInput = screen.getByTestId('name-search-radio');
    const radioBtn = screen.getByTestId(idRadioBtn);

    const inputText = screen.getByTestId(searchInput);
    userEvent.type(inputText, 'Ribollita');
    userEvent.click(nameInput);
    await waitFor(() => {
      console.log(history);
      userEvent.click(radioBtn);
    });
    await waitFor(() => {
      expect(path).toBe('/52811');
    });
  });
  it('Verifica se ao digitar 2 caracteres e pesquisar por First Letter é renderizado o alerta', async () => {
    const { history } = renderWithRouter(<Meals />);
    global.alert = jest.fn();
    act(() => {
      history.push('/drinks');
    });

    const searchBtn = screen.getByTestId(idSearch);
    userEvent.click(searchBtn);

    const firstInput = screen.getByTestId('first-letter-search-radio');
    const radioBtn = screen.getByTestId(idRadioBtn);

    const inputText = screen.getByTestId(searchInput);
    userEvent.type(inputText, 'ma');
    userEvent.click(firstInput);
    userEvent.click(radioBtn);

    expect(global.alert).toBeCalled();
  });
});
