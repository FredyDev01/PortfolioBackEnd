import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'

import MdlOwner from '../models/mdlOwner.js'
import { generateToken, generateRefreshToken } from '../utils/token.js'

const ctrOwner = {
  login: async (req, res) => {
    const { email, password } = req.body
    try {
      const { password: ownerPassword } = await MdlOwner.findOne({ email })
      if (ownerPassword) {
        const validPassword = await bycript.compare(password, ownerPassword)
        if (validPassword) {
          const { token, expiresIn } = generateToken()
          const refreshToken = generateRefreshToken()
          res.status(200).json({ token, expiresIn, refreshToken })
        } else {
          res.status(203).json({ message: 'Password invalido' })
        }
      } else {
        res.status(203).json({ message: 'Email invalido' })
      }
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .json({ message: 'Error del servidor al momento de logearse' })
    }
  },

  getToken: (req, res) => {
    try {
      const { refreshtoken } = req.headers
      if (refreshtoken && refreshtoken !== '') {
        const check = jwt.verify(refreshtoken, process.env.JWT_REFRESH)
        if (check) {
          const { token, expiresIn } = generateToken()
          res.status(200).json({ token: `Bearer ${token}`, expiresIn })
        } else {
          res
            .status(500)
            .json({ message: 'El refreshToken ingrezado no es valido.' })
        }
      } else {
        res
          .status(500)
          .json({ message: 'El refreshToken requerido no existe.' })
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error del servidor al generar el token.' })
    }
  },
}

export default ctrOwner
