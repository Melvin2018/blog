import express from 'express'
import controller from '../controllers/auth.js'
import { protectedMid } from '../middleware/middleware.js'
const router = express.Router()

router.post('/register', controller.register);
//se usa middleware para verificar que no haya exxpirado el token de refresh
router.post('/refresh', protectedMid, controller.refreshToken);
router.post('/login', controller.login);
router.get('/verify/:token', protectedMid, controller.verifyEmail);

export default router