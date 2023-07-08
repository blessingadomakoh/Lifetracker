const db = require("../db");

class Activity {
  static async calculateDailyCaloriesSummaryStats(userId) {
    const res = await db.query(`
      SELECT 
        calories
      FROM 
        nutrition
      WHERE created_at = (
        SELECT MAX(created_at)
        FROM nutrition
        WHERE user_id = $1
      )
    `, [userId])

    if (res.rows.length === 0) {
      return 0
    } else 
    return res.rows[0].calories;
  }

  static async calculatePerCategoryCaloriesSummaryStats(userId) {
    const res = await db.query(`
        SELECT ROUND(AVG(calories), 1) as avgcaloriespercategory
        DATE(created_at) as date
        FROM 
            nutrition
        WHERE created_at = (
          SELECT MAX(created_at)
          FROM nutrition
          WHERE user_id = $1
        )

    `, [userId])

    if (res.rows[0].avgcaloriespercategory === null) {
      return 0
    } else {
    return res.rows[0].avgcaloriespercategory
  }
}


}

module.exports = Activity;










