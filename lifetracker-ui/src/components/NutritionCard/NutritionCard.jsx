// import React from 'react';
// import moment from 'moment';

// const NutritionCard = ({ nutrition }) => {
//   const {
//     imageUrl,
//     name,
//     calories,
//     category,
//     createdAt,
//   } = nutrition;


  
//   const formatDate = createdAt => {

//     const dates = moment(createdAt)
//     let day = dates.date()
//     day = String(day).padStart(2, '0')
//     const month = dates.month()
//     const year = dates.year()

//     createdAt = `${month}/${day}/${year}`

//     return createdAt
//     // const date = new Date(dateStr);
//     // return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
//   };
  
//   return (
//     <div className="nutrition-card">
//       {imageUrl && <img className="nutrition-image" src={imageUrl} alt={name} />}
//       <h2 className="nutrition-name">{name}</h2>
//       <p className="nutrition-calories">Calories: {calories}</p>
//       <p className="nutrition-category">Category: {category}</p>
//       <p className="nutrition-date">Date: {formatDate(createdAt)}</p>
//     </div>
//   );
// };

// export default NutritionCard;

import React from 'react';
import moment from 'moment';

const NutritionCard = ({ nutrition }) => {
  const {
    imageUrl,
    name,
    calories,
    category,
    createdAt,
  } = nutrition;

  const defaultImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLICSlOp6FSmEppFD_SWteeJ5qcUoTxD7d3g&usqp=CAU";

  // const formatDate = createdAt => {
  //   const dates = moment(createdAt);
  //   let day = dates.date();
  //   day = String(day).padStart(2, '0');
  //   const month = dates.month();
  //   const year = dates.year();

  //   createdAt = `${month}/${day}/${year}`;

  //   return createdAt;
  // };

  const formatTimestamp = (timestamp) => {
    const dateTime = moment(timestamp);
    return dateTime.format('MM/DD/YYYY, h:mm:ss a'); // 'a' stands for AM/PM
  };
  

  const handleImageError = (e) => {
    if (e.target.src !== defaultImageUrl) {
      e.target.src = defaultImageUrl;
    }
  }

  return (
    <div className="nutrition-card">
<img className="nutrition-image" src={imageUrl || defaultImageUrl} onError={handleImageError} alt={name} />
      <h2 className="nutrition-name">{name}</h2>
      <p className="nutrition-calories">Calories: {calories}</p>
      <p className="nutrition-category">Category: {category}</p>
      <p className="nutrition-date">Timestamp: {formatTimestamp(createdAt)}</p>
    </div>
  );
};

export default NutritionCard;

