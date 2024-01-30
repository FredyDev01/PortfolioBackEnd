import jwt from 'jsonwebtoken'

export const generateToken = () => {
  const expiresIn = 60 * 15
  try {
    const token = jwt.sign({ owner: 'fredy' }, process.env.JWT_SECRET, {
      expiresIn,
    })
    return { token, expiresIn }
  } catch (err) {
    return null
  }
}

export const generateRefreshToken = () => {
  const expiresIn = 60 * 60 * 24 * 30
  try {
    const refreshToken = jwt.sign({ owner: 'fredy' }, process.env.JWT_REFRESH, {
      expiresIn,
    })
    return refreshToken
  } catch (err) {
    return null
  }
}
