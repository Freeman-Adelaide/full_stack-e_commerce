import jwt from 'jsonwebtoken';

const adminAuthMiddleware = async (req, res, next) => {
    console.log("AdminAuthMiddleware called");

    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the request has an Authorization header and if it uses the Bearer token format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "This admin is not authorized. Please log in again.",
        });
    }

    // Extract the token from the Authorization header
    const adminToken = authHeader.split(" ")[1];

    try {
        // Verify the token using your secret
        const token_decode = jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET);
        
        // Attach the decoded user ID to the request object
        req.user = { id: token_decode.id };
        
        console.log('Decoded Token:', token_decode); // Log the decoded token
        console.log('User ID set in request body:', req.user.id);

        // Call the next middleware
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({
            success: false,
            message: "Token is invalid or expired. Please log in again.",
        });
    }
};

export default adminAuthMiddleware;
