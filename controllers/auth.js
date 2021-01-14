import User from '../models/user.js'
import { MSG_ERROR } from '../services/message.js'
import { sendVerificationEmail, sendConfirmationEmail } from '../services/mailer.js'
import { newAuthToken } from '../services/token.js'


export const refreshToken = async(req, res) => {
    console.log(req.userId);
    try {
        const user = await User.find(req.userId)
        return res.send({
            user: user,
            token: newAuthToken(req.userId)
        })
    } catch (error) {
        return res.status(500).send(MSG_ERROR)
    }
}

export const register = async(req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const userToSave = new User(firstName, lastName, email, password)
    try {
        const savedUser = await userToSave.save();
        sendVerificationEmail(savedUser)
        return res.send({
            user: savedUser,
            token: newAuthToken(savedUser.id)
        })
    } catch (err) {
        return res.status(500).send(MSG_ERROR)
    }
}

export const login = async(req, res) => {
    const {
        email,
        password
    } = req.body;
    if (email === "" || password === "") {
        return res.status(400).send({
            message: "Credenciales invalidas"
        })
    }
    try {
        const {
            valid,
            found,
            user
        } = await User.findByEmailAndComparePassword(email, password)
        if (!valid | !found) return res.status(!valid ? 400 : 404).send({
            status: "error",
            message: !valid ? "Credenciales invalidas" : `No encontrado usuario con email ${email}`
        });
        return res.send({
            user: user,
            token: newAuthToken(user.id)
        })
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "Something went wrong"
        })
    }
}

export const verifyEmail = async(req, res) => {
    try {
        const { user } = await User.verifyEmail(req.userId);
        sendConfirmationEmail(user)
        return res.send({ status: "succces", user })
    } catch (err) {
        return res.status(500).send(MSG_ERROR)
    }
}

export default {
    refreshToken,
    register,
    login,
    verifyEmail
}