import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getLocalStorage } from '../services/LocalStorageDoneRecipes';

function Profile() {
  const history = useHistory();

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getLocalStorage('user'));
  }, []);

  const clearLocalAndLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header
        title="Profile"
        haveSearch={ false }
      />
      {
        user
      && (
        <div>
          <p data-testid="profile-email">
            { user.email }
          </p>

          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => clearLocalAndLogout() }
          >
            Logout
          </button>
        </div>)
      }

      <Footer />
    </div>
  );
}

export default Profile;
