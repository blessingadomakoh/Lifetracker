import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

const RegistrationPage = ({ loggedIn, onRegister, registrationError }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/activity'); //navigates the app to the Activity page when the user is already logged in
    }
  }, [loggedIn, navigate]);

  return (
    <div className="registration-page">
      <RegistrationForm onRegister={onRegister} error={registrationError} />
    </div>
  );
};

export default RegistrationPage;
