const mdl_conocimientos = require('../models/conocimientos.model')
const mdl_proyectos = require('../models/proyectos.model')
const cloudinary = require('../midelwares/gest-image')
const { v4 : uuidv4 } = require('uuid')


const DevProyectos = {    
    Get_Proyectos: async(req, res)=>{
        const Id =  parseInt(req.params.id)
        try{ 
            if(Id == 0){
                var Paginate = {limit: 100, sort: {_id: req.query.Ord || -1}}
                var Filtros = {}                
                if(req.query.Busq) Filtros.Titular = {$regex: req.query.Busq, $options: 'i'} 
                if(req.query.Tipo) Filtros.Tipo = req.query.Tipo
                if(req.query.Tec) Filtros.Tecnologias = {$all: req.query.Tec.split(',')}      
                if(req.query.Page) Paginate.limit = 6, Paginate.page = req.query.Page                
                const consult = await mdl_proyectos.paginate(Filtros, Paginate)                
                res.status(200).json({Datos: consult.docs, MaxPage: consult.totalPages})
            }else{
                const consult = await mdl_proyectos.findById(Id)
                res.status(200).json({Datos: consult})
            }
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'El servidor tuvo problemas al momento de encontrar los datos de sus proyectos.'})
        }
    },
    
    Get_Tecnologias: async(req, res)=>{
        try{
            const Consult = await mdl_conocimientos.find().sort({_id: -1})
            const Arraytec = []
            Consult.forEach((e)=> Arraytec.push(e.Titular))
            res.status(200).json({Datos: Arraytec})
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'El servidor tuvo problemas al momento de obtener la lista de tecnologias.'})
        }
    },
    
    Add_Proyectos: async(req, res)=>{                
        try{                    
            const Data = req.body            
            const Img = await cloudinary.v2.uploader.upload(Data.Base64Image, {public_id: uuidv4(), folder: 'Images_Proyectos'})
            const Document = await mdl_proyectos.findOne().sort({_id: -1})
            Data.UrlImage = Img.url
            Data.NameImage = Img.public_id            
            delete Data.Base64Image                                     
            Data._id = Document ? Document._id + 1 : 1                                                 
            const Proyecto = new mdl_proyectos(Data)
            await Proyecto.save()
            res.status(200).json({Mensaje: 'Su proyecto fue guardado con exito.'})
        }catch(err){
            console.log(err)
            res.status(500).Mensaje({Mensaje: 'El servidor tuvo problemas al momento de ingrezar su nuevo proyecto.'})
        }
    },        
    
    Edit_Proyectos: async(req, res)=>{
        try{
            const Id = parseInt(req.params.id)
            const Data = req.body            
            const Proyecto = new mdl_proyectos(Data)
            if(Data.Base64Image){                
                const Img = await mdl_proyectos.findOne({_id: Id})                
                await cloudinary.v2.uploader.upload(Data.Base64Image, {public_id: Img.NameImage})
                delete Data.Base64Image
            }                        
            await mdl_proyectos.updateOne({_id: Id}, {$set: Proyecto})
            res.status(200).json({Mensaje: 'Proyecto editado con exito.'})
        }
        catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'El servidor tuvo problemas al intentar editar su proyecto.'})
        }
    },    
    
    Delete_Proyectos: async(req, res)=>{
        try{
            const Id = req.params.id
            const Img = await mdl_proyectos.findOne({_id: Id})
            await cloudinary.v2.uploader.destroy(Img.NameImage)  
            await mdl_proyectos.deleteOne({_id: Id})        
            res.status(200).json({Mensaje: 'El proyecto se elimino con exito.'})
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'El servidor tuvo problemas al intentar eliminar su proyecto.'})
        }
    }
}


module.exports = DevProyectos