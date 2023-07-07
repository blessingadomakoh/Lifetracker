const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }

    jwt.verify(token, 'secret-key-unique', (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }

        req.user = user; // Add user payload to request object
        next(); // Continue to next middleware function or route handler
    });
};

module.exports = verifyToken;
