const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const { chat } = require('../controllers/chatbot.controller');

router.post('/', authenticate, chat);

module.exports = router;
