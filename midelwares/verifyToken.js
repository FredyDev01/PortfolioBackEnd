import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    const token = authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'El token no es valido' })
      }
      req.decoded = decoded
      next()
    })
  } else {
    return res.status(403).json({ message: 'Acceso denegado' })
  }
}

export default verifyToken
