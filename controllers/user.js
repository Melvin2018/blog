import User from '../models/user.js'
import {
    MSG_ERROR,
    data_send
} from '../services/message.js'
export const getUser = async(req, res) => {
    try {
        const users = await User.find()
        return res.send(data_send(users))
    } catch (e) {
        return res.status(500).send(MSG_ERROR)
    }
}

export const saveUser = async(req, res) => {
    const user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
    try {
        const savedUser = await user.save()
        return res.send(data_send(savedUser, 'SavedUser'))
    } catch (e) {
        return res.send(MSG_ERROR)
    }
}
export const updateUser = async(req, res) => {
    const usuario = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
    try {
        const { found, user } = await usuario.update(req.params.id)
        if (!found) return res.status(404).send({
            status: "error",
            message: `no se encontró el usuario con id=${req.params.id}`
        });
        return res.send(data_send(user, 'UpdateUser'))
    } catch (e) {
        return res.send(MSG_ERROR)
    }
}

export const deleteUser = async(req, res) => {
    try {
        const { found, user } = await User.deleteById(req.params.id);
        if (!found) return res.status(404).send({
            status: "error",
            message: `no se encontró el usuario con id=${req.params.id}`
        });
        return res.send(data_send(user, "deletedUser"))
    } catch (e) {
        return res.send(MSG_ERROR)
    }
}

export default {
    getUser,
    saveUser,
    updateUser,
    deleteUser
}