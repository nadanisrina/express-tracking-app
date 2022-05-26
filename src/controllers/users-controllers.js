const { validationResult } = require('express-validator')
const uuid = require('uuid')
const HttpError = require('../models/http-error')
const User = require('../models/User')
let DUMMY_USERS = [
    {
        id: uuid.v4(),
        name: "nada",
        email: "nisrina@gmail.com",
        password: "aaaa"
    },
    {
        id: uuid.v4(),
        name: "user2",
        email: "user2@gmail.com",
        password: "user2"
    },
    {
        id: uuid.v4(),
        name: "user3",
        email: "user3@gmail.com",
        password: "user3"
    }
]
const getUsers = async(req,res,next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (error) {
        return next(new HttpError('Fetching users failed, please try again later.', 500))
    }
    res.status(200).json({users : users })
}

const login = async(req,res,next) => {
    const {email, password} = req.body

    let existingUser 
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError('Sign up failed, please try again later', 500))
    }

    if(!existingUser || existingUser.password !== password){
        return next(new HttpError('User Not Found. please sign up first.', 422))
    }

    res.json({ message: 'Logged in!' })

}

const signup = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new HttpError('Data could not be Empty',422))
    }
    
    const { name, email, password } = req.body

    let existingUser 
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError('Sign up failed, please try again later', 500))
    }

    if(existingUser){
        return next(new HttpError('User Already exist. please login instead.', 422))
    }
    const createUser = new User({
        name,
        email,
        image: "https://www.gooasalkasdjklasds.com",
        password,
        places: []
    })

    console.log("createUser", createUser)

   try {
       await createUser.save();
   } catch (error) {
       next(new HttpError('Could not create user', 500))
   }
   res.status(201).json({place: createUser, message: 'success create a user.'})

}

exports.getUsers = getUsers;
exports.login = login
exports.signup = signup