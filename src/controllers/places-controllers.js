const HttpError = require('../models/http-error')
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
const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    })

     if(!place){
        return next(new HttpError('Could not find a place for the provided id.',404));
    }

    // if(!place){
    //     return res.status(404).json({ message : 'Could not find a place for the provided id.' })
    // }

    res.json({ place: place }); // => { place } => { place: place }
}
const getUserById = (req, res, next) => {
    const userId = req.params.uid

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId
    })

    if(!place){
        return next(new HttpError('Could not find a place for the provided user id.',404));

    }

    // if(!place){
    //     // res.status(404).json({ message: 'Could not find a place for the provided id.' })
    //     const error = new Error ('Could not find a place for the provided user id.');
    //     error.code = 404;
    //     return next(error)
    // }

    res.json({ place: place })
}

exports.getPlaceById = getPlaceById;
exports.getUserById = getUserById;
