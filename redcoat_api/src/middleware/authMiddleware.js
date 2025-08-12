const jwt = require('jsonwebtoken');

//verifies JWT token
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed.'});
    }

    //get token from header
    const token = authHeader.split(' ')[1];

    try {
        //check if JWT is verified
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        console.error('JWT verification failed', err.message);
        return res.status(403).json({message: 'invalid or expired token' });
    }
};

//checks if user is an admin
exports.requireAdmin = (req, res, next) => {
    //checks if user is admin level
    if(!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'admin access required' });
    }
    next();
};