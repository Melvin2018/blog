import {
    verifyAuthToken
} from '../services/token.js'
export const parseBody = (req, res, next) => {
    let datos = ''
    req.on('data', pedazoDeDatos => {
        datos += pedazoDeDatos
    })
    console.log(datos);
    req.on('end', () => {
        const jsonBody = JSON.parse(datos)
        req.body = jsonBody
        next()
    })

}

export const protectedMid = (req, res, next) => {
    const {
        token
    } = req.headers
    if (!token) return res.status(401).send({
        status: "error",
        message: "no autorizado"
    })
    const {
        error,
        decoded
    } = verifyAuthToken(token)
    if (error) return res.status(401).send({
        status: "error",
        message: "no autorizado"
    })
    const {
        userId
    } = decoded
    req.userId = userId
    next()
}