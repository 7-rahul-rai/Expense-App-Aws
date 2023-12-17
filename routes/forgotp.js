const express = require('express')
const router = express.Router()
const forgotController = require('../controllers/forgotController')

router.post('/password/forgotpassword',forgotController.forgotp)

module.exports = router