const db = require("../db");

class Activity {
  static async calculateDailyCaloriesSummaryStats(userId) {
    const res = await db.query(`
      SELECT 
        SUM(calories) as calories, 
        DATE(created_at) as date
      FROM 
        nutrition
      WHERE 
        user_id = $1
        AND
        created_at > NOW() - INTERVAL '7 days'
      GROUP BY 
        date
      ORDER BY 
        date DESC
    `, [userId])

    if (res.rows.length === 0) {
      return [{ date: null, calories: 0 }]
    } else {
      return res.rows.map(row => ({ date: row.date, calories: row.calories }))
    }
}


static async calculatePerCategoryCaloriesSummaryStats(userId) {
  const res = await db.query(`
    SELECT 
      ROUND(AVG(calories), 1) as calories, 
      category
    FROM 
      nutrition
    WHERE 
      user_id = $1
      AND
      created_at > NOW() - INTERVAL '7 days'
    GROUP BY 
      category
  `, [userId])

  if (res.rows.length === 0) {
    return [{ category: null, calories: 0 }]
  } else {
    return res.rows.map(row => ({ category: row.category, calories: row.calories }))
  }
}

}

module.exports = Activity;

// class Activity {
//   static async calculateDailyCaloriesSummaryStats(userId) {
//     const res = await db.query(`
//       SELECT 
//         calories
//       FROM 
//         nutrition
//       WHERE created_at = (
//         SELECT MAX(created_at)
//         FROM nutrition
//         WHERE user_id = $1
//       )
//     `, [userId])

//     if (res.rows.length === 0) {
//       return 0
//     } else 
//     return res.rows[0].calories;
//   }

//   static async calculatePerCategoryCaloriesSummaryStats(userId) {
//     const res = await db.query(`
//         SELECT ROUND(AVG(calories), 1) as avgcaloriespercategory
//         FROM 
//             nutrition
//         WHERE created_at = (
//           SELECT MAX(created_at)
//           FROM nutrition
//           WHERE user_id = $1
//         )

//     `, [userId])
//     // console.log("average", res)

//     // console.log("logging", (res.rows[0]))
//     if (res.rows[0].avgcaloriespercategory === null) {
//       // console.log("avg", "salesforce")
//       return 0
//     } else {
//     return res.rows[0].avgcaloriespercategory
//   }
// }
// }


//   static async calculatePerCategoryCaloriesSummaryStats(userId) {
//     const res = await db.query(`
//         SELECT ROUND(AVG(calories), 1) as calories, category
//         FROM 
//             nutrition
//         WHERE created_at = (
//           SELECT MAX(created_at)
//           FROM nutrition
//           WHERE user_id = $1
//         )
//         GROUP BY category
//     `, [userId])

//     if (res.rows[0] === null || res.rows[0].calories === null) {
//       return { category: null, calories: 0 }
//     } else {
//     return { category: res.rows[0].category, calories: res.rows[0].calories }
//   }
// }

  // static async calculateDailyCaloriesSummaryStats(userId) {
  //   const res = await db.query(`
  //     SELECT 
  //       calories, created_at as date
  //     FROM 
  //       nutrition
  //     WHERE created_at = (
  //       SELECT MAX(created_at)
  //       FROM nutrition
  //       WHERE user_id = $1
  //     )
  //   `, [userId])

  //   if (res.rows.length === 0) {
  //     return { date: null, calories: 0 }
  //   } else 
  //   return { date: res.rows[0].date, calories: res.rows[0].calories };
  // }
