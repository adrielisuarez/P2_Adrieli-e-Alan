const router = require('express').Router();
const controller = require('../controllers/productController');

router.post('/products', controller.createProduct);
router.get('/products', controller.getProducts);
router.get('/products/:id', controller.getProductById);

module.exports = router;