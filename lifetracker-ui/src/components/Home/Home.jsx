import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="landing-page">
      <div
        className="hero-image"
        style={{
          backgroundImage: `url('https://images.everydayhealth.com/images/can-cbd-help-weight-loss-1440x810.jpg')`,
        }}
      >
        <div className="landing-content">
          <h1 className="landing-title">LifeTracker</h1>
          <p className="landing-description">
            Helping you take back control of your world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

