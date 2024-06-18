const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    // Get the Authorization header value
    const authHeader = req.headers['authorization'];
    // Extract the token from the Authorization header
    const token = authHeader && authHeader.split(' ')[1];

    // CORS headers
    /*
    Access-Control-Allow-Origin:  http://127.0.0.1:3000
    Access-Control-Allow-Methods: POST
    Access-Control-Allow-Headers: Content-Type, Authorization
    */

    // If no token is provided, return a 401 Unauthorized response
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // If token verification fails, return a 401 Unauthorized response
        if (err) return res.status(401).json({ success: false, message: 'Unauthorized' });
        
        // Attach the user payload to the request object
        req.user = user;
        
        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = authenticateToken;
