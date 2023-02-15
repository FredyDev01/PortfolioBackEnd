const mongoose_paginate = require('mongoose-paginate-v2')
const mongoose = require('mongoose')
const { Schema } = mongoose


const Habilidad = new Schema({
    Titular:{
        type: String,
        require: true
    },
    Porcentaje:{
        type: Number,
        require: true,
        min: 1,
        max: 100
    },
    _id:{
        type: Number,
        require: true
    }
})
Habilidad.plugin(mongoose_paginate)


module.exports = mongoose.model('habilidades', Habilidad)