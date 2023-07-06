import React from 'react';
import NutritionForm from '../NutritionForm/NutritionForm';
import apiClient from "../../services/apiClient"; 

const NutritionNew = ({ appState, setAppState }) => {
  const handleSubmit = async (nutritionData) => {
    try {
      const { data } = await apiClient.createNutrition(nutritionData);
      if (data) {
        setAppState((prevState) => ({
          ...prevState,
          nutrition: [...prevState.nutrition, data],
        }));
      }
    } catch (error) {
      console.error("Error adding new nutrition record: ", error);
    }
  };

  return (
    <div className="nutrition-new">
      <NutritionForm onSubmit={handleSubmit} appState={appState} />
    </div>
  );
};

export default NutritionNew;


