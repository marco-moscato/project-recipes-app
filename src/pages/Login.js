import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const btnValidation = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    const passwordLength = 6;
    return !(emailRegex.test(email) && password.length > passwordLength);
  };

  return (
    <div>
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
          // onClick={  }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
