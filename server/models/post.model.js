const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'New'
    },
    priority: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

module.exports = model('posts', postSchema)