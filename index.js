const app = require('./app')
const mongoose = require('mongoose')
const Puerto = process.env.PORT || 3000


//Route error 404
app.use((req, res, next)=>{
    res.status(404).send('La direccion de la peticion es incorrecta.')
})


//Starting DB y Server
mongoose.set("strictQuery", true)
mongoose.connect(`mongodb+srv://Fredy:${process.env.DB_PASSWORD}@cluster0.mbll53k.mongodb.net/?retryWrites=true&w=majority`, {useNewUrlParser: true})
.then((e) => {
    console.log('Base de datos conectada con exito al servidor')
    app.listen(Puerto, ()=>{
        console.log(`El servidor se inicio en http://localhost:${Puerto}`)
    })
})
.catch(err => console.log(err))