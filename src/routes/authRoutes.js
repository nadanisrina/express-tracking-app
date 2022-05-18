const express = require("express");
const { check } = require("express-validator");
// const mongoose = require("mongoose");
// const User = mongoose.model("User");
// const jwt = require("jsonwebtoken");

const userController = require("../controllers/users-controllers");

// const router = express.Router();

// router.post("/signup", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = new User({ email, password });
//     await user.save();

//     const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
//     res.send({ token: token });
//   } catch (err) {
//     res.status(422);
//     res.send(err.message);
//   }
// });
const router = express.Router();

router.post('/signup', [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({min : 5})] ,userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getUsers);


module.exports = router;
