const router = require('express').Router();
const controller = require('../controllers/userController');

router.post('/users', controller.createUser);
router.get('/users/:id', controller.getUserById);

module.exports = router;