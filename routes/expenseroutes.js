const express = require('express')
const expenseController = require('../controllers/expenseController')
const userAuthentication = require('../middleware/auth')

var router = express.Router()

router.post('/addexpense',userAuthentication.authenticate,expenseController.expense)
router.get('/getexpense/:page/:limit',userAuthentication.authenticate,expenseController.getexpense)
router.delete('/deletex/:id',userAuthentication.authenticate,expenseController.delex)
// router.delete('/editex/:id',userAuthentication.authenticate,expenseController.editex)
module.exports = router