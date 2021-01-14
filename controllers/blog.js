import Post from '../models/post.js'
import {
    MSG_ERROR,
    data_send
} from '../services/message.js'
export const getPost = async(req, res) => {
    try {
        const list = await Post.find()
        return res.send(data_send(list))
    } catch {
        return res.status(500).send(MSG_ERROR)
    }
}

export const savePost = async(req, res) => {
    const post = new Post(req.body.title, req.body.body, req.userId)
    console.log(post);
    try {
        const savedPost = await post.save()
        return res.send(data_send(savedPost, 'savedPost'))
    } catch (err) {
        return res.status(500).send(MSG_ERROR)
    }
}
export const updatePost = async(req, res) => {
    const post = new Post(req.body.title, req.body.body, req.userId)
    try {
        const updatePost = await post.update(req.params.id)
        return res.send(data_send(updatePost, 'updatedPost'))
    } catch (err) {
        return res.status(500).send(MSG_ERROR)
    }
}
export const findById = async(req, res) => {
    try {
        const { found, post } = await Post.findById(req.params.id)
        if (!found) return res.status(404).send({
            status: "error",
            message: `no carga post con id=${req.params.id}`
        });
        return res.send(data_send(post, 'post'))
    } catch (err) {
        return res.status(500).send(MSG_ERROR)
    }

}

export const deletePost = async(req, res) => {
    try {
        const {
            found,
            post
        } = await Post.deleteById(req.params.id)
        if (!found) return res.status(404).send({
            status: "error",
            message: `no carga post con id=${req.params.id}`
        });
        return res.send(data_send(post, "DeletedPost"))
    } catch (err) {
        return res.status(500).send(MSG_ERROR)
    }
}
export default {
    getPost,
    savePost,
    updatePost,
    findById,
    deletePost
}