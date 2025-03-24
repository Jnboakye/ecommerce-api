// import jwt from "jsonwebtoken";

import { expressjwt } from "express-jwt";
import { userModel } from "../models/user.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256']
});

export const isAuthorized = (role) => {
    return async (req, res, next) => {
        // Find user by ID
        const user = await userModel.findById(req.auth.id);
        // Check if roles includes user role
        if (roles?.includes(user.role)) {
            next();
        } else {
            res.status(403).json('You are not authorized!')
        }

    }
}


// export const isAuthenticated = (req, res, next) => {
//     console.log(req.headers);
//     // Get authorization header
//     const authorization = req.headers.authorization;
//     // Check the presence of the authorization
//     if (!authorization) {
//         return res.status(401).json('Authorization header does not exist!');
//     }
//     // Get access token from authorization
//     const token = authorization.split('')[1];
//     // Check if token exists
//     if (!token) {
//         return res.status(401).json('Access token not provided');
//     }
//     // Verify and decode the access token
//     jwt.verify(
//         token,
//         process.env.JWT_SECRET_KEY,
//         (error, decoded) => {
//             // Handle verify error
//             if (error) {
//                 return res.status(401).json(error);
//             }
//             // Add decoded to request object
//             req.user = decoded;
//             // Process to next handler
//             next();
//         }
//     );

// }