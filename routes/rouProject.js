import express from 'express'

import verifyToken from '../midelwares/verifyToken.js'

import ctrProject from '../controllers/ctrProject.js'

const router = express.Router()

router.get('/getData/:id', ctrProject.getProjects)
router.post('/newData', verifyToken, ctrProject.addProject)
router.put('/editData/:id', verifyToken, ctrProject.editProject)
router.delete('/deleteData/:id', verifyToken, ctrProject.deleteProject)

export default router
