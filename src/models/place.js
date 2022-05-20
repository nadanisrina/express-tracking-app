const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { 
        lat : { type: Number, required: true },
        long : { type: Number, required: true },
     },
    address: { type: String, required: true },
    creator: { type: String, required: true },
});
const Place = mongoose.model('Place', placeSchema);
module.exports = Place