//This is the business model
// contollers are javascript functions

import { ProductModel } from "../models/product.js";

export const addProduct = async (req, res, next) => {
    try {
        // Upload the product image
        console.log(req.file);
        // Validate the product information
        const { error, value } = addProductValidator.validate({
            ...req.body,
            image: req.file.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Save product information in database 
        const result = await ProductModel.create(req.body)

        // Return response
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export const getProducts = async (req, res) => {
    try {
        // Fetch products from database
        const result = await ProductModel.find();
        // Return response 
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export const contProducts = (req, res) => {
    res.send('All products count!');
}

export const updateProduct = (req, res) => {
    res.send(`Product with id ${req.params.id} updated`);
}

export const deleteProduct = (req, res) => {
    res.send(`Product with id ${req.params.id} deleted`);
}

