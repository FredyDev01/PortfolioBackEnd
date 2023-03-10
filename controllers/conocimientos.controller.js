const mdl_conocimientos = require('../models/conocimientos.model')
const cloudinary = require('../midelwares/gest-image')
const { v4 : uuidv4 } = require('uuid')


const DevConocimientos = {
    Get_Conocimientos: async(req, res)=>{        
        const Id = parseInt(req.params.id)
        try{ 
            if(Id == 0){
                var Paginate = {limit: 100, sort: {_id: req.query.Ord || -1}}
                var Filtros = {}
                if(req.query.Busq) Filtros.Titular = {$regex: req.query.Busq, $options: 'i'}
                if(req.query.Page) Paginate.limit = 6 , Paginate.page = req.query.Page                                                                                                  
                const Consult = await mdl_conocimientos.paginate(Filtros, Paginate)                                                                                   
                res.status(200).json({Datos: Consult.docs, MaxPage: Consult.totalPages})
            }else{
                const Consult = await mdl_conocimientos.findById(Id)
                res.status(200).json({Datos: Consult})
            }
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'El servidor tuvo problemas al momento de encontrar sus conocimientos.'})
        }
    },

    Add_Conocimientos: async(req, res)=>{                
        try{                    
            const Data = req.body            
            const Img = await cloudinary.v2.uploader.upload(Data.Base64Image, {public_id: uuidv4(), folder: 'Images_Conocimientos'})
            const Document = await mdl_conocimientos.findOne().sort({_id: -1})            
            Data.UrlImage = Img.secure_url
            Data.NameImage = Img.public_id            
            delete Data.Base64Image                                     
            Data._id = Document ? Document._id + 1 : 1                                                 
            const Conocimiento = new mdl_conocimientos(Data)
            await Conocimiento.save()
            res.status(200).json({Mensaje: 'Su conocimiento fue guardado con exito.'})
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'El servidor tuvo problemas al momento de guardar su nuevo conocimiento.'})
        }
    },        
    
    Edit_Conocimientos: async(req, res)=>{
        try{
            const Id = parseInt(req.params.id)
            const Data = req.body                                    
            if(Data.Base64Image){                
                const Image = await mdl_conocimientos.findOne({_id: Id})                                
                const Upload = await cloudinary.v2.uploader.upload(Data.Base64Image, {public_id: Image.NameImage})
                Data.UrlImage = Upload.url + '?timestamp=' + new Date().toLocaleTimeString()
                delete Data.Base64Image
            }
            const Conocimiento = new mdl_conocimientos(Data)                        
            await mdl_conocimientos.updateOne({_id: Id}, {$set: Conocimiento})
            res.status(200).json({Mensaje: 'Conocimiento editado con exito.'})
        }
        catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'El servidor tuvo problemas al momento de editar su conocmiento.'})
        }
    },    
    
    Delete_Conocimientos: async(req, res)=>{
        try{
            const Id = req.params.id
            const Img = await mdl_conocimientos.findOne({_id: Id})
            await cloudinary.v2.uploader.destroy(Img.NameImage)  
            await mdl_conocimientos.deleteOne({_id: Id})        
            const Document = await mdl_conocimientos.paginate({}, {limit: 6})            
            res.status(200).json({MaxPage: Document.totalPages})
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'El servidor tuvo problemas al momento de eliminar su conocimiento.'})
        }
    }    
}


module.exports = DevConocimientos