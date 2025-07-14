const jwt = require('jsonwebtoken');

const adminAuthMiddleware = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;
        // Check if token exists
        if (!token) {
        return res.status(401).json({ msg: 'Not authenticated' });
        }
    
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Decoded token:', decoded.role);
        // Check if user is admin 
        if (decoded.role !== 'Admin') {
        return res.status(403).json({ msg: 'Access denied' });
        }
        // console.log('Decoded token:', decoded);
        // console.log(decoded.user);
    
        // Add user to request object
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Admin auth middleware error:', err.message);
        res.status(401).json({ msg: 'Authentication failed' });
    }
};

module.exports = adminAuthMiddleware;