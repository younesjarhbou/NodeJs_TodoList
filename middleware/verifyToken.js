const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get the token from the request headers, query parameters, or body
    const token = req.headers.authorization || req.query.token || req.body.token;
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    try {

      // Verify and decode the token using your secret key
      const decoded = jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
      
      // Attach the decoded payload to the request object
      req.user = decoded;
      
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
  };

  module.exports = verifyToken;
