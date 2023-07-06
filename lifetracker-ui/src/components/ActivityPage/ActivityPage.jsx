import React from 'react';
import Loading from '../Loading/Loading';
import ActivityFeed from '../ActivityFeed/ActivityFeed';

const ActivityPage = ({ appState, setAppState }) => {
  const { isProcessing, activityData } = appState;

  return (
    <div className="activity-page">
      {isProcessing ? (
        <Loading />
      ) : (
        <ActivityFeed activityData={activityData} setAppState={setAppState} />
      )}
    </div>
  );
};

export default ActivityPage;
