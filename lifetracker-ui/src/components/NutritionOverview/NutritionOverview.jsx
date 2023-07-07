import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import NutritionFeed from '../NutritionFeed/NutritionFeed';
import "./NutritionOverview.css"

const NutritionOverview = ({ appState, setAppState }) => {
  // Extract necessary data from appState here.
  // Extract necessary data from appState here.
  const { nutrition, error, isLoading } = appState;

  return (
    <div className="nutrition-overview">
      {error && <div className="error">{error}</div>}
      {isLoading ? <Loading /> : <NutritionFeed nutritions={nutrition} />}
    </div>
  );
}

export default NutritionOverview;
