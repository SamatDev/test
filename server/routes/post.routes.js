const passport = require('passport')
const {Router} = require('express')
const ctr = require('../controllers/post.controller')
const router = Router()
// /api/post

router.post('/add', passport.authenticate('jwt', {session: false}), ctr.create)
router.get('/', passport.authenticate('jwt', {session: false}), ctr.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), ctr.getById)
router.put('/:id', passport.authenticate('jwt', {session: false}), ctr.update)
router.put('/status/:id', passport.authenticate('jwt', {session: false}), ctr.updateStatus)
router.delete('/:id', passport.authenticate('jwt', {session: false}), ctr.remove)

module.exports = router