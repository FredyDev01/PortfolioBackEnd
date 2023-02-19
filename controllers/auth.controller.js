const { GenerateToken, GenerateRefreshToken } = require('../utils/tokenManager')
const mdl_auth = require('../models/auth.model')
const jwt = require('jsonwebtoken')
const bycript = require('bcrypt')


const DevAuth = {
    Login: async (req, res)=>{
        const Email = req.body.Email
        const Password = req.body.Password
        try{
            const user = await mdl_auth.findOne({Email: Email})
            if(user){
                const vld_pasword = await bycript.compare(Password, user.Password)
                if(vld_pasword){                         
                    const { token, expiresIn } = GenerateToken()                    
                    const refreshToken = GenerateRefreshToken()                    
                    res.status(200).json({token, expiresIn, refreshToken})
                }else res.status(203).json({Mensaje: 'Password invalido'})
            }else res.status(203).json({Mensaje: 'Email invalido'})
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'Error del servidor al momento de logearse'})
        }        
    },

    GetToken: (req, res)=>{
        try{
            const RefreshToken = req.headers.refreshtoken                        
            if(RefreshToken && RefreshToken != ''){
                console.log(RefreshToken)
                const Verficacion = jwt.verify(RefreshToken, process.env.JWT_REFRESH)
                if(Verficacion){                    
                    const { token, expiresIn } = GenerateToken()
                    res.status(200).json({token, expiresIn})
                }else res.status(500).json({Mensaje: 'El RefreshToken ingrezado no es valido.'})
            }else res.status(500).json({Mensaje: 'El RefreshToken requerido no existe.'})
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'Error del servidor al generar el token.'})
        }
    }
}


module.exports = DevAuth