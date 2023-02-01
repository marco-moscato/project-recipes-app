// para adicionar e remover FAVORITOS do local storage.
export const setLocalStorage = (param) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(param));
};

export const getLocalStorage = () => JSON.parse(localStorage.getItem('favoriteRecipes'));

export const removeFromLocalStorage = () => localStorage.removeItem('favoriteRecipes');

export const setOrGetLocalStorage = (param) => {
  if (getLocalStorage() !== null) {
    const getSaved = [...getLocalStorage(), param];
    setLocalStorage(getSaved);
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    // console.log('done');
  }
};

// [{ id, type, nationality, category, alcoholicOrNot, name, image }]
