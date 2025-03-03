import express from 'express';
import productsRouter from './routes/products.js';

// Create an express app
const app = express();

// Use routes
app.use(productsRouter);

//listen for incoming request
app.listen(3000, () => {
    console.log('Server listening on port 3000');
})