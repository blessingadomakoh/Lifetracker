const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require('../middleware/verifyToken');  
const Activity = require('../models/activity');


router.get('/', verifyToken, async (req, res, next) => {
    try {
        const {userId} = res.locals.user;

        const totalCaloriesPerDay = await Activity.calculateDailyCaloriesSummaryStats(userId);
        const avgCaloriesPerCategory = await Activity.calculatePerCategoryCaloriesSummaryStats(userId);

        res.json({ totalCaloriesPerDay: [totalCaloriesPerDay], avgCaloriesPerCategory: [avgCaloriesPerCategory] });
    } catch (err) {
        console.error("errrrrorrrr", err.stack);
        next(err);
    }
});






module.exports = router;
