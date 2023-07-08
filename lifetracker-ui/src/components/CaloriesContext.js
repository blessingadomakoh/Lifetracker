import React from 'react';

const CaloriesContext = React.createContext({
  averageDailyCalories: 0,
  maxCaloriesOneMeal: 0,
  setMealCalories: () => {}
});

export default CaloriesContext;
