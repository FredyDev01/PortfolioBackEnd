const mongoose_paginate = require('mongoose-paginate-v2')
const mongoose = require('mongoose')
const { Schema } = mongoose


const Proyecto = new Schema({
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
    Funcionalidad:{
        type: String,
        require: true
    },
    Tipo:{
        type: String,
        require: true
    },
    Tecnologias:{
        type: Array,
        require: true
    },
    VerCodigo:{
        type: String,
        require: true
    },
    VerProyecto:{
        type: String,
        require: true
    },
    _id: {
        type: Number,
        require: true
    }
})
Proyecto.plugin(mongoose_paginate)


module.exports = mongoose.model('proyectos', Proyecto)