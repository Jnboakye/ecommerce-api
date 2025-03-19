import { Router } from "express";
import { addProduct, contProducts, deleteProduct, getProducts, updateProduct } from "../controllers/products.js";
import { localUpload, productPicturesUpload, remoteUpload } from "../middlewares/upload.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create a product router
const productsRouter = Router();

//Define routes
productsRouter.post('/products',
    isAuthenticated,
    //remoteUpload.single('image'),
    productPicturesUpload.array('pictures', '3'),
    addProduct);

productsRouter.get('/products', getProducts);

productsRouter.get('/products/count', contProducts);

productsRouter.patch('/products/:id', isAuthenticated, updateProduct);

productsRouter.delete('/products/:id', isAuthenticated, deleteProduct);

//export router 
export default productsRouter;