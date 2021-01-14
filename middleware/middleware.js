import {
    verifyAuthToken
} from '../services/token.js'
import jwt from 'jsonwebtoken'

export const protectedMid = (req, res, next) => {
    const token = req.headers.token != undefined ? req.headers.token : req.params.token
    if (!token) {
        return res.status(401).send({
            status: "error",
            message: "no tiene token"
        })
    }
    const {
        error,
        decoded
    } = verifyAuthToken(token)
    if (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send({
                status: "error",
                message: "Token expirado"
            })
        }
        return res.status(401).send({
            status: "error",
            message: "no es valido el token"
        })
    }
    const { userId } = decoded
    req.userId = userId
    next()
}