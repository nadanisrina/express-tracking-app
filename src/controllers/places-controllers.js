const HttpError = require('../models/http-error')
const uuid = require('uuid')
const { validationResult } = require('express-validator')
const getCoordinates = require('../util/location')
const Place = require('../models/place')
const mongoose  = require('mongoose')
const User = require('../models/User')
let DUMMY_PLACES = [
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

const getAll = async(req, res, next) => {
    let place;
    try {
        place = await Place.find({}).then(function (places) {
            res.send(places);
        });
    } catch (error) {
        return next(new HttpError('Something went wrong, could not find a place', 500))
    }
    res.json({place : place})
}

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;

    try {
        place = await Place.findById(placeId).exec()
    } catch (error) {
        const err = new HttpError(
            'Something went wrong, could not find a place', 500
        );
        return next(err)
    }

     if(!place){
        return next(new HttpError('Could not find a place for the provided id.',404));
    }

    // if(!place){
    //     return res.status(404).json({ message : 'Could not find a place for the provided id.' })
    // }

    res.json({ place: place }); // => { place } => { place: place }
}


const getPlaceByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    // let place;
    let userWithPlaces

    try {
        userWithPlaces = await User.findById(userId).populate('places')
        // place = await Place.findById(placeId).populate('creator')
    } catch (error) {
        const err = new HttpError(
            'Something went wrong, could not find a place', 500
        );
        return next(err)
    }

     if(!userWithPlaces || userWithPlaces.places.length === 0){
        return next(new HttpError('Could not find a place for the provided user id.',404));
    }

    // if(!place){
    //     return res.status(404).json({ message : 'Could not find a place for the provided id.' })
    // }

    res.json({ place: userWithPlaces.places.map(place => place) }); // => { place } => { place: place }
}

const createPlace = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        next(new HttpError('Data could not be Empty',422))
    }
    const { title, description, coordinates, address, creator } = req.body;

    let coordinatesFromMap;
    try {
        coordinatesFromMap = await getCoordinates(address)
    } catch (error) {
        next(error)
    }
    const createdPlace = new Place({
        id: uuid.v4(),
        title: title,
        description: description,
        location: coordinatesFromMap,
        address: address,
        creator: creator
    })
    let user;

    try{
        user = await User.findById(creator).exec();
        if(!user){
            return next(new HttpError('Cannot find user id ', 404))
        }
    }catch (err) {
        return next(new HttpError('Creating user with provided id, please try again', 500))
    }

    console.log("user333", user.places)

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });     
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        return next(new HttpError('Creating place failed, please try again.',500));
    }
    res.status(201).json({place: createdPlace, message: 'success create a place.'})
} 

const updatePlaceById = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid input passed, please check your data.', 422)
    }
    const { title, desc } = req.body
    const { pid } = req.params
    let place;
    try {
        place = await Place.findById(pid).exec()
    } catch (err) {
        return next(new HttpError('Something went wrong, could not find place', 500))
    }

    place.title = title;
    place.description = desc;
    try {
        await place.save();
    } catch (error) {
        return next(new HttpError('Something went wrong, could not update place', 500))
    }

    res.status(200).json({place : place})

}

const deletePlaceById = async (req, res, next) => {
    const { pid } = req.params
    
    let place;
    try{
        place = await Place.findById(pid);
    }catch(err){
        return next(new HttpError('Something went wrong', 500))
    }

    try {
        place.remove()
    } catch (error) {
        return next(new HttpError('Something went wrong, could not delete place', 500))
    }

    res.status(200).json({message : `Success delete place with id ${pid}`})
}

exports.getAll = getAll;
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
