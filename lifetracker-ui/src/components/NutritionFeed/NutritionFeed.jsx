// NutritionFeed Component
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import NutritionCard from '../NutritionCard/NutritionCard';
import apiClient from '../../services/apiClient';
import './NutritionFeed.css'

const NutritionFeed = ( {appState} ) => {

  const [nutritions, setNutritions] = useState([])
    useEffect (() => {
      const getNutritionInfo = async () => {
        const response = await apiClient.fetchAllNutrition(appState.user.id)
        setNutritions(response.data.nutritionRecords)
      }
    getNutritionInfo()
      }, [])

  return (
    <div className="nutrition-feed">
      <Link to="/nutrition/create" className="record-button">Record Nutrition</Link>
      {nutritions?.length === 0 ? (
        <div className="nutritions">
          <div className="empty-message">Nothing here yet</div>
        </div>
      ) : (
        nutritions?.map(nutrition => <NutritionCard key={nutrition.id} nutrition={nutrition} />)
      )}
    </div>
  );
};

export default NutritionFeed;
