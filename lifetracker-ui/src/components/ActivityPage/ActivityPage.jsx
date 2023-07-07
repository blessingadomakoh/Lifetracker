import React from 'react';
import Loading from '../Loading/Loading';
import ActivityFeed from '../ActivityFeed/ActivityFeed';

const ActivityPage = ({ activityData = {}, setAppState }) => {
  const { 
    isProcessing = false, 
    totalCaloriesPerDay = [], 
    avgCaloriesPerCategory = [] 
  } = activityData;

  return (
    <div className="activity-page">
      {isProcessing ? (
        <Loading />
      ) : (
        <ActivityFeed
      totalCaloriesPerDay={totalCaloriesPerDay}
      avgCaloriesPerCategory={avgCaloriesPerCategory}
      setAppState={setAppState}
    />

      )}
    </div>
  );
};


export default ActivityPage;
