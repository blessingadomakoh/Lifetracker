import React, { useState, useEffect } from 'react';
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import LandingPage from '../LandingPage/LandingPage';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginPage from '../LoginPage/LoginPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import apiClient from "../../services/apiClient";
import ActivityPage from '../ActivityPage/ActivityPage';
import NutritionPage from '../NutritionPage/NutritionPage';
import AccessForbidden from '../AccessForbidden/AccessForbidden';
import NotFound from '../NotFound/NotFound';


function App( {handleLogout}) {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [userName, setUserName] = useState()
  const [userId, setUserId] = useState();
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    nutrition: [],
    sleep: [],
    exercise: [],
    activityData: {}
  });
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("lifetracker_token");
      if (token) {
        apiClient.setToken(token);
  
        const  data  = await apiClient.fetchUserByEmail();
        if (data) {
          const activityRes = await apiClient.fetchActivityData(data.user.id);
          if(activityRes.data) {
            setAppState(prevState => ({
              ...prevState,
              user: data.user,
              token: token,
              isAuthenticated: true,
              nutrition: data.nutrition,
              exercise: data.exercise,
              sleep: data.sleep,
              activityData: {
                totalCaloriesPerDay: activityRes.data.totalCaloriesPerDay,
                avgCaloriesPerCategory: activityRes.data.avgCaloriesPerCategory
              }
            }));
          }
        }
      }
    };
  
    fetchUser();
  }, [appState.isAuthenticated]);



  useEffect(() => {
    const checkLoggedIn = () => {
      //check if the user is logged in when the user first accesses the webapp
      const token = localStorage.getItem("token");
      if (token) {
        //decode the stored token
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.userName);
        setUserId(decodedToken.userId);
        apiClient.setToken(token)

        if (decodedToken.exp * 1000 > Date.now()) {
          setAppState(prevState => ({
            ...prevState, 
            isAuthenticated: true,
          }))
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
        const { token } = data;
        const { user } = data;
        setAppState(previousState => ({
            ...previousState, user: user
        }))
        localStorage.setItem("token", token);

        //Successful Login
        setAppState(prevState => ({
          ...prevState, 
          isAuthenticated: true
        }))
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
        const { user } = data;
        setAppState(previousState => ({
            ...previousState, user: user
        }))
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token); //a way to get username from token
        setUserName(decodedToken.userName);

        //Registration successful
        setAppState(prevState => ({
          ...prevState, 
          isAuthenticated: true
        }))
        console.log(data.message); //optional - display a success message
      } else {
        //Registration failed
        console.log(data.message); //optional - display error meesage
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="app">
      <Router>
        <Navbar loggedIn={appState.isAuthenticated} />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              appState.isAuthenticated ? (
                <LoginPage loggedIn={appState.isAuthenticated} onLogin={handleLogin} loginError={loginError} />
              ) : (
                <LoginForm onLogin={handleLogin} error={loginError} />
              )
            }
          />
          <Route
            path="/register"
            element={
              appState.isAuthenticated ? (
                <RegistrationPage loggedIn={appState.isAuthenticated} onRegister={handleRegistration} registrationError={registrationError} />
              ) : (
                <RegistrationForm onRegister={handleRegistration} error={registrationError} />
              )
            }
          />
         <Route
  path="/activity"
  element={
    appState.isAuthenticated ? 
      <ActivityPage activityData={appState.activityData} setAppState={setAppState} /> 
      : <AccessForbidden />
  }
/>

          <Route
            path="/nutrition/*"
            element={
              appState.isAuthenticated ? <NutritionPage appState={appState} setAppState={setAppState} /> : <AccessForbidden />
            }
          />


                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Router>
              </div>
            );
          }

export default App;