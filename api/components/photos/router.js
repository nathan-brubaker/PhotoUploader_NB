const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', (request, response) => controller.getPhotoListing(request, response));
router.post('/', (request, response) => controller.savePhoto(request, response));

module.exports = router;