import React from 'react';
import NutritionCard from '../NutritionCard/NutritionCard';

const NutritionFeed = ({ nutritions }) => {
  return (
    <div className="nutrition-feed">
      {nutritions.length === 0 ? (
        <div className="empty-message">Nothing here yet</div>
      ) : (
        nutritions.map(nutrition => <NutritionCard key={nutrition.id} nutrition={nutrition} />)
      )}
    </div>
  );
};

export default NutritionFeed;
