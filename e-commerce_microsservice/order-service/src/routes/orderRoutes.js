const router = require('express').Router();
const controller = require('../controllers/orderController');

router.post('/orders', controller.createOrder);
router.get('/orders/:id', controller.getOrderById);

module.exports = router;