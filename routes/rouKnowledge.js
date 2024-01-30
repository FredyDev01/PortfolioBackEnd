import express from 'express'

import verifyToken from '../midelwares/verifyToken.js'

import ctrlKnowledge from '../controllers/ctrlKnowledge.js'

const router = express.Router()

router.get('/getData/:id', ctrlKnowledge.getKnowledges)
router.post('/newData', verifyToken, ctrlKnowledge.addKnowledge)
router.put('/editData/:id', verifyToken, ctrlKnowledge.editKnowledge)
router.delete('/deleteData/:id', verifyToken, ctrlKnowledge.deleteKnowledge)

export default router
