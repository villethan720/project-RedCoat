const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    //save token for session verification
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({message: 'Access denied. no token provided.'});

    try {
        //check if JWT is verified
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        console.error(err);
        return res.status(403).json({message: 'Invalid token' });
    }
};

exports.requireAdmin = (req, res, next) => {
    //checks if user is admin level
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'admin access required' });
    }
    next();
};