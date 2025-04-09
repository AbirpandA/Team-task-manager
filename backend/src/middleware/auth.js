const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // calling the token from request header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Header is not provided" }); 
    }

    // storing the token to verify
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Token is not provided" }); 
    }

    try {
        // verifying the token to get the payload
        const decoded = jwt.verify(token, process.env.secret_key);
        // storing payload as req.user
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" }); 
    }
};

module.exports = verifyToken; 
