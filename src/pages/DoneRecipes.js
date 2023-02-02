import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

import { getLocalStorage } from '../services/LocalStorageDoneRecipes';

function DoneRecipes() {
  const [path, setPath] = useState('');
  const [modal, setModal] = useState('none');
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    setDoneRecipes(getLocalStorage('doneRecipes'));
  }, []);

  const doneRecipesFilter = (localStorage) => {
    if (path === 'meal') return localStorage.filter((rec) => rec.type === path);
    if (path === 'drink') return localStorage.filter((rec) => rec.type === path);
    if (path === '') return localStorage.filter((rec) => rec);
  };

  const copyToClickboard = (recipe) => {
    const magicTimeout = 2000;
    const recipeURL = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    navigator.clipboard.writeText(recipeURL);
    setModal('block');
    setTimeout(() => {
      setModal('none');
    }, magicTimeout);
  };

  const magicTag = 2;
  return (
    <div>
      <Header
        title="Done Recipes"
        haveSearch={ false }
      />

      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => setPath('meal') }
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setPath('drink') }
      >
        Drinks
      </button>

      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setPath('') }
      >
        All
      </button>

      <p
        data-testid="link-copied"
        style={ { display: [modal] } }
      >
        Link copied!
      </p>

      <div>
        { doneRecipesFilter(doneRecipes).map((rec, index) => (
          (rec.type.includes(path))
            && (
              <div key={ rec.name }>

                <Link to={ `/${rec.type}s/${rec.id}` }>
                  <img
                    style={ { heigth: '100px', width: '100px' } }
                    data-testid={ `${index}-horizontal-image` }
                    src={ rec.image }
                    alt={ rec.name }
                  />
                </Link>

                <Link to={ `/${rec.type}s/${rec.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    { rec.name }
                  </p>
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { rec.alcoholicOrNot ? (
                    rec.alcoholicOrNot
                  )
                    : `${rec.nationality} - ${rec.category}`}
                </p>

                <p data-testid={ `${index}-horizontal-done-date` }>
                  { rec.doneDate}
                </p>

                <button
                  type="button"
                  data-testid={ `${index}-share-btn` }
                  onClick={ () => copyToClickboard(rec) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Share"
                  />
                </button>

                <div>
                  {rec.tags.map((tag, iTag) => (
                    iTag < magicTag
                    && (
                      <span
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        key={ tag }
                      >
                        { tag }
                      </span>
                    )
                  ))}
                </div>
              </div>
            )
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
