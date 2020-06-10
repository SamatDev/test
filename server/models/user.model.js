const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

module.exports = model('users', userSchema)