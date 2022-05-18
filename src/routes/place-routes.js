const express = require('express');
const placeController = require('../controllers/places-controllers')
const { check } = require('express-validator')

const router = express.Router();

router.get('/', placeController.getAll)

router.get('/:pid', placeController.getPlaceById)

router.get('/user/:uid', placeController.getPlacesByUserId)

router.post('/', 
    [check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty()],
    placeController.createPlace)

router.patch('/:pid', placeController.updatePlaceById)

router.delete('/:pid', placeController.deletePlaceById)


module.exports = router;
