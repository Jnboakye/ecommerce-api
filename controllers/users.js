import { userModel } from "../models/user.js";
import { loginUserValidator, registerUserValidator, updateUserValidator } from "../validators/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const registerUser = async (req, res, next) => {
    // Validate user information
    const { error, value } = registerUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // Check if user does not exist already
    const user = await userModel.findOne({
        $or: [
            { username: value.username },
            { email: value.email },

        ]
    });

    if (user) {
        return res.status(409).json('User already exists ')
    }
    // Hash plaintext password
    const hashedPassword = bcrypt.hashSync(value.password, 10);

    // Create user record in database
    const result = await userModel.create({
        ...value,
        password: hashedPassword
    });
    // Send registration email to user
    // (optionally) Generate access token for user
    // Return response
    res.status(201).json('User registred sucessfully')
};

export const loginUser = async (req, res, next) => {
    // Validate user information
    const { error, value } = loginUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // Find matching user record in database
    const user = await userModel.findOne({
        $or: [
            { username: value.username },
            { email: value.email },

        ]
    });
    if (!user) {
        return res.status(404).json('User does not exist! ')
    };


    // Compare incoming password with saved password 
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
        return res.status(401).json('Invalid Credentials!')
    }
    // Generate access token for user
    const accessToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    );
    // Return response
    res.status(200).json({ accessToken });
};

export const updateUser = async (req, res, next) => {
    // Validate request body
    const { error, value } = updateUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // Update user in databse
    const result = await userModel.findByIdAndUpdate(
        req.params.id,
        value,
        { new: true }
    );
    // Return response
    res.status(200).json(result);
}