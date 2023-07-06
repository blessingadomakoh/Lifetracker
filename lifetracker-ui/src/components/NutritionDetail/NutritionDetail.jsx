import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NutritionCard from '../NutritionCard/NutritionCard';
import NotFound from '../NotFound/NotFound';

const NutritionDetail = () => {
  const { nutritionId } = useParams();
  const [nutrition, setNutrition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    axios.get(`http://localhost:3001/api/nutrition/${nutritionId}`)
    .then(response => {
        setNutrition(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, [nutritionId]);

  if (isLoading) {
    return <h1 className="loading">Loading...</h1>;
  }
  
  if (!nutrition) {
    return <NotFound />;
  }
  
  return (
    <div className="nutrition-detail">
      <NutritionCard nutrition={nutrition} />
    </div>
  );
};

export default NutritionDetail;
