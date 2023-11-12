const express = require('express')
const userController = require('../controllers/user')

var router = express.Router()

router.post('/signup',userController.usersnp)
router.get('/signin',userController.userlgn)
module.exports = router