// Create a middleware function to verify the JWT and protect routes.


const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'miuGLuZwCXLQhWcXZ/BZkBmsRPhdY+ctaahcc/rrBqM=';

const authenticateToken = (req, res, next) => {
    // Get token from the Authorization header 
    // const authHeader = req.headers['authorization'];
    // const token  = authHeader && authHeader.split(' ')[1];
    const token = req.headers['authorization']?.split(' ')[1];
    
    if(!token) return res.status(401).json({message: 'Access Denied. No token provided.'});

    try {
        // verify the token with JWT_SECRET
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Attach the user payload to the request object
        next(); // Proceed to the next middleware or route handler
 
    } catch (error) {
        res.status(403).json({message: 'Invalid Token'});
    }

};

module.exports = authenticateToken;


// This middleware:

// Checks for the token in the Authorization header (formatted as Bearer <token>).
// If a token is provided, it verifies it against the JWT_SECRET.
// If verification is successful, it adds the decoded token (e.g., the user ID) to req.user, which can be used in the route handlers.