import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
import Profile from '../pages/Profile';

describe('Teste das features da página Profile', () => {
  const setItem = (jsonId, newJson) => {
    window.localStorage.setItem(jsonId, JSON.stringify(newJson));
  };
  const userMock = { email: 'teste@teste.com' };

  beforeEach(() => {
    setItem('user', userMock);
  });

  it('Testa se as receitas foram colocadas no localStorage', () => {
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(userMock));
  });

  it('Testa se o email usado no Login é mostrado na tela', () => {
    renderWithRouter(<Profile />);
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
