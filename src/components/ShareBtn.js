import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import share from '../images/shareIcon.svg';
import '../styles/RecipeDetails.css';

function ShareBtn() {
  const [modal, setModal] = useState('none');
  const { location } = useHistory();
  const magic2000 = 2000;

  const handleClick = () => {
    clipboardCopy((`http://localhost:3000${location.pathname}`));
    setModal('block');
    setTimeout(() => {
      setModal('none');
    }, magic2000);
  };

  return (
    <>
      <div
        className="modal"
        style={ { display: modal } }
      >
        Link copied!
      </div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleClick }
      >
        <img
          src={ share }
          alt="share"
        />
      </button>
    </>
  );
}

export default ShareBtn;
