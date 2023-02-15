const mongoose_paginate = require('mongoose-paginate-v2')
const mongoose = require('mongoose')
const { Schema } = mongoose


const Conocimiento = new Schema({
    UrlImage:{
        type: String,
        require: true        
    },
    NameImage:{
        type: String,
        require: true
    },
    Titular:{
        type: String,
        require: true
    },
    Resumen:{
        type: String,
        require: true
    },
    Descripcion:{
        type: String,
        require: true
    },
    Nivel:{
        type: String,
        require: true
    },
    _id:{
        type: Number,
        require: true
    }
})
Conocimiento.plugin(mongoose_paginate)


module.exports = mongoose.model('conocimientos', Conocimiento)