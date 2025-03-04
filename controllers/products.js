// contollers are javascript functions

export const addProduct = (req, res) => {
    // Upload the product image
    // Validate the product information
    // Save product information in database 
    // Return response
    res.json(req.body);
}

export const getProducts = (req, res) => {
    res.send('All products!');
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

