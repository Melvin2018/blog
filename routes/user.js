import express from 'express'
import controller from '../controllers/user.js'

const router = express.Router()

router.get('/', controller.getUser)
router.post('/', controller.saveUser)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)

export default router