import React, { useState, useEffect } from 'react';
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import LandingPage from '../LandingPage/LandingPage';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginPage from '../LoginPage/LoginPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';

function App( {handleLogout}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [userName, setUserName] = useState()

  useEffect(() => {
    const checkLoggedIn = () => {
      //check if the user is logged in when the user first accesses the webapp
      const token = localStorage.getItem("token");
      if (token) {
        //decode the stored token
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.userName);

        if (decodedToken.exp * 1000 > Date.now()) {
          setLoggedIn(true);
        } else {
          //Token has expired, log out the user
          handleLogout();
        }
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/auth/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // const { token } = response.data;
        const { token } = data;
        localStorage.setItem("token", token);

        //Successful Login
        setLoggedIn(true);
        setLoginError("");
        console.log(data.message); //optional - display a success message
        console.log(data.user.name); //another way to get the username

        const decodedToken = jwtDecode(token); //a way to get username from token
        setUserName(decodedToken.userName);
      } else {
        //Login failed
        setLoginError(data.message);
        console.log(data.message); //optional - display error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegistration = async (username, email, firstName, lastName, password) => {
    try {
      const response = await fetch("http://localhost:3001/auth/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, first_name: firstName, last_name: lastName, email }),
      });

      //wait for the response
      const data = await response.json();

      if (response.status === 201) {
        //get the token information and store in localStorage
        const { token } = data;
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token); //a way to get username from token
        setUserName(decodedToken.userName);

        //Registration successful
        setLoggedIn(true);
        console.log(data.message); //optional - display a success message
      } else {
        //REgistration failed
        console.log(data.message); //optional - display error meesage
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Router>
      <Navbar loggedIn={loggedIn}/>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            loggedIn ? (
              <LoginPage 
              loggedIn={loggedIn} 
              onLogin={handleLogin} 
              loginError={loginError} 
            />
            ) : (
              <LoginForm onLogin={handleLogin} error={loginError} />
            )
          }
        />
        <Route
          path="/register"
          element={
            loggedIn ? (
              <RegistrationPage 
              loggedIn={loggedIn} 
              onRegister={handleRegistration} 
              loginError={loginError} 
            />
            ) : (
              <RegistrationForm onRegister={handleRegistration} error={registrationError} />
            )
          }
        />
        {/* Define other routes and components here */}
      </Routes>
      

    </Router>
  );
}

export default App;


