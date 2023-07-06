import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NutritionOverview from '../NutritionOverview/NutritionOverview';
import NutritionNew from '../NutritionNew/NutritionNew';
import NutritionDetail from '../NutritionDetail/NutritionDetail';
import NotFound from '../NotFound/NotFound';

const NutritionPage = ({ appState, setAppState }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllNutrition = async () => {
      try {
        const token = localStorage.getItem("lifetracker_token");
        if (token) {
          apiClient.setToken(token);
          const userId = appState.user.id;

          const { data } = await apiClient.fetchAllNutrition({ user_id: userId });
          if (data) {
            setAppState((prevState) => ({
              ...prevState,
              nutrition: data.nutrition,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching all nutrition records: ", error);
      }
    };

    fetchAllNutrition();
  }, [appState.user.id, setAppState]);

  return (
    <div className="nutrition-page">
      <Routes>
        <Route path="/" element={<NutritionOverview appState={appState} setAppState={setAppState} />} />
        <Route path="/create" element={<NutritionNew appState={appState} setAppState={setAppState} />} />
        <Route path="/id/:nutritionId" element={<NutritionDetail appState={appState} setAppState={setAppState} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default NutritionPage;
