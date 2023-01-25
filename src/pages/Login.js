import React from 'react';

function Login() {
  return (
    <div>
      <form>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            type="email"
            id="email-input"
            placeholder="Email"
            // onChange={  }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            type="password"
            id="password-input"
            placeholder="Password"
            // onChange={  }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          // onClick={  }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
