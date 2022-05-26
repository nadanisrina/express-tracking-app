const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
    minlength: 6
  },
  image: {
    type: String,
    unique: false,
    required: true,
  },
  places: [
    {type: mongoose.Types.ObjectId, required: true, ref: 'Place'}
  ],
});

userSchema.plugin(uniqueValidator)
const User = mongoose.model("User", userSchema);

module.exports = User