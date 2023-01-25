import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, haveSearch } = props;
  const history = useHistory();

  const [searchBar, setSearchBar] = useState(false);

  return (
    <div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      <button
        id="profile-top-btn"
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile icon"
        />
      </button>
      { haveSearch
      && (
        <button
          id="search-top-btn"
          type="button"
          onClick={ () => setSearchBar(!searchBar) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search icon"
          />
        </button>
      )}
      { searchBar && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
