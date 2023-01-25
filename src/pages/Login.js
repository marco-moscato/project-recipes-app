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
          />
        </label>
      </form>
    </div>
  );
}

export default Login;
