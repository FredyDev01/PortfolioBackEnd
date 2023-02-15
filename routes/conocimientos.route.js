const express = require('express')
const router = express.Router()
const vrftoken = require('../midelwares/gest-token')
const ctr_conocimientos = require('../controllers/conocimientos.controller')


router.get('/GetData/:id', ctr_conocimientos.Get_Conocimientos)
router.post('/NewData', vrftoken, ctr_conocimientos.Add_Conocimientos)
router.put('/EditData/:id', vrftoken, ctr_conocimientos.Edit_Conocimientos)
router.delete('/DeleteData/:id', vrftoken, ctr_conocimientos.Delete_Conocimientos)


module.exports = router