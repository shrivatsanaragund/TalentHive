import jwt from 'jsonwebtoken';

export const verifyToken = (request, response, next) => {
    const token = request.cookies.accessToken;

    if (!token) {
        return response.status(401).json({ "message": "Not authorized!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return response.status(401).json({ "message": "You are not authorized!" });
        }
        request.userId = payload.id;
        request.isSeller = payload.isSeller;
        // Continue to the next middleware or route
        next();
    });
};
