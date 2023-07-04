import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';

const LoginPage = ({ loggedIn, onLogin, loginError }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/activity'); //navigates the app to the Activity page when the user is already logged in
    }
  }, [loggedIn, navigate]);

  return (
    <div className="login-page">
      <LoginForm onLogin={onLogin} error={loginError} />
    </div>
  );
};

export default LoginPage;

