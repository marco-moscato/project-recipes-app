import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import App from '../App';
import Profile from '../pages/Profile';

describe('Teste das features da página Profile', () => {
  it('Testa se o email usado no Login é mostrado na tela', () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByPlaceholderText(/email/i), 'teste@teste.com');
    userEvent.type(screen.getByPlaceholderText(/password/i), 'testeteste');

    const loginBtn = screen.getByRole('button', { name: /enter/i });
    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);

    const profileBtn = screen.getByRole('img', { name: /profile icon/i });
    userEvent.click(profileBtn);

    const userName = screen.getByText(/teste@teste\.com/i);
    expect(userName).toBeVisible();
  });

  it('Testa se os botões redirecionam o usuário como devido', () => {
    const { history } = renderWithRouter(<Profile />);
    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/done-recipes');
    const profileBtn = screen.getByRole('button', { name: /profile icon/i });
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
    const favRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(favRecipesBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Testa se os botões redirecionam o usuário como devido', () => {
    const { history } = renderWithRouter(<Profile />);
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
    expect(localStorage.getItem('user')).toBeNull();
  });
});
