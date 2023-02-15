const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')


//Configuration middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json({limit: '70mb'}))
app.use(cookieParser())
app.use(morgan('dev'))
require('dotenv').config()


//Configuration cors
const whiteList = ['https://portafolio-frontend-7e2a.onrender.com', 'http://localhost:8080'] 
app.use(cors({
    origin: (origin, callback) => {
        if(!origin || whiteList.includes(origin)){
            return callback(null, origin)
        }         
        return callback(new Error('Url no permitida:', origin))        
    },
    credentials: true    
}))


//List routers
const conocimientos_route = require('./routes/conocimientos.route')
const habilidades_route = require('./routes/habilidades.route')
const proyectos_route = require('./routes/proyectos.route')
const auth_route = require('./routes/auth.route')


//Configuration routers
app.use('/Conocimientos', conocimientos_route)
app.use('/Habilidades', habilidades_route)
app.use('/Proyectos', proyectos_route)
app.use('/Auth', auth_route)


module.exports = app