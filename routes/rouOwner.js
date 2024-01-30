import express from 'express'

import ctrOwner from '../controllers/ctrOwner.js'

const router = express.Router()

router.post('/login', ctrOwner.login)
router.get('/getToken', ctrOwner.getToken)

export default router
