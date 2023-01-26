const fetchRecipes = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    return results;
  } catch (er) {
    console.log(er);
  }
};

export default fetchRecipes;
