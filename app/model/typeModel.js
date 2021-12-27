const mongoose = require('mongoose')

let typeSchema = mongoose.Schema({
    name : {
        type : String,
        require: [true, 'Type name must be filled!']
    }
}, {timestamps: true})

module.exports = mongoose.model('Type', typeSchema)