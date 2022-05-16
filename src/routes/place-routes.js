const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world',
        location: {
            lat: 40,
            lng: 20
        },
        address: "aaa",
        creator: "u1"
    },
    {
        id: 'p2',
        title: 'Home',
        description: 'One of the most comfort',
        location: {
            lat: 10,
            lng: 10
        },
        address: "bbb",
        creator: "u2"
    }
]

router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    })

     if(!place){
        const error = new Error('Could not find a place for the provided id.');
        error.code = 404;
        return next(error);
    }

    // if(!place){
    //     return res.status(404).json({ message : 'Could not find a place for the provided id.' })
    // }

    res.json({ place: place }); // => { place } => { place: place }
})

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId
    })

    if(!place){
        const error = new Error('ould not find a place for the provided user id.');
        error.code = 404;
        return next(error);
    }

    // if(!place){
    //     // res.status(404).json({ message: 'Could not find a place for the provided id.' })
    //     const error = new Error ('Could not find a place for the provided user id.');
    //     error.code = 404;
    //     return next(error)
    // }

    res.json({ place: place })
})

module.exports = router;
