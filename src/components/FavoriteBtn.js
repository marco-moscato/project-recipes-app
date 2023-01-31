import { useState } from 'react';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function FavoriteBtn() {
  const [click, setClick] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };
  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ handleClick }
    >
      <img
        src={ click ? whiteHeart : blackHeart }
        alt="heart"
      />
    </button>
  );
}

export default FavoriteBtn;
