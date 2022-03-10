const express = require('express')
const router = express.Router()
const operatorController = require('../controllers/operators')


router.route('/delete').post(operatorController.Delete)


module.exports = router