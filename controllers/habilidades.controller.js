const mdl_habilidades = require('../models/habilidades.model')


const DevHabilidades = {
    Get_Habilidades: async(req, res)=>{
        const Id =  parseInt(req.params.id)
        try{ 
            if(Id == 0){
                var Paginate = {limit: 100, sort: {_id: req.query.Ord || -1}}
                var Filtros = {}                
                if(req.query.Busq) Filtros.Titular = {$regex: req.query.Busq, $options: 'i'} 
                if(req.query.Page) Paginate.limit = 6, Paginate.page = req.query.Page              
                const Consult = await mdl_habilidades.paginate(Filtros, Paginate)
                res.status(200).json({Datos: Consult.docs, MaxPage: Consult.totalPages})
            }else{
                const Consult = await mdl_habilidades.findById(Id)
                res.status(200).json({Datos: Consult})
            }
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'El servidor tuvo problemas al momento de encontrar los datos de sus habilidades.'})
        }
    },
    
    Add_Habilidades: async(req, res)=>{                
        try{                    
            const Data = req.body                        
            const Document = await mdl_habilidades.findOne().sort({_id: -1})                  
            Data._id = Document ? Document._id + 1 : 1                                                 
            const Habilidades = new mdl_habilidades(Data)
            await Habilidades.save()
            res.status(200).json({Mensaje: 'Su habilidad fue guardada con exito.'})
        }catch(err){
            console.log(err)
            res.status(500).Mensaje({Mensaje: 'El servidor tuvo problemas al intentar agregar su nueva habilidad.'})
        }
    },
    
    Edit_Habilidades: async(req, res)=>{
        try{
            const Id = parseInt(req.params.id)
            const Data = req.body            
            const Habilidad = new mdl_habilidades(Data)                        
            await mdl_habilidades.updateOne({_id: Id}, {$set: Habilidad})
            res.status(200).json({Mensaje: 'Habilidad editada con exito.'})
        }
        catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'El servidor tuvo problemas al momento de editar su habilidad.'})
        }
    },
    
    Delete_Habilidades: async(req, res)=>{
        try{
            const Id = req.params.id            
            await mdl_habilidades.deleteOne({_id: Id})        
            res.status(200).json({Mensaje: 'La habilidad se elimino con exito.'})
        }catch(err){
            console.log(err)
            res.status(500).json({Mensaje: 'El servidor tuvo problemas al momento de eliminar su habilidad.'})
        }
    }            
}


module.exports = DevHabilidades