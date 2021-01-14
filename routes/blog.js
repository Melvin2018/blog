import express from 'express'
import controller from '../controllers/blog.js'
import {
    protectedMid
} from '../middleware/middleware.js'
const router = express.Router()

router.get('/', controller.list)
router.get('/:id', controller.detail)
router.post('/', protectedMid, controller.newPost)
router.put('/:id', protectedMid, controller.updatePost)
router.delete('/:id', protectedMid, controller.deletePost)

export default router