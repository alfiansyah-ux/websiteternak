const express = require('express');
const router = express.Router();
const { getProfile, getAllUsers } = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/profile', authenticate, getProfile);
router.get('/all', authenticate, authorize(['ADMIN']), getAllUsers);

module.exports = router;