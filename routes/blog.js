import express from 'express'
import controller from '../controllers/blog.js'
import { protectedMid } from '../middleware/middleware.js'
const router = express.Router()

router.get('/', controller.getPost)
router.get('/:id', controller.findById)
router.post('/', protectedMid, controller.savePost)
router.put('/:id', protectedMid, controller.updatePost)
router.delete('/:id', protectedMid, controller.deletePost)

export default router