const express = require('express')
const router = express.Router()
const vrftoken = require('../midelwares/gest-token')
const ctr_Proyectos = require('../controllers/proyectos.controller')


router.get('/GetData/:id', ctr_Proyectos.Get_Proyectos)
router.get('/GetTecnologias', ctr_Proyectos.Get_Tecnologias)
router.post('/NewData', vrftoken, ctr_Proyectos.Add_Proyectos)
router.put('/EditData/:id', vrftoken, ctr_Proyectos.Edit_Proyectos)
router.delete('/DeleteData/:id', vrftoken, ctr_Proyectos.Delete_Proyectos)


module.exports = router