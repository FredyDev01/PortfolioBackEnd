const jwt = require('jsonwebtoken')


const GenerateToken = (uid) => {
    const expiresIn = 60 * 15
    try{
        const token = jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn})        
        return { token, expiresIn }
    }catch(err){
        console.log(err)        
    }
}

const GenerateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30
    try{
        const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH, {expiresIn})                                
        return refreshToken
    }catch(err){
        console.log(err)
    }
}


module.exports = { GenerateToken, GenerateRefreshToken }