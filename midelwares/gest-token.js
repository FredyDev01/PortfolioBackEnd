const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next)=>{
    const token = req.header('auth-token')       
    console.log(token)
    if(!token){
        return res.status(400).json({error: 'Acceso denegado'})
    }            
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err) res.status(400).json({Mensaje: 'El token no es valido'}) 
        else{
            req.decoded = decoded
            next()
        }
    })         
}


module.exports = verifyToken