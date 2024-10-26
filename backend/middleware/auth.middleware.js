const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No authentication token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid authentication token' });
    }
};

const authenticateToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Gets the token part after "Bearer"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' }); // No token found
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' }); // Token is invalid
        }
        req.user = user; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    });
};


module.exports = authenticateToken;