// NutritionFeed Component
import React from 'react';
import { Link } from 'react-router-dom';
import NutritionCard from '../NutritionCard/NutritionCard';
import './NutritionFeed.css'

const NutritionFeed = ({ nutritions }) => {
  return (
    <div className="nutrition-feed">
      {nutritions.length === 0 ? (
        <div className="nutritions">
          <div className="empty-message">Nothing here yet</div>
          <Link to="/nutrition/create" className="record-button">Record Nutrition</Link>
        </div>
      ) : (
        nutritions.map(nutrition => <NutritionCard key={nutrition.id} nutrition={nutrition} />)
      )}
    </div>
  );
};

export default NutritionFeed;
