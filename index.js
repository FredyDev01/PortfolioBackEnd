import cloudinary from 'cloudinary'
import mongoose from 'mongoose'

import app from './app.js'

const port = process.env.PORT || 3000

app.use((req, res) => {
  res.status(404).send('La direccion de la peticion es incorrecta.')
})

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose.set('strictQuery', true)
mongoose
  .connect(
    `mongodb+srv://Fredy:${process.env.DB_PASSWORD}@cluster0.mbll53k.mongodb.net/portfolio?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(port)
  })
