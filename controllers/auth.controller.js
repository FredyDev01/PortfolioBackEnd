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
                    const { token, expiresIn } = GenerateToken(user._id)                    
                    const { refreshToken } = GenerateRefreshToken(user._id)                    
                    res.status(200).json({token, expiresIn, refreshToken})
                }else res.status(203).json({Mensaje: 'Password invalido'})
            }else res.status(203).json({Mensaje: 'Email invalido'})
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'Error del servidor al momento de logearse'})
        }        
    },

    Logout: (req, res)=> {       
        const RefreshToken = req.cookies.refreshToken
        if(RefreshToken){
            res.clearCookie('refreshToken')
            res.status(200).json({Mensaje: 'Sesion cerrada'})
        }else res.status(203).json({Mensaje: 'La cookie no existe'})         
    },

    GetToken: (req, res)=>{
        try{
            const RefreshToken = req.cookies.refreshToken   
            if(RefreshToken && RefreshToken != ''){
                const Verficacion = jwt.verify(RefreshToken, process.env.JWT_REFRESH)
                if(Verficacion){
                    const uid = req.params.uid
                    const { token, expiresIn } = GenerateToken(uid)
                    res.status(200).json({token, expiresIn})
                }else throw 'RefreshToken ya no es valido, vuelva a iniciar sesion.'
            }else res.status(203).json({token: null})
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'Error del servidor al generar el token.'})
        }
    }
}


module.exports = DevAuth