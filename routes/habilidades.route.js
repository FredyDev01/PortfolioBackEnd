const express = require('express')
const router = express.Router()
const vrftoken = require('../midelwares/gest-token')
const ctr_habilidades = require('../controllers/habilidades.controller')


router.get('/GetData/:id', ctr_habilidades.Get_Habilidades)
router.post('/NewData', vrftoken, ctr_habilidades.Add_Habilidades)
router.put('/EditData/:id', vrftoken, ctr_habilidades.Edit_Habilidades)
router.delete('/DeleteData/:id', vrftoken, ctr_habilidades.Delete_Habilidades)


module.exports = router