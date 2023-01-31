import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const { setCategoryRecipes } = useContext(RecipesContext);

  // const handleClick = () => {
  //   if (history.location.pathname === '/drinks') {
  //     setCategoryRecipes(null);
  //     history.push('/drinks');
  //   }
  //   if (history.location.pathname === '/meals') {
  //     setCategoryRecipes(null);
  //     history.push('/meals');
  //   }
  // };
  return (
    <footer style={ { position: 'fixed', bottom: '0px' } } data-testid="footer">
      <div>
        <button
          id="drinks-bottom"
          type="button"
          onClick={ () => {
            setCategoryRecipes(null);
            history.push('/drinks');
          } }
        >
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="Drinks icon"
          />
        </button>
        <button
          id="meals-bottom"
          type="button"
          onClick={ () => {
            setCategoryRecipes(null);
            history.push('/meals');
          } }
        >
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="Meals icon"
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;

// * Todos os ícones necessários estão disponíveis na pasta `src/images`;
// * O menu inferior deve ter possuir o atributo `data-testid="footer"`;
// * O elemento que leva para a página de bebidas deve usar o ícone `drinkIcon.svg` e possuir o atributo `data-testid="drinks-bottom-btn"`;
// * O elemento que leva para a página de comidas deve usar o ícone `mealIcon.svg` e possuir o atributo `data-testid="meals-bottom-btn"`;
// * O menu inferior deve ficar fixado sempre ao final da página.
// </details>
