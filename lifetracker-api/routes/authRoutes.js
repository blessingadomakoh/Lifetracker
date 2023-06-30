const express = require("express")
const router = express.Router();


const User = require('../models/user')

//Registration route
router.post("/api/register", async (req, res) => {
    const { username, first_name, last_name, email, password } = req.body;
    const user = await User.register(username, password, first_name, last_name, email); // from the User class define in user.js

    res.send(201).json({ user })
})

router.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.login(email, password); // from the User class define in user.js

    
    res.send(201).json({ user })
})

module.exports = router;