const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    Rating : Number,
    Body : String,
})


module.exports = mongoose.model('Review', reviewSchema)