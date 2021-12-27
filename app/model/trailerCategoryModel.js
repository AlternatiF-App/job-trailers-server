const mongoose = require('mongoose')

let trailerCategorySchema = mongoose.Schema({
    name : {
        type : String,
        require: [true, 'Trailer category name must be filled!']
    }
}, {timestamps: true})

module.exports = mongoose.model('TrailerCategory', trailerCategorySchema)