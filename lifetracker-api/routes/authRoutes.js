const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/api/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await User.login(email, password);

        res.status(200).json({
            message: "Login Successful",
            token :token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
});

router.post('/api/register', async (req, res, next) => {
    try {
        console.log("REGISTER here")
        const { username, password, first_name, last_name, email } = req.body;
        const { token, user } = await User.register(username, password, first_name, last_name, email);
        console.log("REGISTER after user.Register")
        res.status(201).json({
            message: "User registered successfully",
            token : token,
            user: user,
        });
        console.log("REGISTER status")
    } catch (err) {
        next(err);
    }
});

router.get('/me', async (req, res, next) => {
    try {
        const email = res.locals.email
        const user = User.fetchUserByEmail(email)

        return res.status(201).json({
            message: "User fetched succesfully",
            user: user
        })
    }
 catch (err) {
    next(err)
 }

 })



module.exports = router;


