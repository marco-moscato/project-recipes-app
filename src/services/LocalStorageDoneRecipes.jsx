// para adicionar e remover FAVORITOS do local storage.
export const setLocalStorage = (key, param) => {
  localStorage.setItem(key, JSON.stringify(param));
};
export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
export const removeFromLocalStorage = (key) => localStorage.removeItem(key);
export const setOrGetLocalStorage = (key, param) => {
  if (getLocalStorage(key) !== null) {
    const getSaved = { ...getLocalStorage(key), param };
    setLocalStorage(getSaved);
  } else {
    localStorage.setItem(key, JSON.stringify([]));
  }
};
export const removeItemFromLocalStorage = (key, ele) => {
  const filter = getLocalStorage(key).filter((fav) => fav.id !== ele.id);
  setLocalStorage(key, filter);
  console.log(filter);
};
