const mongoose = require('mongoose')
const { Schema } = mongoose


const Login = new Schema({
    Email: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    },
    _id: {
        type: Number,
        require: true
    }
})


module.exports = mongoose.model('owner', Login)