import { Router } from "express";
import { loginUser, registerUser } from "../controllers/users.js";

// Create user router
const userRouter = Router();

// Define routes
userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', loginUser);

// Export router
export default userRouter;