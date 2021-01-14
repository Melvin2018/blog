import Post from '../models/post.js'


export const list = async(req, res) => {
    try {
        const list = await Post.find()
        return res.send({
            status: "success",
            posts: list
        })
    } catch {
        return res.status(500).send({
            status: "error",
            message: "something went wrong"
        })
    }
}

export const newPost = async(req, res) => {
    const post = new Post(req.body.title, req.body.body, req.body.userId)
    try {
        const savedPost = await post.save()
        return res.send({
            status: "succes",
            createdPost: savedPost
        })
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "something went wrong"
        })
    }
}
export const updatePost = async(req, res) => {
    const post = new Post(req.body.title, req.body.body, req.userId)
    try {
        const updatePost = await post.update(req.params.id)
        return res.send({
            status: "succes",
            updatedPost: updatePost
        })
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "something went wrong"
        })
    }
}
export const detail = async(req, res) => {
    try {
        const {
            found,
            post
        } = await Post.findById(req.params.id)
        if (!found) return res.status(404).send({
            status: "error",
            message: `Post not fond with id ${req.params.id}`
        });
        return res.send({
            status: "success",
            post: post
        })
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: " went wrong"
        })
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
            message: `Post not fond with id ${req.params.id}`
        });
        return res.send({
            status: "success",
            post: post
        })
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: "something went wrong"
        })
    }
}



export default {
    list,
    newPost,
    updatePost,
    detail,
    deletePost
}