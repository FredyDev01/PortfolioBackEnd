const express = require('express')
const router = express.Router()
const ctr_auth = require('../controllers/auth.controller')


router.post('/Login', ctr_auth.Login)
router.get('/Logout', ctr_auth.Logout)
router.get('/GetToken/:uid', ctr_auth.GetToken)


module.exports = router