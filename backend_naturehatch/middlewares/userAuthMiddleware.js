const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
  // Get token from cookie
  // console.log("Cookies:", req.cookies);
  // const token = req.cookies?.token;
  // console.log(token);
//   console.log("here")

//   console.log("Cookies:", req.cookies);
// console.log("Authorization header:", req.headers.authorization);

  
  let token;
  
  token = req.cookies?.token;
  
  // if (!token) {
    //   return res.status(401).json({ msg: 'Not authenticated Login again' });
    // }
    
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }
    
    if (!token) {
      return res.status(401).json({ msg: 'No authentication token, access denied' });
    }
    
    
    // console.log(token);
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Decoded token:', decoded);
    // console.log(decoded.user);


    // Add user to request object
    // req.user = decoded.user;
    req.user = { id: decoded.id } 
    // console.log('User from token:', req.user);
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ msg: 'Authentication failed' });
  }
};

module.exports = authMiddleware;