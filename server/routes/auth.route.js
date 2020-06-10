const {Router} = require('express')
const {login, createUser, userName} = require('../controllers/auth.controller')
const router = Router()

//  /api/auth
router.post('/login', login)
router.post('/signup', createUser)
router.get('/get', userName)
module.exports = router