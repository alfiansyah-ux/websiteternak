const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { createOrder, listOrders, getOrderById } = require('../controllers/order.controller');

router.use(authenticate);
router.get('/', authorize(['CUSTOMER', 'ADMIN']), listOrders);
router.get('/:id', authorize(['CUSTOMER', 'ADMIN']), getOrderById);
router.post('/', authorize(['CUSTOMER']), createOrder);

module.exports = router;
