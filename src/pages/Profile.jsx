import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getLocalStorage } from '../services/LocalStorageDoneRecipes';

function Profile() {
  const [user, setUser] = useState();

  useEffect(() => {
    const { email } = getLocalStorage('user');
    setUser(email);
  }, []);

  return (
    <div>
      <Header
        title="Profile"
        haveSearch={ false }
      />
      <div>
        <p data-testid="profile-email">
          { user }
        </p>
      </div>

      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}

// O elemento de email deve possuir o atributo data-testid="profile-email";
// O botão para "Done Recipes" deve possuir o atributo data-testid="profile-done-btn";
// O botão para "Favorite Recipes" deve possuir o atributo data-testid="profile-favorite-btn";
// O botão de "Logout" deve possuir o atributo data-testid="profile-logout-btn".

export default Profile;
