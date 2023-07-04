import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onLogin, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
//   const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      setEmailError(null);
      onLogin(email, password);
    } else {
      setEmailError("Please enter a valid email.");
    }
  };

  return (
    <div className="login-page">
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        {emailError && <div className="error">{emailError}</div>}
        
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />

        {error && <div className="error">{error}</div>}
        
        <button type="submit" className="submit-login">Login</button>
      </form>
    </div>
</div>

  );
};

export default LoginForm;
