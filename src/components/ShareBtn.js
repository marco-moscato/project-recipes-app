import React from 'react';
import share from '../images/shareIcon.svg';

function ShareBtn() {
  return (
    <button
      data-testid="share-btn"
      type="button"
      // onClick={ handleClick }
    >
      <img
        src={ share }
        alt="share"
      />
    </button>
  );
}

export default ShareBtn;
