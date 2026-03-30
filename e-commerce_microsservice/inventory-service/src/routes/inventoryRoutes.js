const router = require('express').Router();
const controller = require('../controllers/inventoryController');

router.put('/inventory/:productId', controller.updateInventory);
router.get('/inventory/:productId', controller.getInventory);

module.exports = router;