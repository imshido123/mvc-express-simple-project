/*CONTROLLER*/

/*Dependencies*/
const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');

/*Instantiating services to use*/
const productService = new ProductsService();

/*Routes definition*/
router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    console.log('req', req.query);
    
    try {
        /*Intentional error*/
        // To see this error correctly when requesting this operation, make sure you include
        // "X-Requested-With=XMLHttpRequest" to trigger our "clientErrorHandler"
        // throw new Error('Intentional error occurred in the API!'); 

        const products = await productService.getProducts({ tags });

        res.status(200).json({
            data: products,
            message: 'products listed'
        });
    }
    catch(err) {
        next(err);
    }
});

router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    console.log('req', req.params);

    try {
        const product = await productService.getProduct({ productId });

        res.status(200).json({
            data: product,
            message: 'product retrieved'
        });
    }
    catch(err) {
        next(err);
    }

});

router.post('/', async (req, res, next) => {
    const { body: product } = req;
    console.log('req', req.body);

    try {
        const newProduct = await productService.createProduct({ product });

        res.status(201).json({
            data: newProduct,
            message: 'product created'
        });
    }
    catch(err) {
        next(err);
    }
});

router.put('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { body: product } = req;
    console.log('req', req.params, req.body);

    try {
        const updatedProduct = await productService.updateProduct({ productId, product });

        res.status(200).json({
            data: updatedProduct,
            message: 'product updated'
        });
    }
    catch(err) {
        next(err);
    }
});

router.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    console.log('req', req.params);

    try {
        const deletedProduct = await productService.deleteProduct({ productId })

        res.status(200).json({
            data: deletedProduct,
            message: 'product deleted'
        });
    }
    catch(err) {
        next(err);
    }
});

module.exports = router;