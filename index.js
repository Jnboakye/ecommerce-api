import express from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';


// Make database connection

await mongoose.connect(process.env.MONGO_URI);

// Create an express app
const app = express();

//Use global middlewares
app.use(express.json());

// Use routes
app.use('/api/v1', productsRouter);
app.use('/api/v1', userRouter);

//listen for incoming request
const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server listening on port ${port}`);
})