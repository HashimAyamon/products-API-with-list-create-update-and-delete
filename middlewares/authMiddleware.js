const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return next(new ErrorResponse('Not authorized', 401));
    }

    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user to request
        next();
    } catch (error) {
        return next(new ErrorResponse('Invalid token', 401));
    }
};

// Middleware to check for admin role
exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new ErrorResponse('Access denied: Admins only', 403));
    }
    next();
};
