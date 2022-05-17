const express = require('express');
const placeController = require('../controllers/places-controllers')

const router = express.Router();

router.get('/:pid', placeController.getPlaceById)

router.get('/user/:uid', placeController.getUserById)

module.exports = router;
