import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const btnValidation = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    const passwordLength = 6;
    return !(emailRegex.test(email) && password.length > passwordLength);
  };

  const handleClick = () => {
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <form>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            type="email"
            id="email-input"
            placeholder="Email"
            onChange={ ({ target }) => { setEmail(target.value); } }
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            type="password"
            id="password-input"
            placeholder="Password"
            onChange={ ({ target }) => { setPassword(target.value); } }
            value={ password }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ btnValidation() }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
