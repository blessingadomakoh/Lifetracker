const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require('../middleware/verifyToken');  // assuming this is where you saved your verifyToken middleware
const Activity = require('../models/activity');


// GET /activity/:id endpoint
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const totalCaloriesPerDay = await Activity.calculateDailyCaloriesSummaryStats(id);
        const avgCaloriesPerCategory = await Activity.calculatePerCategoryCaloriesSummaryStats(id);

        res.json({ totalCaloriesPerDay: [totalCaloriesPerDay], avgCaloriesPerCategory: [avgCaloriesPerCategory] });
    } catch (err) {
        next(err);
    }
});





module.exports = router;
