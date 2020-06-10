const Post = require('../models/post.model')

module.exports.create = async (req, res)=> {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        deadline: req.body.deadline,
        priority: req.body.priority,
        author: req.body.author
    })

    try{
        await post.save()
        res.status(201).json(post)
    }catch (e) {
        res.status(500).json(e)
    }
}

module.exports.getAll = async (req, res) => {
    try{
        const posts = await Post.find({author: req.user._id})
        res.json(posts)
    }catch (e) {
        res.status(500).json(e)
    }
}

module.exports.getById = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        res.json(post)
    }catch (e) {
        res.status(500).json(e)
    }
}
module.exports.update = async (req, res) => {
    const $set = {
        title: req.body.title,
        content: req.body.content,
        priority: req.body.priority,
        deadline: req.body.deadline
    }
    try{
        const post = await Post.findOneAndUpdate({
            _id: req.params.id
        }, {$set}, {new: true})
        res.json(post)
    }catch (e) {
        res.status(500).json(e)
    }
}
module.exports.updateStatus = async (req, res) => {
    const $set = {
        status: req.body.status
    }
    try{
        const post = await Post.findOneAndUpdate({
            _id: req.params.id
        }, {$set}, {new: true})
        res.json(post)
    }catch(e) {
        res.status(500).json(e)
    }
}
module.exports.remove = async (req, res) => {
    try {
        await Post.deleteOne({_id: req.params.id})
        res.json({message: 'Задача удалена'})
    } catch (e) {
        res.status(500).json(e)
    }
}