import express from 'express'

import verifyToken from '../midelwares/verifyToken.js'

import ctrSkill from '../controllers/ctrSkill.js'

const router = express.Router()

router.get('/getData/:id', ctrSkill.getSkills)
router.post('/newData', verifyToken, ctrSkill.addSkill)
router.put('/editData/:id', verifyToken, ctrSkill.editSkill)
router.delete('/deleteData/:id', verifyToken, ctrSkill.deleteSkill)

export default router
