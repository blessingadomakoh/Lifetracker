import React from 'react';

const NutritionCard = ({ nutrition }) => {
  const {
    imageUrl,
    name,
    calories,
    category,
    createdAt,
  } = nutrition;
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };
  
  return (
    <div className="nutrition-card">
      {imageUrl && <img className="nutrition-image" src={imageUrl} alt={name} />}
      <h2 className="nutrition-name">{name}</h2>
      <p className="nutrition-calories">Calories: {calories}</p>
      <p className="nutrition-category">Category: {category}</p>
      <p className="nutrition-date">Date: {formatDate(createdAt)}</p>
    </div>
  );
};

export default NutritionCard;
