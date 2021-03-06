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
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});
const Place = mongoose.model('Place', placeSchema);
//virtualize id each schema
// placeSchema.set('toJSON', {
//     virtuals: true,
//     versionKey:false,
//     transform: function (doc, ret) {   delete ret._id  }
// });
module.exports = Place