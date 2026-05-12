const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const {
  createLivestock,
  getLivestockList,
  getLivestockById,
  updateLivestock,
  deleteLivestock,
} = require('../controllers/livestock.controller');

router.use(authenticate);
router.get('/', authorize(['ADMIN', 'FARMER']), getLivestockList);
router.post('/', authorize(['FARMER']), createLivestock);
router.get('/:id', authorize(['ADMIN', 'FARMER']), getLivestockById);
router.put('/:id', authorize(['ADMIN', 'FARMER']), updateLivestock);
router.delete('/:id', authorize(['ADMIN', 'FARMER']), deleteLivestock);

module.exports = router;
