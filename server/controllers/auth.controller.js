const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({login: req.body.login})

    if (candidate) {
        const isPassCorrect = bcrypt.compareSync(req.body.password, candidate.password)
        if(isPassCorrect) {
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id
            }, keys.JWT, {expiresIn: 60 * 60})
            res.status(200)
            res.json({token})
        }else{
            res.status(401).json({message: 'Пароль неверен'})
        }
    } else {
        res.status(404).json({message: 'Пользователь не найден'})
    }
}

module.exports.createUser = async (req, res) => {
    const salt = bcrypt.genSaltSync(10)

    const candidate = await User.findOne({login: req.body.login})

    if(candidate) {
        res.status(409).json({message: 'Такой пользователь уже существует'})
    }else{
        const user = new User({
            login: req.body.login,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, salt)
        })

        await user.save()
        res.status(201).json(user)
    }
}

module.exports.userName = async (req, res) => {
    const {user} = await User.find({login: req.body.login})
    console.log(user)

    res.json(user)
}