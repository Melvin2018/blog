import User from '../models/user.js'

export const getUser = async(req, res) => {
    try {
        const list = await User.find()
        return res.send({
            status: "success",
            users: list
        })
    } catch (e) {
        return res.status(500).send({
            status: "error",
            message: "something went wrong"
        })
    }
}

export const saveUser = async(req, res) => {
    const user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
    try {
        const saveUser = await user.save()
        return res.send({
            status: "succces",
            createdUser: saveUser
        })
    } catch (e) {
        return res.send({
            status: "error",
            message: "something went wrong"
        })
    }
}
export const updateUser = async(req, res) => {
    const user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
    try {
        console.log(user);
        const updateUser = await user.update(req.params.id)
        return res.send({
            status: "succces",
            updatedUser: updateUser
        })
    } catch (e) {
        console.log(e);
        return res.send({
            status: "error",
            message: "something went wrong"
        })
    }
}

export const deleteUser = async(req, res) => {
    try {
        const deletedUser = await User.deleteById(req.params.id);
        return res.send({
            status: "succces",
            deletedUser: deletedUser
        })
    } catch (e) {
        return res.send({
            status: "error",
            message: "something went wrong"
        })
    }
}

export default {
    getUser,
    saveUser,
    updateUser,
    deleteUser
}