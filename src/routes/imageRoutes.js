const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// GET /images
router.get('/', imageController.getImages);

module.exports = router;
