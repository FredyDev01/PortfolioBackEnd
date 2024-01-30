import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import multer from 'multer'

import rouKnowledge from './routes/rouKnowledge.js'
import rouOwner from './routes/rouOwner.js'
import rouProject from './routes/rouProject.js'
import rouSkill from './routes/rouSkill.js'

const app = express()
export const storage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(storage.single('image'))
app.use((req, _, next) => {
  if (req.file) {
    const mimetype = req.file.mimetype
    const base64 = req.file.buffer.toString('base64')
    req.file.base64 = `data:${mimetype};base64,${base64}`
  }
  next()
})
app.use(morgan('dev'))
config()

const whiteList = ['https://portafolio-web-frontend-7237c.web.app']
app.use(
  cors({
    origin: (origin, callback) => {
      if (whiteList.includes(origin)) {
        return callback(null, origin)
      }
      return callback(new Error('Url no permitida:', origin))
    },
    credentials: true,
  })
)

app.use('/knowledge', rouKnowledge)
app.use('/skill', rouSkill)
app.use('/project', rouProject)
app.use('/owner', rouOwner)

export default app
