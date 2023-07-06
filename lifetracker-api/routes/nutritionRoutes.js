const express = require('express');
const router = express.Router();
const User = require('../models/user')


// Add a new nutrition record
router.post('/', async (req, res, next) => {
    try {
        const nutritionRecord = req.body;
        const createdRecord = await User.createNutrition(nutritionRecord);

        res.status(201).json({
            message: "Nutrition record created successfully",
            nutritionRecord,
        });
    } catch (err) {
        next(err);
    }
});

// Get all nutrition records for a user
router.get('/', async (req, res, next) => {
    try {
        const user_id = req.query.user_id;
        const nutritionRecords = await User.getAllNutrition(user_id);
  
      res.status(200).json({
        message: "Nutrition records fetched successfully",
        nutritionRecords,
      });
    } catch (err) {
      next(err);
    }
  });
  

// Update a nutrition record
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const nutritionRecord = { id, ...req.body };
        const updatedRecord = await User.updateNutrition(nutritionRecord);

        res.status(200).json({
            message: "Nutrition record updated successfully",
            updatedRecord,
        });
    } catch (err) {
        next(err);
    }
});

// Delete a nutrition record
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteRecord = await User.deleteNutrition(id);

        res.status(200).json({
            message: "Nutrition record deleted successfully",
            deleteRecord,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
