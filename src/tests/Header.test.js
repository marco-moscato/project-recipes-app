import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './RenderWith';
// import App from '../App';
import Meals from '../pages/Meals';

describe('Testa o componente Header', () => {
  it('Ao clicar no ícone de perfil, vai para a rota /profile', () => {
    const { history } = renderWithRouter(<Meals />);

    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    const path = history.location.pathname;
    expect(path).toBe('/profile');
  });
  it('Ao clicar no ícone de pesquisa, o input é renderizado na tela', () => {
    renderWithRouter(<Meals />);

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeVisible();
  });
});
