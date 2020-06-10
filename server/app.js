const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strat')

const authRoute = require('./routes/auth.route')
const postRoutes = require('./routes/post.routes')
const keys = require('./keys')
const app = express()
mongoose.connect(keys.MONGO_URI)
    .then(()=> console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoute)
app.use('/api/post', postRoutes)


module.exports = app
