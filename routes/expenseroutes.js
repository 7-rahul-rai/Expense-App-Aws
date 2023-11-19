const express = require('express')
const expenseController = require('../controllers/expenseController')

var router = express.Router()

router.post('/addexpense',expenseController.expense)
router.get('/getexpense',expenseController.getexpense)
router.delete('/deletex/:id',expenseController.delex)
module.exports = router