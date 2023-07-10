import React, { useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = ({ onRegister, error }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`entering handle submit`);
    let isValid = true;

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (password !== passwordConfirm) {
      setPasswordError("Passwords don't match.");
      isValid = false;
    } else {
      setPasswordError(null);
    }
    console.log(`no error in handle submit`)

    if (isValid) {
      console.log(`valid input in handle dubmit`)
      onRegister(username, email, firstName, lastName, password);
      console.log(`testing on register`)
    }

  };

  return (
    <div className="registration-form">
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

        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />

        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-input"
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-input"
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />

        <label htmlFor="passwordConfirm">Confirm Password:</label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="form-input"
        />
        {passwordError && <div className="error">{passwordError}</div>}

        {error && <div className="error">{error}</div>}

        <button type="submit" className="submit-registration">Create Account</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
