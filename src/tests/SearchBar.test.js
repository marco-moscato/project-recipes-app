import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import RecipesProvider from '../context/RecipesProvider';
import Meals from '../pages/Meals';
import App from '../App';

const emailId = 'email-input';
const loginId = 'login-submit-btn';
const passwordId = 'password-input';
const emailTest = 'teste@trybe.com';

describe('Testa o componente SearchBar', () => {
  it('Verifica se pathname está correto', () => {
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
  it('Verifica se os radios são renderizados na tela', () => {
    renderWithRouter(<Meals />);

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const inputText = screen.getByTestId('search-input');

    const ingrInput = screen.getByTestId('ingredient-search-radio');
    const nameInput = screen.getByTestId('name-search-radio');
    const firstInput = screen.getByTestId('first-letter-search-radio');

    const radioBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(ingrInput);
    userEvent.click(nameInput);
    userEvent.click(firstInput);

    userEvent.type(inputText, 'm');
    userEvent.click(radioBtn);

    expect(ingrInput).toBeVisible();
    expect(nameInput).toBeVisible();
    expect(firstInput).toBeVisible();
  });
  // it('alerts on submit click', async () => {
  //   const alertMock = jest.spyOn(window,'alert').mockImplementation();
  //   const { getByText, getByTestId } = render(<Meals />)

  //   const searchBtn = screen.getByTestId('search-top-btn');
  //   userEvent.click(searchBtn);

  //   const inputText = screen.getByTestId('search-input');

  //   const firstInput = screen.getByTestId('first-letter-search-radio');
  //   const alert = screen.getByText(/Your search must have only 1 (one) character/i)

  //   userEvent.type(inputText, 'ma')
  //   userEvent.click(firstInput)
  //   fireEvent.click(getByText(/Your search must have only 1 (one) character/i))
  //   expect(alertMock).toHaveBeenCalledTimes(1)
  // })
  // it('Verifica se o alerta é renderizado na tela', () => {
  //   renderWithRouter(<Meals />);

  //   const searchBtn = screen.getByTestId('search-top-btn');
  //   userEvent.click(searchBtn);

  //   const inputText = screen.getByTestId('search-input');

  //   const firstInput = screen.getByTestId('first-letter-search-radio');
  //   const alert = screen.getByText(/Your search must have only 1 (one) character/i)

  //   userEvent.type(inputText, 'ma')
  //   userEvent.click(firstInput)

  //   const radioBtn = screen.getByTestId('exec-search-btn');
  //   userEvent.click(radioBtn);

  //   expect(alert).toBeVisible();
  // });
});
