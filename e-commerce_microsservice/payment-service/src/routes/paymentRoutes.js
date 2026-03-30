const router = require('express').Router();
const controller = require('../controllers/paymentController');

router.post('/payments', controller.processPayment);

module.exports = router;