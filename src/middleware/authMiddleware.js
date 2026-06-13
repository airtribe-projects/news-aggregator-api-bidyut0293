const jwt = require('jsonwebtoken');
const config = require('../config/config');

// JWT verification middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({error: 'Access token required'});
    }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({error: 'Invalid or expired token'});
        }

        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    });
};

module.exports = {authenticateToken};