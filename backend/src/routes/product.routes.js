const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

router.get('/', authenticate, listProducts);
router.get('/:id', authenticate, getProductById);
router.post('/', authenticate, authorize(['FARMER']), createProduct);
router.put('/:id', authenticate, authorize(['ADMIN', 'FARMER']), updateProduct);
router.delete('/:id', authenticate, authorize(['ADMIN', 'FARMER']), deleteProduct);

module.exports = router;
