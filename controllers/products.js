//This is the business model
// contollers are javascript functions
import { addProductValidator } from "../validators/products.js";
import { ProductModel } from "../models/product.js";

export const addProduct = async (req, res, next) => {
    try {
        console.log(req.auth);
        // Upload the product image
        console.log(req.file);
        // Validate the product information
        const { error, value } = addProductValidator.validate({
            ...req.body,
            // image: req.file.filename,
            pictures: req.files?.map((file) => {
                return file.filename;
            }),
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Save product information in database 
        const result = await ProductModel.create({
            ...value,
            userID: req.auth.id
        });

        // Return response
        res.json(result);
    } catch (error) {
        if (error.code === 'MongooseError') {
            return res.status(409).json(error.message);
        }
        next(error);
    }
}

export const getProducts = async (req, res) => {
    try {
        const { filter = "{}" } = req.query
        // Fetch products from database
        const result = await ProductModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort));
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

export const replaceProduct = async (req, res) => {
    //Validate incoming request body
    // Perform model replace operation
    const result = await ProductModel.findOneAndReplace(
        { _id: req.params.id },
        req.body,
        { new: true }
    );

    // return response
    res.status(200).json(result);
}

export const deleteProduct = (req, res) => {
    res.send(`Product with id ${req.params.id} deleted`);
}

