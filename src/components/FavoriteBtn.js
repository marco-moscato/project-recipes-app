import React from 'react';

function FavoriteBtn() {
  return (

    <>
      {/* <div
        className="modal"
        style={ { display: modal } }
      >
        Link copied!
      </div> */}
      <button
        data-testid="-btn"
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

export default FavoriteBtn;
