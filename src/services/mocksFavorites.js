const drink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const meal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const mealToLocalStorage = {
  id: '1234',
  type: 'meal',
  nationality: 'italian',
  category: 'pasta',
  alcoholicOrNot: 'no',
  name: 'penne a carbonara',
  image: '',
};

// * a chave `favoriteRecipes` deve conter a seguinte estrutura:
// ```js
// [{
//     id: id-da-receita,
//     type: meal-ou-drink,
//     nationality: nacionalidade-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita
// }]
