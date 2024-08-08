import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    console.log("Auth middleware called")

    const {token} = req.headers;

    //check if the user's request came with a token
    if(!token) {
        return res.json({success: false, message: "Not Authorized Login Again"})
    }
    try {
        //if it came with a token, decode and verify the token
        const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        console.log('Decoded Token:', token_decode); // Log the decoded token
        console.log('User ID set in request body:', req.body);
        next()

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

export default authMiddleware;