import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title, haveSearch } = props;
  return (
    <div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      <button
        id="profile-button"
        type="button"
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
          id="profile-button"
          type="button"
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search icon"
          />
        </button>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
