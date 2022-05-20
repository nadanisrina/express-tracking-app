const { validationResult } = require('express-validator')
const uuid = require('uuid')
const HttpError = require('../models/http-error')
let DUMMY_USERS = [
    {
        id: 'u1',
        name: "nada",
        email: "nisrina@gmail.com",
        password: "aaaa"
    },
    {
        id: 'u2',
        name: "user2",
        email: "user2@gmail.com",
        password: "user2"
    },
    {
        id: 'u3',
        name: "user3",
        email: "user3@gmail.com",
        password: "user3"
    }
]
const getUsers = (req,res,next) => {
    res.json(DUMMY_USERS)
}

const login = (req,res,next) => {
    const {email, password} = req.body

    let identifiedUser = DUMMY_USERS.find(item => item.email === email)
    if(!identifiedUser || identifiedUser.password !== password){
        return next(new HttpError('Could not find user',404));
    }

    res.json({ message: 'Logged in!' })

}

const signup = (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        throw new HttpError('Data could not be Empty',422)
    }
    if(!error.isEmpty()){
        throw new HttpError('Data could not be Empty',422)
    }
    const { name, email, password } = req.body
    const createUser = {
        id: uuid.v4(),
        name,
        email,
        password
    }
    if(DUMMY_USERS.find(u => u.email === email)){
        return next(new HttpError('Email already been used',422));
    }
    DUMMY_USERS.push(createUser)

    res.json(createUser) 
}

exports.getUsers = getUsers;
exports.login = login
exports.signup = signup