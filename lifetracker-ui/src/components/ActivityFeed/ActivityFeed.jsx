// was in the middle of figuring out the summary stats and averages
// import React from 'react';
// import SummaryStat from '../SummaryStat/SummaryStat';

// const ActivityFeed = ({ totalCaloriesPerDay, avgCaloriesPerCategory }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//   }

//   return (
//     <div className="activity-feed">
//       <div className="per-category">
//         <h4>Average Calories Per Category</h4>
//         {avgCaloriesPerCategory && avgCaloriesPerCategory.slice(0, 6).map((item, index) => (
//           <SummaryStat
//             key={index}
//             stat={Math.floor(item.calories * 10) / 10}
//             label="calories"
//             substat={item.category}
//           />
//         ))}
//       </div>
//       <div className="per-day">
//         <h4>Total Calories Per Day</h4>
//         {totalCaloriesPerDay && totalCaloriesPerDay.map((item, index) => (
//           <SummaryStat
//             key={index}
//             stat={Math.floor(item.calories)}
//             label="calories"
//             substat={formatDate(item.date)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActivityFeed;

import React from 'react';
import './ActivityFeed.css'; // add a CSS import here

const ActivityFeed = () => {
  return (
    <div className="activity-feed">
      <div className="calories-info">
        <div className="box">
          <h4>Average Daily Calories:</h4>
          <p>125</p>
        </div>
        <div className="box">
          <h4>Max Calories in One Meal:</h4>
          <p>125</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;


